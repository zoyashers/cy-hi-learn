"use client";

import { useState } from "react";
import Link from "next/link";

export default function Mission3Page() {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hintShown, setHintShown] = useState(false);

  const mission = {
    title: "Evidence Foundations",
    number: "03",
    path: "Digital Forensics",
    description:
      "Build your understanding of digital evidence before beginning a forensic investigation.",
    story: `A laptop has been seized from a suspect involved in a cyber-enabled fraud case.

Before you can investigate anything, you must demonstrate your understanding of the different categories of digital evidence and how they support an investigation.

Your supervisor wants to see if you can identify what types of evidence a forensic examiner should extract first — and why.`,
    learningOutcome:
      "Identify and classify different types of digital evidence and explain their relevance to an investigation.",
    tasks: [
      "List 5 types of digital evidence that can be found on a typical computer.",
      "Explain why each type is relevant to a forensic investigation.",
      "Identify which evidence type should be prioritised first and justify your choice.",
    ],
    xp: 50,
    hint: "Think about logs, metadata, browser data, system artifacts, and user-generated files.",
  };

  const handleSubmit = () => {
    if (!answer.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-6xl">
      {/* HEADER */}

      <div className="mb-8">
        <Link
          href="/learn/missions"
          className="text-sm text-slate-500 transition hover:text-cyan-400"
        >
          ← Back to Missions
        </Link>

        <div className="mt-6 flex flex-col justify-between gap-5 md:flex-row md:items-start">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-cyan-400">
                MISSION {mission.number}
              </span>

              <span className="rounded-full border border-violet-400/20 bg-violet-400/5 px-3 py-1 text-xs text-violet-300">
                {mission.path}
              </span>
            </div>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">
              {mission.title}
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              {mission.description}
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-violet-400/20 bg-violet-400/5 px-5 py-4 text-center">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Reward
            </p>

            <p className="mt-1 text-2xl font-bold text-violet-300">
              +{mission.xp} XP
            </p>
          </div>
        </div>
      </div>

      {/* MISSION STORY */}

      <section className="relative mb-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1422] p-7">
        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300">
              01
            </span>

            <div>
              <p className="text-xs uppercase tracking-widest text-violet-400">
                Investigation briefing
              </p>

              <h2 className="mt-1 text-xl font-bold text-white">
                Mission Story
              </h2>
            </div>
          </div>

          <p className="mt-6 max-w-4xl whitespace-pre-line text-sm leading-7 text-slate-400">
            {mission.story}
          </p>
        </div>
      </section>

      {/* LEARNING OUTCOME */}

      <section className="mb-6 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.03] p-7">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
            02
          </span>

          <div>
            <p className="text-xs uppercase tracking-widest text-cyan-400">
              What you'll learn
            </p>

            <h2 className="mt-1 text-xl font-bold text-white">
              Learning Outcome
            </h2>
          </div>
        </div>

        <p className="mt-5 text-sm leading-7 text-slate-400">
          {mission.learningOutcome}
        </p>
      </section>

      {/* TASKS */}

      <section className="mb-6 rounded-2xl border border-white/10 bg-[#0d1422] p-7">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300">
            03
          </span>

          <div>
            <p className="text-xs uppercase tracking-widest text-violet-400">
              Your investigation
            </p>

            <h2 className="mt-1 text-xl font-bold text-white">
              Mission Tasks
            </h2>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {mission.tasks.map((task, index) => (
            <div
              key={index}
              className="flex gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 text-xs font-bold text-cyan-400">
                {index + 1}
              </span>

              <p className="text-sm leading-6 text-slate-400">
                {task}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HINT */}

      <section className="mb-6">
        <button
          onClick={() => setHintShown(!hintShown)}
          className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          {hintShown ? "Hide Hint" : "Show Hint"}
        </button>

        {hintShown && (
          <div className="mt-3 rounded-xl border border-yellow-400/10 bg-yellow-400/[0.03] p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-yellow-400">
              Analyst Hint
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              {mission.hint}
            </p>
          </div>
        )}
      </section>

      {/* ANSWER */}

      <section className="mb-10 rounded-2xl border border-white/10 bg-[#0d1422] p-7">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
            04
          </span>

          <div>
            <p className="text-xs uppercase tracking-widest text-cyan-400">
              Submit your investigation
            </p>

            <h2 className="mt-1 text-xl font-bold text-white">
              Analyst Notes
            </h2>
          </div>
        </div>

        <p className="mt-5 text-sm leading-6 text-slate-500">
          Record your reasoning below. Explain not only what evidence you
          identified, but why it matters.
        </p>

        <textarea
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            setSubmitted(false);
          }}
          placeholder="Write your investigation notes here..."
          className="mt-5 min-h-[220px] w-full resize-y rounded-xl border border-white/10 bg-[#080d18] p-5 text-sm leading-7 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40"
        />

        <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-600">
            {answer.length} characters
          </p>

          <button
            onClick={handleSubmit}
            disabled={!answer.trim()}
            className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Submit Mission →
          </button>
        </div>

        {submitted && (
          <div className="mt-5 rounded-xl border border-green-400/20 bg-green-400/5 p-5">
            <div className="flex items-center gap-3">
              <span className="text-xl text-green-400">✓</span>

              <div>
                <p className="font-semibold text-green-300">
                  Mission submitted
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Your investigation has been recorded. +{mission.xp} XP
                  earned.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}