import { places, landline, mobile } from "./content";
import { Wrap, SectionHead, Eyebrow, card } from "./ui";

export function Locations() {
  return (
    <section className="bg-white py-24">
      <Wrap>
        <SectionHead
          id="locations"
          eyebrow="Where to Find Us"
          copy="The facilities and offices that support Quanta's manufacturing, customer service, and order processing."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          <div className={`${card} overflow-hidden`}>
            <div className="border-b border-[var(--green)]/10 bg-[var(--paper)]/60 px-7 py-5">
              <Eyebrow>Main locations</Eyebrow>
            </div>
            <div className="grid gap-4 p-7 sm:grid-cols-2">
              {places.map((p) => (
                <div
                  key={p.tag}
                  className="rounded-xl border border-[var(--green)]/10 bg-[var(--paper)]/50 p-5"
                >
                  <Eyebrow className="!text-[10px]">{p.tag}</Eyebrow>
                  <h3 className="mt-3 text-2xl font-bold leading-tight text-[var(--green-deep)]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-xs leading-6 text-[var(--ink)]/65">
                    {p.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </p>
                  <p className="mt-1 text-xs italic text-[var(--ink)]/60">
                    {p.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-[var(--green)] p-7 text-white">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em]">
              Customer service & order processing
            </h3>
            <div className="mt-6 grid grid-cols-2 gap-6 text-[13px] leading-8">
              {[
                ["Landline", landline],
                ["Mobile / Fax", mobile],
              ].map(([h, rows]) => (
                <div key={h as string}>
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.15em]">
                    {h as string}
                  </h4>
                  {(rows as string[]).map((r) => (
                    <p key={r}>{r}</p>
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-5 text-[13px]">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em]">
                Email
              </span>
              <a
                href="mailto:wecare@quantapaper.com"
                className="underline underline-offset-4"
              >
                wecare@quantapaper.com
              </a>
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
