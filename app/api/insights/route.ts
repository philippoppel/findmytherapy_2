import { NextResponse } from "next/server";
import type { PatientAnswers } from "../../../lib/types";

type InsightRequest = {
  answers: PatientAnswers;
  topMatches: Array<{
    name: string;
    score: number;
    reasons: string[];
    tradeoffs: string[];
  }>;
};

const trimText = (value: string, maxLength = 240) => {
  const trimmed = value.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return `${trimmed.slice(0, maxLength - 3)}...`;
};

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GROQ_API_KEY fehlt." }, { status: 400 });
  }

  let payload: InsightRequest;
  try {
    payload = (await request.json()) as InsightRequest;
  } catch (error) {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  if (!payload?.answers) {
    return NextResponse.json({ error: "Antworten fehlen." }, { status: 400 });
  }

  const { answers, topMatches } = payload;
  const topMatchSummary = (topMatches || [])
    .slice(0, 3)
    .map((match) => `- ${match.name} (${match.score}): ${match.reasons?.[0] || "Starke Passung."}`)
    .join("\n");

  const userPrompt = [
    `Name: ${answers.displayName || "nicht angegeben"}`,
    `Ziel: ${trimText(answers.primaryGoal) || "nicht angegeben"}`,
    `Anliegen: ${answers.concerns.join(", ") || "keine"}`,
    `Freitext: ${trimText(answers.concernsText) || "nicht angegeben"}`,
    `Setting: ${answers.preferences.setting}`,
    `Sprache: ${answers.preferences.language}`,
    `Bezirk: ${answers.preferences.district}`,
    `Distanz: ${answers.preferences.maxDistanceKm} km`,
    `Stil: ${answers.therapistStyle.join(", ") || "keiner"}`,
    `Kasse: ${answers.insurance}`,
    `Matching-Fokus: ${answers.matchPriority}`,
    `Top Matches:\n${topMatchSummary || "- keine"}`,
    "Bitte antworte mit: 3 Bulletpoints (kurz), 1 Trade-off, 1 nächster Schritt.",
    "Keine Diagnosen, keine medizinische Beratung."
  ].join("\n");

  let response: Response;
  try {
    response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
      model: "llama-3.1-8b-instant",
        temperature: 0,
        max_tokens: 220,
        messages: [
          {
            role: "system",
            content:
              "Du bist ein neutraler Matching-Assistent für eine Demo. Schreibe kurz, empathisch, klar. Antworte auf Deutsch. Max 90 Worte."
          },
          { role: "user", content: userPrompt }
        ]
      })
    });
  } catch (error) {
    return NextResponse.json({ error: "Groq-Request fehlgeschlagen (Netzwerk)." }, { status: 502 });
  }

  if (!response.ok) {
    const raw = await response.text();
    let message = raw;
    try {
      const parsed = JSON.parse(raw);
      message = parsed?.error?.message ?? parsed?.error ?? raw;
    } catch (error) {
      message = raw || "Unbekannter Fehler.";
    }
    const authHint = response.status === 401 || response.status === 403 ? " (API-Key prüfen)" : "";
    return NextResponse.json(
      { error: `Groq-Request fehlgeschlagen (${response.status})${authHint}: ${message}` },
      { status: 502 }
    );
  }

  const data = await response.json();
  const summary = data?.choices?.[0]?.message?.content?.trim() ?? "";

  return NextResponse.json({ summary });
}
