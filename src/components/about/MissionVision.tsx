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
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Mission &amp; Vision
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            ["Our vision", vision],
            ["Our mission", mission],
          ].map(([h, t]) => (
            <article
              key={h}
              className="rounded-2xl border border-white/20 bg-white/10 p-7 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-transparent hover:bg-[#f8f6f4] hover:text-[#0b6e3e] hover:shadow-[0_24px_40px_-20px_rgba(0,0,0,0.45)]"
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
