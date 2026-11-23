import Image from "next/image";
import { vision, mission } from "./content";
import { Wrap } from "./ui";

export function MissionVision() {
  return (
    <section className="relative isolate overflow-hidden bg-[#00683a] py-20 text-white">
      {/* Q background image: kasing-taas ng section, naka-right, buo ang Q. Ang fade ay nasa image mismo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 -z-10 aspect-[2576/978] h-full opacity-60 md:opacity-100"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 35%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 35%)",
        }}
      >
        <Image
          src="/images/MAIN-BANNER-2.png"
          alt=""
          fill
          sizes="(min-width: 768px) 1000px, 100vw"
          quality={90}
          className="object-cover"
        />
      </div>

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
