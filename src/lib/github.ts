export type ContributionDay = {
  date: string;
  count: number;
};

export async function getGitHubSnapshot(username: string) {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return null;
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query($userName: String!) {
            user(login: $userName) {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { userName: username },
      }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    const json = await response.json();
    const calendar =
      json?.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      return null;
    }

    return {
      total: Number(calendar.totalContributions ?? 0),
      days: calendar.weeks.flatMap(
        (week: { contributionDays: { date: string; contributionCount: number }[] }) =>
          week.contributionDays.map((day) => ({
            date: day.date,
            count: day.contributionCount,
          })),
      ) as ContributionDay[],
    };
  } catch {
    return null;
  }
}
