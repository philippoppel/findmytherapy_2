import type { MatchResult } from "./types";

export const computeAnalytics = (matches: MatchResult[]) => {
  const excluded = matches.filter((match) => match.excluded);
  const included = matches.filter((match) => !match.excluded);
  const averageScore =
    included.reduce((sum, match) => sum + match.explanation.score, 0) / Math.max(included.length, 1);

  const reasonCounts = new Map<string, number>();
  included.forEach((match) => {
    match.explanation.reasons.forEach((reason) => {
      reasonCounts.set(reason, (reasonCounts.get(reason) ?? 0) + 1);
    });
  });

  const topReasons = Array.from(reasonCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([reason, count]) => ({ reason, count }));

  const excludedList = excluded.map((match) => ({
    id: match.therapist.id,
    name: match.therapist.name,
    reasons: match.excludeReasons
  }));

  return {
    excludedCount: excluded.length,
    averageScore: Math.round(averageScore * 10) / 10,
    topReasons,
    excludedList
  };
};
