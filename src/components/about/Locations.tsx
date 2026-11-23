import Image from "next/image";
import { places, landline, mobile } from "./content";
import { Wrap, SectionHead, Eyebrow, card } from "./ui";

const contacts = [
  { label: "Consumer Sales", email: "salesadmin@quantapaper.com" },
  {
    label: "Institutional Sales",
    email: "quanta.institutionals@quantapaper.com",
  },
  { label: "Credit & Collection", email: "cnc@quantapaper.com" },
  { label: "Human Resources", email: "human.resources@quantapaper.com" },
];

export function Locations() {
  return (
    <section className="bg-white py-24">
      <Wrap>
        <SectionHead
          id="locations"
          eyebrow="Where to Find Us"
          copy="The facilities and offices that support Quanta's manufacturing, customer service, and order processing."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className={`${card} overflow-hidden lg:self-start`}>
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

          <div className="relative isolate overflow-hidden rounded-2xl bg-[#00683a] p-7 text-white">
            {/* Q background: sakop ang buong card, may fade sa kaliwa lang */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-50"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 45%)",
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 45%)",
              }}
            >
              <Image
                src="/images/MAIN-BANNER-2.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                quality={90}
                className="object-cover object-right"
              />
            </div>

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

            {/* Contact details */}
            <div className="mt-6 border-t border-white/20 pt-5">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em]">
                Contact
              </h3>
              <div className="mt-5 grid gap-y-4">
                {contacts.map((c) => (
                  <div
                    key={c.label}
                    className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <h4 className="text-sm font-bold">{c.label}</h4>
                    <a
                      href={`mailto:${c.email}`}
                      className="text-[13px] text-white/90 hover:underline"
                    >
                      {c.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
