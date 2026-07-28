import {
  HeartHandshake,
  Sprout,
  ShieldCheck,
  Award,
  HeartPulse,
  GraduationCap,
  Trophy,
  PartyPopper,
} from "lucide-react";

const values = [
  {
    Icon: HeartHandshake,
    title: "Family First",
    description:
      "You share in every milestone and every win, backed by the genuine care of your colleagues and superiors.",
  },
  {
    Icon: Sprout,
    title: "Room to Grow",
    description:
      "Professional development opportunities meet you at every phase of your career, not just the start.",
  },
  {
    Icon: ShieldCheck,
    title: "Character Matters",
    description:
      "We look for the competencies and character expected of a Quanta employee, and nurture both.",
  },
  {
    Icon: Award,
    title: "Recognized Work",
    description:
      "Commitment and dedication don't go unnoticed here. Your contribution is rewarded and celebrated.",
  },
];

const perks = [
  { Icon: HeartPulse, label: "Health & wellness support" },
  { Icon: GraduationCap, label: "Learning & development" },
  { Icon: Trophy, label: "Recognition programs" },
  { Icon: PartyPopper, label: "Team milestones & celebrations" },
];

export function CareersCulture() {
  return (
    <section className="bg-[var(--paper)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="font-[var(--font-body)] text-xs font-semibold uppercase tracking-[0.3em] text-[var(--kraft)]">
            The Quanta Way
          </span>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl italic text-[var(--forest-deep)] sm:text-4xl">
            What it means to wear the leaf
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="group rounded-2xl bg-[var(--mist)] p-6 ring-1 ring-[var(--leaf)]/15 transition-colors hover:bg-[var(--leaf)]/10"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--forest-deep)] text-[var(--sunlight)]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-[var(--font-display)] text-lg italic text-[var(--forest-deep)]">
                {title}
              </h3>
              <p className="mt-2 font-[var(--font-body)] text-sm leading-relaxed text-[var(--ink)]/70">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* Perks strip */}
        <div className="mt-14 rounded-2xl bg-[var(--forest-deep)] px-6 py-8 sm:px-10">
          <p className="text-center font-[var(--font-body)] text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sunlight)]">
            What You&apos;ll Enjoy
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map(({ Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl bg-[var(--paper)]/5 px-4 py-3 ring-1 ring-[var(--paper)]/10"
              >
                <Icon className="h-5 w-5 shrink-0 text-[var(--leaf)]" />
                <span className="font-[var(--font-body)] text-sm text-[var(--paper)]/85">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
