"use client";

import { HeartPulse, Leaf, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const promises = [
  {
    icon: Leaf,
    title: "We Are Committed to Sustainability",
    text: "We focus not only on being economically viable but in being socially responsible and environmentally sensible as well. We ensure to meet the needs of the present generation while taking into consideration the ability of the next generation to meet its own needs.",
  },
  {
    icon: Lightbulb,
    title: "We Provide Solutions",
    text: "Our customers are our inspiration. We listen to and understand their needs. Our wide portfolio of products enables us to create options and our ability to customize products allows us to respond to the customer's specific requirements to ensure their satisfaction.",
  },
  {
    icon: HeartPulse,
    title: "We Help the Community",
    text: "We immerse ourselves in a community and surround us with people who are dedicated to bettering the world. We gain a unique sense of purpose by serving those around us, one which reflects in other areas of our lives. For a better future, it's our initiative to help our community in every way we can.",
  },
];

export function QuantaPromise() {
  return (
    <section className="bg-[#f7f6f2] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a651]">
            The Quanta Promise
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-[#0f3f2a] md:text-5xl">
            At Quanta Paper...
          </h2>
          <p className="mt-4 text-sm text-[#5b6460] md:text-base">
            Our commitments shape how we do business and serve the people who
            count on us.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {promises.map(({ icon: Icon, title, text }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col items-center rounded-2xl border border-t-[3px] border-black/10 border-t-[#6aa876] bg-white px-8 pb-10 pt-10 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#e6f0e7]">
                <Icon className="h-8 w-8 text-[#0b6b3a]" strokeWidth={1.5} />
              </div>

              {/* min height = two lines, so every paragraph starts at the same y */}
              <h3 className="mt-7 flex min-h-[54px] items-start justify-center text-xl font-bold leading-[1.35] tracking-tight text-[#0f4a2c]">
                {title}
              </h3>

              <p className="mt-4 text-[13px] leading-[1.9] text-[#5b6460]">
                {text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
