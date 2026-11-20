interface PageBannerProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PageBanner({ eyebrow, title, description }: PageBannerProps) {
  return (
    <section className="section-green-gradient relative py-24 px-6 md:px-16 text-center">
      {eyebrow && (
        <span className="inline-block rounded-full border border-[var(--color-sun)]/40 px-4 py-1 text-xs tracking-widest uppercase text-[var(--color-sun-light)] mb-6">
          {eyebrow}
        </span>
      )}
      <h1 className="font-serif text-4xl md:text-5xl text-[var(--color-cream)] max-w-3xl mx-auto">
        {title}
      </h1>
      {description && (
        <p className="mt-4 text-[var(--color-cream)]/70 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </section>
  );
}
