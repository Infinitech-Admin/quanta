// TODO: palitan ng totoong numbers niyo
const stats = [
  { value: "20+", label: "Years of Experience" },
  { value: "3", label: "Brands" },
  { value: "10K+", label: "Tons Produced Yearly" },
  { value: "500+", label: "Employees" },
];

export function Stats() {
  return (
    <section className="bg-[var(--color-forest-deep)] py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-serif text-4xl text-[var(--color-sun)]">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-[var(--color-cream)]/70">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
