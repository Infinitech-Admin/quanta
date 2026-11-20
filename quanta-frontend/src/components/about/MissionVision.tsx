import { vision, mission } from "./content";
import { Wrap, greenBg } from "./ui";

export function MissionVision() {
  return (
    <section className={`relative overflow-hidden ${greenBg} py-20 text-white`}>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-20 h-[620px] w-[620px] rounded-full border-[90px] border-white/[0.05]"
      />
      <Wrap className="relative">
        <div id="mission" className="scroll-mt-16 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em]">
            Mission & vision
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Rooted in vision, grown by mission.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            ["Our vision", vision],
            ["Our mission", mission],
          ].map(([h, t]) => (
            <article
              key={h}
              className="rounded-2xl border border-white/20 bg-white/10 p-7 backdrop-blur-sm"
            >
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">
                {h}
              </h3>
              <p className="mt-5 text-xl font-bold leading-8">{t}</p>
            </article>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
