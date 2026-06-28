export { Home as default, meta, links } from './home';

const GITHUB_USER = 'aniket-adhav';
const LEETCODE_USER = 'aniket_adhav';

async function fetchGitHub() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`, {
        headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-site' },
      }),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, {
        headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-site' },
      }),
    ]);

    const user = await userRes.json();
    const repos = reposRes.ok ? await reposRes.json() : [];

    const stars = Array.isArray(repos)
      ? repos.reduce((s, r) => s + (r.stargazers_count || 0), 0)
      : 0;

    const langMap = {};
    if (Array.isArray(repos)) {
      repos.forEach(r => {
        if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1;
      });
    }
    const topLangs = Object.entries(langMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([l]) => l);

    return {
      username: GITHUB_USER,
      repos: user.public_repos || 0,
      followers: user.followers || 0,
      following: user.following || 0,
      stars,
      topLangs,
    };
  } catch {
    return { username: GITHUB_USER, repos: 0, followers: 0, following: 0, stars: 0, topLangs: [] };
  }
}

async function fetchLeetCode() {
  try {
    const query = `
      query userPublicProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
          }
        }
      }
    `;
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'portfolio-site',
        Referer: 'https://leetcode.com',
      },
      body: JSON.stringify({ query, variables: { username: LEETCODE_USER } }),
    });
    const json = await res.json();
    const mu = json?.data?.matchedUser;
    if (!mu) return { username: LEETCODE_USER, easy: 0, medium: 0, hard: 0, ranking: null };

    const nums = mu.submitStats?.acSubmissionNum || [];
    const get = d => nums.find(n => n.difficulty === d)?.count || 0;

    return {
      username: LEETCODE_USER,
      easy: get('Easy'),
      medium: get('Medium'),
      hard: get('Hard'),
      ranking: mu.profile?.ranking || null,
    };
  } catch {
    return { username: LEETCODE_USER, easy: 0, medium: 0, hard: 0, ranking: null };
  }
}

export async function loader() {
  const [github, leetcode] = await Promise.all([fetchGitHub(), fetchLeetCode()]);
  return Response.json({ github, leetcode });
}
