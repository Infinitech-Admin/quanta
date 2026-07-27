import { Eyebrow, Icon, type IconShape } from "./ui";
import { coreValues } from "./content";

export function CoreValues() {
  return (
    <section className="section-green-gradient py-24 text-[var(--color-cream)]">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <Eyebrow>Our Core Values</Eyebrow>
        <h2 className="mt-4 max-w-2xl font-[var(--font-fraunces)] text-4xl leading-tight text-[var(--color-cream)] sm:text-5xl">
          Six things we don't compromise on.
        </h2>

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((v) => (
            <div key={v.name}>
              <Icon
                shape={v.shape as IconShape}
                className="h-9 w-9 text-[var(--color-sun)]"
              />
              <h3 className="mt-4 font-[var(--font-fraunces)] text-xl text-[var(--color-cream)]">
                {v.name}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-cream)]/75">
                {v.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
