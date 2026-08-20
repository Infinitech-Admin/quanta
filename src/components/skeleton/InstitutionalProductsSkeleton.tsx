// components/skeleton/InstitutionalProductsSkeleton.tsx
export function InstitutionalProductsSkeleton() {
  return (
    <section className="py-24 px-6 md:px-16 bg-white animate-pulse">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="mx-auto mb-4 h-6 w-28 rounded-full bg-gray-200" />
          <div className="mx-auto mb-4 h-9 w-72 rounded bg-gray-200" />
          <div className="mx-auto h-4 w-96 max-w-full rounded bg-gray-200" />
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="aspect-square w-full rounded-2xl bg-gray-200" />
              <div className="h-4 w-20 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
