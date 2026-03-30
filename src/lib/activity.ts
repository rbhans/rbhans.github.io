export interface ActivityItem {
  type: "commit" | "repo" | "note";
  title: string;
  description?: string;
  date: string;
  link?: string;
  repo?: string;
}

// ── Add your own updates here ──
export const manualNotes: ActivityItem[] = [
  // { type: "note", title: "Your update here", date: "2026-03-28" },
];

export async function fetchRecentActivity(): Promise<ActivityItem[]> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const githubItems: ActivityItem[] = [];

  try {
    const url = process.env.GITHUB_TOKEN
      ? "https://api.github.com/users/rbhans/events?per_page=30"
      : "https://api.github.com/users/rbhans/events/public?per_page=30";

    const res = await fetch(url, { headers });

    if (res.ok) {
      const events = await res.json();

      for (const event of events) {
        const repoName = event.repo?.name?.split("/")[1] || "";
        const repoUrl = `https://github.com/${event.repo?.name}`;

        if (event.type === "PushEvent") {
          const commits = event.payload?.commits || [];
          const branch = event.payload?.ref?.replace("refs/heads/", "") || "main";

          if (commits.length > 0) {
            // Has commit details
            githubItems.push({
              type: "commit",
              title: commits[0].message?.split("\n")[0] || "Commit",
              repo: repoName,
              date: event.created_at,
              link: repoUrl,
            });
          } else {
            // Push without commit details (token scope limitation)
            githubItems.push({
              type: "commit",
              title: `Pushed to ${branch}`,
              repo: repoName,
              date: event.created_at,
              link: repoUrl,
            });
          }
        } else if (event.type === "CreateEvent") {
          const refType = event.payload?.ref_type;
          if (refType === "repository") {
            githubItems.push({
              type: "repo",
              title: `Created ${repoName}`,
              date: event.created_at,
              link: repoUrl,
            });
          } else if (refType === "branch") {
            githubItems.push({
              type: "commit",
              title: `Created branch ${event.payload?.ref}`,
              repo: repoName,
              date: event.created_at,
              link: repoUrl,
            });
          }
        }
      }
    }
  } catch {
    // Manual notes will still show
  }

  // Deduplicate consecutive pushes to same repo
  const deduped: ActivityItem[] = [];
  for (const item of githubItems) {
    const prev = deduped[deduped.length - 1];
    if (prev && prev.repo === item.repo && prev.title === item.title) continue;
    deduped.push(item);
  }

  const all = [...deduped, ...manualNotes].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return all.slice(0, 15);
}
