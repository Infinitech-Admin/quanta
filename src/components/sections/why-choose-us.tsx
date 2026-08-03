"use client";

import { Handshake, Lightbulb, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: Handshake,
    title: "We Are Committed to Sustainability",
    text: "We focus not only on being economically viable but in being socially responsible and environmentally sensible as well. We ensure to meet the needs of the present generation while taking into consideration the ability of the next generation to meet its own needs.",
  },
  {
    icon: Lightbulb,
    title: "We Provide Solutions",
    text: "Our customers are our inspiration. We listen to and understand their needs. Our wide portfolio of products enables us to create options and our ability to customize products allows us to respond to the customer's specific requirements to ensure their satisfaction.",
  },
  {
    icon: HeartHandshake,
    title: "We Help the Community",
    text: "We immerse ourselves in a community and surround us with people who are dedicated to bettering the world. We gain a unique sense of purpose by serving those around us, one which reflects in other areas of our lives. For a better future, it's our initiative to help our community in every way we can.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative bg-[var(--color-cream)] overflow-hidden">
      {/* subtle dot pattern background, tied to the brand's vivid green */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-forest-vivid) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-16 pt-20 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="font-serif text-center text-3xl md:text-4xl font-bold uppercase tracking-wide text-[var(--color-forest)]">
            Why Choose Quanta Paper?
          </h2>

          {/* thin accent divider tying heading to cards */}
          <div className="flex justify-center mt-5 mb-14">
            <div className="h-1 w-16 rounded-full bg-[var(--color-forest-light)]" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {reasons.map(({ icon: Icon, title, text }, index) => (
            <div
              key={title}
              className="flex flex-col items-center text-center gap-5"
            >
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div
                  className="h-32 w-32 rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    background:
                      "linear-gradient(to bottom right, var(--color-forest-light), var(--color-forest-vivid))",
                    boxShadow: "0 0 0 4px rgba(76, 138, 85, 0.2)",
                  }}
                >
                  <Icon
                    className="h-14 w-14 text-[var(--color-cream)]"
                    strokeWidth={1.5}
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 180 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <h3 className="font-bold text-2xl uppercase text-[var(--color-forest-vivid)]">
                  {title}
                </h3>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 180 }}
                whileInView={{ opacity: 1.8, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <p className="text-sm text-[var(--color-forest-deep)]/70 leading-relaxed max-w-xs">
                  {text}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
