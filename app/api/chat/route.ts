import { NextResponse } from "next/server";
import type { PatientAnswers } from "../../../lib/types";

type ChatRequest = {
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  answers: PatientAnswers;
  topMatches: Array<{
    name: string;
    score: number;
    reasons: string[];
    tradeoffs: string[];
    confidence: number;
  }>;
};

const trimText = (value: string, maxLength = 260) => {
  const trimmed = value.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return `${trimmed.slice(0, maxLength - 3)}...`;
};

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GROQ_API_KEY fehlt." }, { status: 400 });
  }

  let payload: ChatRequest;
  try {
    payload = (await request.json()) as ChatRequest;
  } catch (error) {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  if (!payload?.answers || !payload?.messages) {
    return NextResponse.json({ error: "Daten fehlen." }, { status: 400 });
  }

  const { answers, topMatches } = payload;
  const topSummary = (topMatches || [])
    .slice(0, 5)
    .map((match) => {
      const reason = match.reasons?.[0] || "Gute Passung.";
      const tradeoff = match.tradeoffs?.[0] || "Keine harten Konflikte.";
      return `- ${match.name} (${match.score}): ${reason} Trade-off: ${tradeoff}`;
    })
    .join("\n");

  const context = [
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
    `Top Matches:\n${topSummary || "- keine"}`
  ].join("\n");

  const chatHistory = (payload.messages || [])
    .slice(-8)
    .map((msg) => ({
      role: msg.role,
      content: trimText(msg.content, 500)
    }));

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
        temperature: 0.4,
        max_tokens: 260,
        messages: [
          {
            role: "system",
            content:
              "Du bist ein empathischer Matching-Chat für eine Demo. Empfehlungen müssen strikt aus der Liste der Top Matches stammen. Erkläre transparent anhand der Gründe und nenne einen Trade-off. Keine Diagnosen, keine medizinische Beratung. Schreibe freundlich, persönlich und knapp. Schließe mit einer kurzen Frage."
          },
          { role: "user", content: context },
          ...chatHistory
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
  const reply = data?.choices?.[0]?.message?.content?.trim() ?? "";

  return NextResponse.json({ reply });
}
