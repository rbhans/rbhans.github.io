// Web Worker: computes topo contours off the main thread

class SimplexNoise {
  constructor(seed) {
    this.grad3 = [
      [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
      [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
      [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1],
    ];
    this.perm = new Uint8Array(512);
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    let s = seed;
    for (let i = 255; i > 0; i--) {
      s = (s * 16807) % 2147483647;
      const j = s % (i + 1);
      [p[i], p[j]] = [p[j], p[i]];
    }
    for (let i = 0; i < 512; i++) this.perm[i] = p[i & 255];
  }
  noise2D(x, y) {
    const F2 = 0.5 * (Math.sqrt(3) - 1);
    const G2 = (3 - Math.sqrt(3)) / 6;
    const s = (x + y) * F2;
    const i = Math.floor(x + s), j = Math.floor(y + s);
    const t = (i + j) * G2;
    const x0 = x - (i - t), y0 = y - (j - t);
    const i1 = x0 > y0 ? 1 : 0, j1 = x0 > y0 ? 0 : 1;
    const x1 = x0 - i1 + G2, y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2, y2 = y0 - 1 + 2 * G2;
    const ii = i & 255, jj = j & 255;
    const gi0 = this.perm[ii + this.perm[jj]] % 12;
    const gi1 = this.perm[ii + i1 + this.perm[jj + j1]] % 12;
    const gi2 = this.perm[ii + 1 + this.perm[jj + 1]] % 12;
    let n0 = 0, n1 = 0, n2 = 0;
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 >= 0) { t0 *= t0; n0 = t0 * t0 * (this.grad3[gi0][0] * x0 + this.grad3[gi0][1] * y0); }
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 >= 0) { t1 *= t1; n1 = t1 * t1 * (this.grad3[gi1][0] * x1 + this.grad3[gi1][1] * y1); }
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 >= 0) { t2 *= t2; n2 = t2 * t2 * (this.grad3[gi2][0] * x2 + this.grad3[gi2][1] * y2); }
    return 70 * (n0 + n1 + n2);
  }
}

function fbm(noise, x, y, octaves, lac, gain) {
  let v = 0, a = 1, f = 1, m = 0;
  for (let i = 0; i < octaves; i++) { v += a * noise.noise2D(x * f, y * f); m += a; a *= gain; f *= lac; }
  return v / m;
}

const noise = new SimplexNoise(42);

self.onmessage = (e) => {
  const { w, h, offsetX, offsetY, frameId } = e.data;

  const scale = 0.0025;
  const step = 4;
  const cols = Math.ceil(w / step) + 1;
  const rows = Math.ceil(h / step) + 1;
  const levels = 13;

  const field = [];
  for (let j = 0; j < rows; j++) {
    field[j] = new Float32Array(cols);
    for (let i = 0; i < cols; i++) {
      field[j][i] = fbm(noise, (i * step + offsetX) * scale, (j * step + offsetY) * scale, 5, 2.1, 0.52);
    }
  }

  const canvas = new OffscreenCanvas(w, h);
  const ctx = canvas.getContext("2d");
  ctx.strokeStyle = "rgba(41, 37, 36, 1)";
  ctx.lineWidth = 1;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  for (let level = 0; level < levels; level++) {
    const threshold = -0.7 + (1.4 * level) / (levels - 1);
    ctx.beginPath();
    for (let j = 0; j < rows - 1; j++) {
      for (let i = 0; i < cols - 1; i++) {
        const config =
          (field[j][i] >= threshold ? 8 : 0) |
          (field[j][i + 1] >= threshold ? 4 : 0) |
          (field[j + 1][i + 1] >= threshold ? 2 : 0) |
          (field[j + 1][i] >= threshold ? 1 : 0);
        if (config === 0 || config === 15) continue;
        const x = i * step, y = j * step;
        const vTL = field[j][i], vTR = field[j][i + 1], vBR = field[j + 1][i + 1], vBL = field[j + 1][i];
        const top = [x + ((threshold - vTL) / (vTR - vTL)) * step, y];
        const right = [x + step, y + ((threshold - vTR) / (vBR - vTR)) * step];
        const bottom = [x + ((threshold - vBL) / (vBR - vBL)) * step, y + step];
        const left = [x, y + ((threshold - vTL) / (vBL - vTL)) * step];
        const seg = (a, b) => { ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); };
        switch (config) {
          case 1: case 14: seg(left, bottom); break;
          case 2: case 13: seg(bottom, right); break;
          case 3: case 12: seg(left, right); break;
          case 4: case 11: seg(top, right); break;
          case 5: seg(top, left); seg(bottom, right); break;
          case 6: case 9: seg(top, bottom); break;
          case 7: case 8: seg(top, left); break;
          case 10: seg(top, right); seg(left, bottom); break;
        }
      }
    }
    ctx.stroke();
  }

  const bitmap = canvas.transferToImageBitmap();
  self.postMessage({ bitmap, frameId }, { transfer: [bitmap] });
};
