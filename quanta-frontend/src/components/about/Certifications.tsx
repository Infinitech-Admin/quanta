import { certs } from "./content";
import { Wrap, SectionHead, Eyebrow, card } from "./ui";

export function Certifications() {
  return (
    <section className="bg-[#f2f4ef] py-24">
      <Wrap>
        <SectionHead
          id="certifications"
          center
          eyebrow="Certifications"
          title="Certified. Trusted. Assured."
          copy="Quality and responsible practices are central to our work, supported by the standards and certifications relevant to our products and operations."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certs.map((c) => (
            <li
              key={c.title}
              className={`${card} flex flex-col items-center p-7 text-center`}
            >
              <span className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-[var(--green)] text-lg font-bold text-white ring-2 ring-[#1ea05c] ring-offset-2 ring-offset-white">
                {c.mark}
              </span>
              <Eyebrow className="mt-6 !text-[10px]">{c.tag}</Eyebrow>
              <h3 className="mt-3 text-xl font-bold text-[var(--green-deep)]">
                {c.title}
              </h3>
              <p className="mt-3 text-xs leading-6 text-[var(--ink)]/65">
                {c.copy}
              </p>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}
