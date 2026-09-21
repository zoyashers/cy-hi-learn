import Link from "next/link";

const missions = [
  {
    number: "01",
    title: "Digital Forensics",
    description:
      "Investigate digital evidence, analyse artifacts and build conclusions from what the evidence tells you.",
    progress: 3,
    total: 6,
    status: "In progress",
    href: "/learn/missions/digital-forensics/3",
  },
  {
    number: "02",
    title: "SOC Analyst",
    description:
      "Analyse alerts, investigate suspicious activity and learn how analysts respond to incidents.",
    progress: 0,
    total: 6,
    status: "Not started",
    href: "/learn/missions/soc-analyst",
  },
];

export default function MissionsOverview() {
  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}

      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Practical investigations
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">
          Missions
        </h1>

        <p className="mt-3 max-w-2xl text-slate-400">
          Apply what you've learned through realistic cybersecurity
          investigations and challenges.
        </p>
      </div>

      {/* Current mission */}

      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              Continue investigation
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              Your current mission
            </h2>
          </div>

          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs font-medium text-cyan-300">
            In progress
          </span>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1422] p-7">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-medium text-cyan-400">
                  Digital Forensics · Mission 03
                </p>

                <h3 className="mt-2 text-2xl font-bold text-white">
                  Suspicious USB Device
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                  Investigate a suspicious USB device and determine what
                  happened by following the available evidence.
                </p>
              </div>

              <Link
                href="/learn/missions/digital-forensics/3"
                className="shrink-0 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3 text-center text-sm font-semibold text-white transition hover:scale-[1.02]"
              >
                Continue Mission →
              </Link>
            </div>

            {/* Progress */}

            <div className="mt-7">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Mission progress
                </span>

                <span className="font-medium text-slate-300">
                  3 / 6
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                  style={{ width: "50%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission paths */}

      <section>
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            Investigation paths
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            All missions
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {missions.map((mission) => {
            const percentage =
              mission.total > 0
                ? (mission.progress / mission.total) * 100
                : 0;

            return (
              <div
                key={mission.number}
                className="group rounded-2xl border border-white/10 bg-[#0d1422] p-6 transition hover:-translate-y-1 hover:border-cyan-400/20"
              >
                <div className="flex items-start justify-between">
                  <span className="text-sm font-bold text-cyan-400">
                    {mission.number}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      mission.progress > 0
                        ? "bg-cyan-400/10 text-cyan-300"
                        : "bg-white/5 text-slate-500"
                    }`}
                  >
                    {mission.status}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-white">
                  {mission.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {mission.description}
                </p>

                {/* Progress */}

                <div className="mt-6">
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-slate-600">
                      Progress
                    </span>

                    <span className="text-slate-400">
                      {mission.progress}/{mission.total}
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                <Link
                  href={mission.href}
                  className="mt-6 inline-block text-sm font-medium text-cyan-400 transition group-hover:text-cyan-300"
                >
                  {mission.progress > 0
                    ? "Continue →"
                    : "View missions →"}
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}