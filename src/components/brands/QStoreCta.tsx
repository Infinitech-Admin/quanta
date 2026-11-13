import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { QSTORE_URL, INSTITUTIONAL_CONTACTS } from "./constants";

export function QStoreCta() {
  return (
    <section className="bg-[#f9f7f1] px-6 pb-20 pt-4">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 overflow-hidden rounded-[28px] bg-gradient-to-r from-[#14533a] via-[#2a6b49] to-[#4f8b5e] p-8 text-white shadow-xl md:flex-row md:items-center md:justify-between md:p-10">
        <div className="flex items-center gap-8">
          <div
            aria-hidden
            className="hidden h-28 w-24 -rotate-6 items-center justify-center rounded-2xl bg-[#00a651] shadow-lg sm:flex"
          >
            <ShoppingBag className="h-10 w-10 text-[#0b5a32]" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-[-0.04em] md:text-4xl">
              Ready to browse products?
            </h2>
            <p className="mt-3 max-w-md text-sm leading-[1.8] text-white/85">
              Discover the Quanta brands that fit your needs and explore
              available products at QStore.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 md:w-auto md:min-w-[200px]">
          <a
            href={QSTORE_URL}
            className="inline-flex items-center justify-between gap-6 rounded-full bg-[#00a651] px-6 py-3.5 text-xs font-bold hover:bg-[#009447]"
          >
            Visit QStore <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a
            href={INSTITUTIONAL_CONTACTS.email.href}
            className="inline-flex items-center justify-between gap-6 rounded-full border border-white/60 px-6 py-3.5 text-xs font-bold hover:bg-white/10"
          >
            Talk to our team <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
