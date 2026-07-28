import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { topic, level } = await req.json();

  if (!topic) {
    return NextResponse.json({ error: "Missing topic" }, { status: 400 });
  }

  const lesson = {
    title: `Introduction to ${topic}`,
    objectives: [
      `Understand core concepts of ${topic}`,
      `Apply ${topic} in DFIR`,
      `Analyse scenarios involving ${topic}`,
    ],
    outline: [
      "1. Overview",
      "2. Core concepts",
      "3. Hands‑on example",
      "4. Common mistakes",
      "5. Summary quiz",
    ],
    duration:
      level === "Beginner"
        ? "60 minutes"
        : level === "Advanced"
        ? "120 minutes"
        : "90 minutes",
  };

  return NextResponse.json({ lesson });
}
