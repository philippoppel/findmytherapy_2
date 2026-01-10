import type { MatchResult, PatientAnswers, Therapist } from "./types";
import { concernOptions } from "./data/options";
import { clamp, districtDistanceKm, unique } from "./utils";

const BASE_CATEGORY_WEIGHTS = {
  clinical: 0.44,
  human: 0.2,
  practical: 0.31,
  vibe: 0.05
};

const PRIORITY_CATEGORY_MULTIPLIERS = {
  score: { clinical: 1.15, human: 1.1, practical: 0.9, vibe: 1.05 },
  next: { clinical: 0.9, human: 0.9, practical: 1.2, vibe: 0.95 },
  distance: { clinical: 0.95, human: 0.9, practical: 1.15, vibe: 0.95 }
};

const BASE_PRACTICAL_WEIGHTS = {
  setting: 0.23,
  language: 0.14,
  distance: 0.19,
  availability: 0.19,
  insurance: 0.17,
  waitTime: 0.08
};

const PRIORITY_PRACTICAL_MULTIPLIERS = {
  score: { setting: 1, language: 1, distance: 1, availability: 1, insurance: 1, waitTime: 0.95 },
  next: { setting: 1, language: 0.95, distance: 0.85, availability: 1.4, insurance: 1, waitTime: 1.7 },
  distance: { setting: 1, language: 1, distance: 1.8, availability: 0.95, insurance: 1, waitTime: 0.85 }
};

const concernTagMap = new Map(concernOptions.map((item) => [item.id, item.tags]));
const concernLabelMap = new Map(concernOptions.map((item) => [item.id, item.label]));
const tagLabelMap = new Map<string, string>();

concernOptions.forEach((item) => {
  item.tags.forEach((tag) => {
    if (!tagLabelMap.has(tag)) tagLabelMap.set(tag, item.label);
  });
});

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .replace(/\u00e4/g, "ae")
    .replace(/\u00f6/g, "oe")
    .replace(/\u00fc/g, "ue")
    .replace(/\u00df/g, "ss");

const keywordTagRules: Array<{ pattern: RegExp; tags: string[] }> = [
  { pattern: /\b(stress|burnout|ueberforderung|belastung|druck)\b/, tags: ["stress", "burnout"] },
  { pattern: /\b(schlaf|insomn|mued|erschoepf|regener)\b/, tags: ["sleep", "regeneration"] },
  { pattern: /\b(angst|panik|panic|sorge|unruhe)\b/, tags: ["anxiety", "panic"] },
  { pattern: /\b(depress|niedergeschlagen|antriebslos|stimmung|mood)\b/, tags: ["depression", "mood"] },
  { pattern: /\b(beziehung|partner|bindung|trennung|konflikt|konflikte)\b/, tags: ["relationship", "attachment", "conflict"] },
  { pattern: /\b(selbstwert|selbstvertrauen|selbstkritik|identitaet)\b/, tags: ["selfesteem", "identity"] },
  { pattern: /\b(trauma|traumatisch|flashback|belastend)\b/, tags: ["trauma", "resilience"] },
  { pattern: /\b(arbeit|job|beruf|kolleg|work)\b/, tags: ["work", "stress"] },
  { pattern: /\b(sucht|abhaeng|abhaengig|impuls|zwang)\b/, tags: ["addiction", "impulse"] }
];

const normalizeWeights = <T extends Record<string, number>>(weights: T) => {
  const total = Object.values(weights).reduce((sum, value) => sum + value, 0);
  if (!total) return weights;
  const normalized = Object.fromEntries(
    Object.entries(weights).map(([key, value]) => [key, value / total])
  );
  return normalized as T;
};

const applyMultipliers = <T extends Record<string, number>>(weights: T, multipliers: Record<string, number>) => {
  const updated = Object.fromEntries(
    Object.entries(weights).map(([key, value]) => [key, value * (multipliers[key] ?? 1)])
  );
  return updated as T;
};

const weightedAverage = (scores: Record<string, number>, weights: Record<string, number>) => {
  let total = 0;
  let weightSum = 0;
  Object.entries(weights).forEach(([key, weight]) => {
    if (!weight) return;
    const score = scores[key] ?? 0;
    total += score * weight;
    weightSum += weight;
  });
  if (!weightSum) return 0;
  return total / weightSum;
};

const extractTextTags = (text: string) => {
  const normalized = normalizeText(text);
  const tags: string[] = [];
  keywordTagRules.forEach((rule) => {
    if (rule.pattern.test(normalized)) tags.push(...rule.tags);
  });
  return unique(tags);
};

const getClinicalSignals = (answers: PatientAnswers) => {
  const explicitTags = unique(answers.concerns.flatMap((id) => concernTagMap.get(id) ?? []));
  const textTags = extractTextTags(`${answers.primaryGoal} ${answers.concernsText}`);
  const inferredTags = unique(textTags.filter((tag) => !explicitTags.includes(tag)));
  return { explicitTags, inferredTags };
};

const computeAvailabilityCoverage = (answers: PatientAnswers, therapist: Therapist) => {
  const preferredDays = answers.availability.days;
  const preferredTimes = answers.availability.times;
  if (!preferredDays.length && !preferredTimes.length) {
    return { coverage: 0, matched: 0, requested: 0 };
  }

  const matches = therapist.availability.filter(
    (slot) =>
      (!preferredDays.length || preferredDays.includes(slot.day)) &&
      (!preferredTimes.length || preferredTimes.includes(slot.time))
  );

  if (preferredDays.length && preferredTimes.length) {
    const desired = new Set(preferredDays.flatMap((day) => preferredTimes.map((time) => `${day}-${time}`)));
    const matched = new Set(matches.map((slot) => `${slot.day}-${slot.time}`));
    const coverage = desired.size ? matched.size / desired.size : 0;
    return { coverage, matched: matched.size, requested: desired.size };
  }

  if (preferredDays.length) {
    const matchedDays = new Set(matches.map((slot) => slot.day));
    const coverage = preferredDays.length ? matchedDays.size / preferredDays.length : 0;
    return { coverage, matched: matchedDays.size, requested: preferredDays.length };
  }

  const matchedTimes = new Set(matches.map((slot) => slot.time));
  const coverage = preferredTimes.length ? matchedTimes.size / preferredTimes.length : 0;
  return { coverage, matched: matchedTimes.size, requested: preferredTimes.length };
};

const computeWaitTimeScore = (nextAvailableDays: number, urgency: number) => {
  const clampedUrgency = clamp(urgency, 1, 5);
  const idealDays = Math.max(5, 26 - clampedUrgency * 4);
  const okDays = idealDays * 2;
  if (nextAvailableDays <= idealDays) return 1;
  if (nextAvailableDays >= okDays) return 0;
  return clamp(1 - (nextAvailableDays - idealDays) / (okDays - idealDays), 0, 1);
};

const computeConfidence = (answers: PatientAnswers) => {
  const signals = [
    { has: answers.primaryGoal.trim().length > 0, weight: 1 },
    { has: answers.concerns.length > 0, weight: 1.2 },
    { has: answers.concernsText.trim().length > 0, weight: 0.6 },
    { has: answers.therapistStyle.length > 0, weight: 0.9 },
    { has: answers.availability.days.length > 0 || answers.availability.times.length > 0, weight: 0.8 },
    { has: answers.preferences.setting !== "egal", weight: 0.5 },
    { has: Boolean(answers.preferences.language), weight: 0.4 },
    { has: answers.insurance !== "egal", weight: 0.6 }
  ];
  const total = signals.reduce((sum, signal) => sum + signal.weight, 0);
  const covered = signals.reduce((sum, signal) => sum + (signal.has ? signal.weight : 0), 0);
  const coverage = total ? covered / total : 0;
  const strictness = clamp(
    (answers.dealbreakers.length + (answers.matchingMode === "strict" ? 1 : 0)) / 6,
    0,
    1
  );
  const confidence = 45 + coverage * 40 + strictness * 15;
  return Math.round(clamp(confidence, 35, 95));
};

const buildCategoryWeights = (
  matchPriority: PatientAnswers["matchPriority"],
  hasClinicalSignal: boolean,
  hasHumanSignal: boolean
) => {
  const base = {
    clinical: hasClinicalSignal ? BASE_CATEGORY_WEIGHTS.clinical : 0,
    human: hasHumanSignal ? BASE_CATEGORY_WEIGHTS.human : 0,
    practical: BASE_CATEGORY_WEIGHTS.practical,
    vibe: hasClinicalSignal || hasHumanSignal ? BASE_CATEGORY_WEIGHTS.vibe : 0
  };
  const withPriority = applyMultipliers(base, PRIORITY_CATEGORY_MULTIPLIERS[matchPriority]);
  return normalizeWeights(withPriority);
};

const buildPracticalWeights = (
  answers: PatientAnswers,
  matchPriority: PatientAnswers["matchPriority"]
) => {
  const prefersAvailability = answers.availability.days.length > 0 || answers.availability.times.length > 0;
  const base = {
    setting: answers.preferences.setting === "egal" ? 0 : BASE_PRACTICAL_WEIGHTS.setting,
    language: answers.preferences.language ? BASE_PRACTICAL_WEIGHTS.language : 0,
    distance: answers.preferences.maxDistanceKm > 0 ? BASE_PRACTICAL_WEIGHTS.distance : 0,
    availability: prefersAvailability ? BASE_PRACTICAL_WEIGHTS.availability : 0,
    insurance: answers.insurance === "kasse" ? BASE_PRACTICAL_WEIGHTS.insurance : 0,
    waitTime: BASE_PRACTICAL_WEIGHTS.waitTime
  };

  const urgencyShift = clamp((answers.urgency - 3) / 4, -0.5, 0.5);
  const urgencyMultipliers = {
    availability: 1 + urgencyShift * 0.3,
    waitTime: 1 + urgencyShift * 0.6
  };
  const priorityMultipliers = PRIORITY_PRACTICAL_MULTIPLIERS[matchPriority];
  const withPriority = applyMultipliers(base, {
    ...priorityMultipliers,
    availability: priorityMultipliers.availability * urgencyMultipliers.availability,
    waitTime: priorityMultipliers.waitTime * urgencyMultipliers.waitTime
  });

  return normalizeWeights(withPriority);
};

const buildReasons = ({
  answers,
  therapist,
  matchedConcernLabels,
  matchedInferredLabels,
  styleMatches,
  settingOk,
  languageOk,
  distanceKm,
  distanceScore,
  availability,
  insuranceOk,
  waitTimeScore,
  categoryWeights,
  practicalWeights
}: {
  answers: PatientAnswers;
  therapist: Therapist;
  matchedConcernLabels: string[];
  matchedInferredLabels: string[];
  styleMatches: string[];
  settingOk: boolean;
  languageOk: boolean;
  distanceKm: number;
  distanceScore: number;
  availability: { coverage: number; matched: number; requested: number };
  insuranceOk: boolean;
  waitTimeScore: number;
  categoryWeights: Record<string, number>;
  practicalWeights: Record<string, number>;
}) => {
  const candidates: Array<{ label: string; weight: number }> = [];

  if (matchedConcernLabels.length) {
    const labels = matchedConcernLabels.slice(0, 2).join(", ");
    candidates.push({
      label: `Anliegen passen: ${labels}.`,
      weight: categoryWeights.clinical * (matchedConcernLabels.length / Math.max(answers.concerns.length, 1))
    });
  } else if (matchedInferredLabels.length) {
    const labels = matchedInferredLabels.slice(0, 2).join(", ");
    candidates.push({
      label: `Thema aus deinem Text passt: ${labels}.`,
      weight: categoryWeights.clinical * 0.6
    });
  }

  if (styleMatches.length) {
    candidates.push({
      label: `Stil passt: ${styleMatches.slice(0, 2).join(", ")}.`,
      weight: categoryWeights.human * (styleMatches.length / Math.max(answers.therapistStyle.length, 1))
    });
  }

  if (settingOk && answers.preferences.setting !== "egal") {
    candidates.push({
      label: `Setting passt: ${answers.preferences.setting}.`,
      weight: categoryWeights.practical * (practicalWeights.setting ?? 0)
    });
  }

  if (languageOk && answers.preferences.language) {
    candidates.push({
      label: `Sprache passt: ${answers.preferences.language}.`,
      weight: categoryWeights.practical * (practicalWeights.language ?? 0)
    });
  }

  if (insuranceOk && answers.insurance === "kasse") {
    candidates.push({
      label: "Kasse möglich.",
      weight: categoryWeights.practical * (practicalWeights.insurance ?? 0)
    });
  }

  if (availability.requested > 0 && availability.coverage >= 0.5) {
    candidates.push({
      label: `Zeitfenster passen: ${availability.matched}/${availability.requested}.`,
      weight: categoryWeights.practical * (practicalWeights.availability ?? 0) * availability.coverage
    });
  }

  if (distanceScore >= 0.75 && answers.preferences.maxDistanceKm > 0) {
    const distanceLabel =
      distanceKm === 0 && answers.preferences.district === therapist.bezirk
        ? `Gleicher Ort: ${therapist.bezirk}.`
        : `Nahe Distanz (${distanceKm} km).`;
    candidates.push({
      label: distanceLabel,
      weight: categoryWeights.practical * (practicalWeights.distance ?? 0) * distanceScore
    });
  }

  if (waitTimeScore >= 0.65) {
    candidates.push({
      label: `Schneller Termin: ca. ${therapist.nextAvailableDays} Tage.`,
      weight: categoryWeights.practical * (practicalWeights.waitTime ?? 0) * waitTimeScore
    });
  }

  const reasons = unique(
    candidates
      .sort((a, b) => b.weight - a.weight)
      .map((candidate) => candidate.label)
  );

  if (!reasons.length) {
    return ["Mehrere Eckdaten passen gut zusammen."];
  }

  return reasons.slice(0, 4);
};

const buildTradeoffs = ({
  answers,
  therapist,
  clinicalMatch,
  humanMatch,
  settingOk,
  languageOk,
  distanceScore,
  availability,
  insuranceOk,
  waitTimeScore
}: {
  answers: PatientAnswers;
  therapist: Therapist;
  clinicalMatch: number;
  humanMatch: number;
  settingOk: boolean;
  languageOk: boolean;
  distanceScore: number;
  availability: { coverage: number; matched: number; requested: number };
  insuranceOk: boolean;
  waitTimeScore: number;
}) => {
  const candidates: Array<{ label: string; weight: number }> = [];

  if (!insuranceOk && answers.insurance === "kasse") {
    candidates.push({ label: "Keine Kassenplätze.", weight: 1 });
  }

  if (!settingOk && answers.preferences.setting !== "egal") {
    candidates.push({ label: `Setting passt nicht (${answers.preferences.setting}).`, weight: 0.9 });
  }

  if (!languageOk && answers.preferences.language) {
    candidates.push({ label: `Sprache ${answers.preferences.language} fehlt.`, weight: 0.9 });
  }

  if (distanceScore < 0.5 && answers.preferences.maxDistanceKm > 0) {
    candidates.push({ label: `Distanz über ${answers.preferences.maxDistanceKm} km.`, weight: 0.7 });
  }

  if (availability.requested > 0 && availability.coverage === 0) {
    candidates.push({ label: "Zeitfenster passen nicht.", weight: 0.7 });
  } else if (availability.requested > 0 && availability.coverage < 0.5) {
    candidates.push({
      label: `Zeitfenster nur teilweise (${availability.matched}/${availability.requested}).`,
      weight: 0.5
    });
  }

  const waitTimeThreshold =
    answers.urgency >= 4 ? 0.55 : answers.urgency <= 2 ? 0.35 : 0.45;
  if (waitTimeScore < waitTimeThreshold) {
    candidates.push({ label: `Termin erst in ca. ${therapist.nextAvailableDays} Tagen.`, weight: 0.4 });
  }

  if (answers.concerns.length > 0 && clinicalMatch < 0.35) {
    candidates.push({ label: "Anliegen nur teilweise abgedeckt.", weight: 0.45 });
  }

  if (answers.therapistStyle.length > 0 && humanMatch < 0.5) {
    candidates.push({ label: "Stil nur teilweise passend.", weight: 0.35 });
  }

  const tradeoffs = unique(
    candidates
      .sort((a, b) => b.weight - a.weight)
      .map((candidate) => candidate.label)
  );

  if (!tradeoffs.length) {
    tradeoffs.push(`Ersttermin in etwa ${therapist.nextAvailableDays} Tagen.`);
  }

  return tradeoffs.slice(0, 2);
};

export const runMatching = (answers: PatientAnswers, therapists: Therapist[]): MatchResult[] => {
  const { explicitTags, inferredTags } = getClinicalSignals(answers);
  const hasClinicalSignal = explicitTags.length > 0 || inferredTags.length > 0;
  const hasHumanSignal = answers.therapistStyle.length > 0;
  const strictMode = answers.matchingMode === "strict";
  const confidence = computeConfidence(answers);
  const categoryWeights = buildCategoryWeights(answers.matchPriority, hasClinicalSignal, hasHumanSignal);
  const practicalWeights = buildPracticalWeights(answers, answers.matchPriority);

  return therapists.map((therapist) => {
    const distanceKm = districtDistanceKm(answers.preferences.district, therapist.bezirk);
    const distanceKnown = distanceKm > 0 || answers.preferences.district === therapist.bezirk;
    const availability = computeAvailabilityCoverage(answers, therapist);
    const styleMatches = answers.therapistStyle.filter((tag) => therapist.stilTags.includes(tag));
    const settingOk =
      answers.preferences.setting === "egal" || therapist.setting.includes(answers.preferences.setting);
    const languageOk =
      !answers.preferences.language || therapist.sprache.includes(answers.preferences.language);
    const distanceOk = distanceKnown ? distanceKm <= answers.preferences.maxDistanceKm : true;
    const insuranceOk =
      answers.insurance === "egal" ? true : answers.insurance === "kasse" ? therapist.kasse : true;

    const matchedConcernIds = answers.concerns.filter((id) => {
      const tags = concernTagMap.get(id) ?? [];
      return tags.some((tag) => therapist.schwerpunkte.includes(tag));
    });
    const matchedConcernLabels = matchedConcernIds.map((id) => concernLabelMap.get(id) ?? id);

    const matchedExplicitTags = explicitTags.filter((tag) => therapist.schwerpunkte.includes(tag));
    const matchedInferredTags = inferredTags.filter((tag) => therapist.schwerpunkte.includes(tag));
    const matchedInferredLabels = unique(matchedInferredTags.map((tag) => tagLabelMap.get(tag) ?? tag));

    const explicitCoverage = explicitTags.length ? matchedExplicitTags.length / explicitTags.length : 0;
    const inferredCoverage = inferredTags.length ? matchedInferredTags.length / inferredTags.length : 0;
    const clinicalMatch = explicitTags.length
      ? clamp(explicitCoverage + inferredCoverage * 0.25, 0, 1)
      : inferredTags.length
      ? clamp(inferredCoverage * 0.75, 0, 1)
      : 0;

    const humanMatch = answers.therapistStyle.length
      ? styleMatches.length / answers.therapistStyle.length
      : 0;

    const distanceScore = distanceKnown
      ? answers.preferences.maxDistanceKm > 0
        ? distanceKm <= answers.preferences.maxDistanceKm
          ? 1
          : clamp(
              1 - (distanceKm - answers.preferences.maxDistanceKm) / answers.preferences.maxDistanceKm,
              0,
              1
            )
        : 1
      : 0.7;

    const availabilityScore =
      availability.requested > 0 ? clamp(availability.coverage, 0, 1) : 0.7;

    const waitTimeScore = computeWaitTimeScore(therapist.nextAvailableDays, answers.urgency);

    const practicalScores = {
      setting: settingOk ? 1 : 0,
      language: languageOk ? 1 : 0,
      distance: distanceScore,
      availability: availabilityScore,
      insurance: insuranceOk ? 1 : 0,
      waitTime: waitTimeScore
    };

    const practicalMatch = weightedAverage(practicalScores, practicalWeights);
    const vibeMatch = hasClinicalSignal && hasHumanSignal ? (clinicalMatch + humanMatch) / 2 : hasClinicalSignal ? clinicalMatch : hasHumanSignal ? humanMatch : 0;

    const score = clamp(
      Math.round(
        (clinicalMatch * categoryWeights.clinical +
          humanMatch * categoryWeights.human +
          practicalMatch * categoryWeights.practical +
          vibeMatch * categoryWeights.vibe) *
          100
      ),
      0,
      100
    );

    const clinicalScore = Math.round(clinicalMatch * categoryWeights.clinical * 100);
    const humanScore = Math.round(humanMatch * categoryWeights.human * 100);
    const practicalScore = Math.round(practicalMatch * categoryWeights.practical * 100);
    const vibeScore = Math.round(vibeMatch * categoryWeights.vibe * 100);

    const excludeReasons: string[] = [];
    const requiresKasse =
      answers.dealbreakers.includes("kasse-only") || (strictMode && answers.insurance === "kasse");
    if (requiresKasse && !therapist.kasse) {
      excludeReasons.push("Kein Kassenplatz.");
    }

    const requiredSetting = answers.dealbreakers.includes("online-only")
      ? "online"
      : answers.dealbreakers.includes("praxis-only")
      ? "praxis"
      : strictMode
      ? answers.preferences.setting
      : "egal";

    if (requiredSetting !== "egal" && !therapist.setting.includes(requiredSetting)) {
      excludeReasons.push(`Setting passt nicht: ${requiredSetting}.`);
    }

    const requiresLanguage = answers.dealbreakers.includes("language-only") || strictMode;
    if (requiresLanguage && answers.preferences.language && !therapist.sprache.includes(answers.preferences.language)) {
      excludeReasons.push("Gewünschte Sprache fehlt.");
    }

    const requiresDistance = answers.dealbreakers.includes("distance-only") || strictMode;
    if (requiresDistance && !distanceOk) {
      excludeReasons.push("Distanz ausserhalb des Limits.");
    }

    const requiresAvailability =
      answers.dealbreakers.includes("availability-only") ||
      (strictMode && (answers.availability.days.length > 0 || answers.availability.times.length > 0));
    if (requiresAvailability && availability.coverage === 0) {
      excludeReasons.push("Verfügbarkeit passt nicht.");
    }

    const reasons = buildReasons({
      answers,
      therapist,
      matchedConcernLabels,
      matchedInferredLabels,
      styleMatches,
      settingOk,
      languageOk,
      distanceKm,
      distanceScore,
      availability,
      insuranceOk,
      waitTimeScore,
      categoryWeights,
      practicalWeights
    });

    const tradeoffs = buildTradeoffs({
      answers,
      therapist,
      clinicalMatch,
      humanMatch,
      settingOk,
      languageOk,
      distanceScore,
      availability,
      insuranceOk,
      waitTimeScore
    });

    return {
      therapist,
      distanceKm,
      availability,
      explanation: {
        score,
        breakdown: {
          clinical: clinicalScore,
          human: humanScore,
          practical: practicalScore,
          vibe: vibeScore
        },
        reasons,
        tradeoffs,
        confidence
      },
      excluded: excludeReasons.length > 0,
      excludeReasons
    };
  });
};

export const sortMatches = (matches: MatchResult[], sortBy: "score" | "next" | "distance") => {
  const sorted = [...matches];
  sorted.sort((a, b) => {
    if (sortBy === "next") {
      const next = a.therapist.nextAvailableDays - b.therapist.nextAvailableDays;
      if (next !== 0) return next;
    }
    if (sortBy === "distance") {
      const dist = a.distanceKm - b.distanceKm;
      if (dist !== 0) return dist;
    }

    const scoreDiff = b.explanation.score - a.explanation.score;
    if (scoreDiff !== 0) return scoreDiff;

    const nextDiff = a.therapist.nextAvailableDays - b.therapist.nextAvailableDays;
    if (nextDiff !== 0) return nextDiff;

    const distanceDiff = a.distanceKm - b.distanceKm;
    if (distanceDiff !== 0) return distanceDiff;

    return a.therapist.id.localeCompare(b.therapist.id);
  });
  return sorted;
};
