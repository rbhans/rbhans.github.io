export interface GitHubStats {
  repos: number;
  languages: { name: string; color: string; percent: number }[];
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    // Use /user/repos (authenticated) to include private repos,
    // fall back to /users/:name/repos (public only) without a token
    const url = process.env.GITHUB_TOKEN
      ? "https://api.github.com/user/repos?per_page=100&sort=updated&affiliation=owner"
      : "https://api.github.com/users/rbhans/repos?per_page=100&sort=updated";

    const res = await fetch(url, { headers });

    if (!res.ok) {
      return fallbackStats();
    }

    const repos = await res.json();
    const ownRepos = repos.filter((r: { fork: boolean }) => !r.fork);

    // Aggregate languages
    const langBytes: Record<string, number> = {};
    const langColors: Record<string, string> = {
      Rust: "#dea584",
      TypeScript: "#3178c6",
      JavaScript: "#f1e05a",
      HTML: "#e34c26",
      CSS: "#563d7c",
      Python: "#3572A5",
      Go: "#00ADD8",
      Dart: "#00B4AB",
      Java: "#b07219",
    };

    for (const repo of ownRepos) {
      if (repo.language) {
        langBytes[repo.language] =
          (langBytes[repo.language] || 0) + (repo.size || 1);
      }
    }

    const totalBytes = Object.values(langBytes).reduce((a, b) => a + b, 0);
    const languages = Object.entries(langBytes)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, bytes]) => ({
        name,
        color: langColors[name] || "#a8a29e",
        percent: Math.round((bytes / totalBytes) * 100),
      }));

    return {
      repos: ownRepos.length,
      languages,
    };
  } catch {
    return fallbackStats();
  }
}

function fallbackStats(): GitHubStats {
  return {
    repos: 0,
    languages: [],
  };
}
