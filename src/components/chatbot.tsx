"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, HeadphonesIcon, Clock, MessageSquare } from "lucide-react";

type SenderType = "user" | "bot";
type Message = {
  id: string;
  text: string;
  sender: SenderType;
  suggestions?: string[];
};

const CONTACT = {
  email: "wecare@quantapaper.com",
  phone: "(632) 8533-9250",
  fax: "(632) 8533-7295",
  address:
    "149-A Rev. Aglipay St., Bgy. Old Zaniga, Mandaluyong City, Philippines",
  plantAddress:
    "Ninoy Aquino Highway beside TIPCO Gate 3, Barangay Paralayunan, Mabalacat City, Pampanga",
  mapUrl: "https://maps.app.goo.gl/JPqUN64Ry6JCeG8M7",
  contactFormUrl: "/contact",
  shopUrl: "https://qstore.ph/products",
  groupUrl: "/group-of-companies",
  hours: "Mon–Sun 9AM–6PM",
  departments: {
    customerCare: "wecare@quantapaper.com",
    creditCollection: "cnc@quantapaper.com",
    consumerSales: "salesadmin@quantapaper.com",
    institutionalSales: "quanta.institutionals@quantapaper.com",
    hr: "human.resources@quantapaper.com",
  },
};

const PRODUCT_CATEGORIES = {
  paper: {
    label: "Paper Products",
    brands: [
      "Fresh Premium Eco-Pulp",
      "Kami",
      "Smart Choice",
      "Vanita",
      "Fresh",
      "Harmony",
      "Fresh by Eco Hygiene",
    ],
  },
  personal_care: {
    label: "Personal Care Products",
    brands: ["Sweet Baby", "Prime Care", "Life Defender"],
  },
  oral_care: {
    label: "Oral Care Products",
    brands: ["Fresh Toothbrush", "Teabiotic"],
  },
} as const;

type ProductCategoryKey = keyof typeof PRODUCT_CATEGORIES;
type FaqTopic = "product" | "ordering" | "distribution" | "general";

const CAREERS = [
  { title: "Business Control", url: "/careers/business-control" },
  { title: "Admin Staff", url: "/careers/admin-staff" },
  { title: "Accounting Supervisor", url: "/careers/accounting-supervisor" },
  { title: "Logistics Officer", url: "/careers/logistic-officer" },
  { title: "DC Supervisor", url: "/careers/dc-supervisor" },
  { title: "Logistics Coordinator", url: "/careers/logistic-coordinator" },
];

interface Intent {
  action?:
    | "products"
    | "about"
    | "careers"
    | "contact"
    | "shop"
    | "group"
    | "faq";
  productCategory?: ProductCategoryKey;
  faqTopic?: FaqTopic;
}

function detectIntent(text: string): Intent {
  const lower = text.toLowerCase();
  const intent: Intent = {};

  // Products (category-specific first, generic fallback after)
  if (
    /\b(paper|tissue|napkin|towel|eco-pulp|kami|smart choice|vanita|harmony)\b/.test(
      lower,
    )
  ) {
    intent.action = "products";
    intent.productCategory = "paper";
  } else if (
    /\b(personal care|baby|diaper|feminine|sweet baby|prime care|life defender)\b/.test(
      lower,
    )
  ) {
    intent.action = "products";
    intent.productCategory = "personal_care";
  } else if (/\b(oral care|toothbrush|teabiotic|dental)\b/.test(lower)) {
    intent.action = "products";
    intent.productCategory = "oral_care";
  } else if (/\b(products?|brands?|catalog)\b/.test(lower)) {
    intent.action = "products";
  }

  // FAQ (checked before generic action words so topic sticks)
  if (/product inquir/.test(lower)) {
    intent.action = "faq";
    intent.faqTopic = "product";
  } else if (/\bordering\b/.test(lower)) {
    intent.action = "faq";
    intent.faqTopic = "ordering";
  } else if (/\bdistribution\b/.test(lower)) {
    intent.action = "faq";
    intent.faqTopic = "distribution";
  } else if (/general company info/.test(lower)) {
    intent.action = "faq";
    intent.faqTopic = "general";
  } else if (/\b(faq|frequently asked)\b/.test(lower)) {
    intent.action = "faq";
  }

  if (/\b(career|job|hiring|vacanc(y|ies)|apply|employment)\b/.test(lower))
    intent.action = "careers";
  if (
    /\b(contact|address|location|office|phone|number|saan|where|map)\b/.test(
      lower,
    )
  )
    intent.action = "contact";
  if (/\b(shop|buy|purchase|order online|qstore|store)\b/.test(lower))
    intent.action = "shop";
  if (
    /\b(group|companies|subsidiar(y|ies)|marketing inc|eco hygiene|foundation)\b/.test(
      lower,
    )
  )
    intent.action = "group";
  if (
    /\b(about|who are you|quanta|mission|vision|history|certif|iso 9001|halal|sustainab)\b/.test(
      lower,
    )
  )
    intent.action = "about";

  return intent;
}

const INITIAL_SUGGESTIONS = [
  "Browse our products",
  "Shop now",
  "About Quanta Paper",
  "Careers",
  "Contact us",
  "Frequently Asked Questions",
];

const BACK_CHIP = "← Back to main menu";
function withBack(suggestions: string[]): string[] {
  if (suggestions.includes(BACK_CHIP)) return suggestions;
  return [...suggestions, BACK_CHIP];
}

function getStaticResponse(
  intent: Intent,
): { text: string; suggestions: string[] } | null {
  switch (intent.action) {
    case "products": {
      if (intent.productCategory) {
        const cat = PRODUCT_CATEGORIES[intent.productCategory];
        return {
          text: `🧻 **${cat.label}**\n\nOur brands:\n${cat.brands
            .map((b) => `• ${b}`)
            .join("\n")}\n\n[Shop these now](${CONTACT.shopUrl})`,
          suggestions: withBack(["See other product categories", "Contact us"]),
        };
      }
      return {
        text: `🧻 **Our Products**\n\n📦 **Paper Products** — Fresh Premium Eco-Pulp, Kami, Smart Choice, Vanita, Fresh, Harmony, Fresh by Eco Hygiene\n\n👶 **Personal Care** — Sweet Baby, Prime Care, Life Defender\n\n🦷 **Oral Care** — Fresh Toothbrush, Teabiotic\n\n[Shop all products](${CONTACT.shopUrl})`,
        suggestions: withBack([
          "Paper products",
          "Personal care products",
          "Oral care products",
        ]),
      };
    }

    case "about":
      return {
        text: `🏢 **Quanta Paper Corporation**\n\nFounded in 2003, we're a reputable brand builder of high-quality, affordable, hygienic, and environment-friendly products.\n\n✅ ISO 9001:2015 certified\n✅ Green Choice Philippines seal\n✅ Halal (IDCP) certified\n\n🏭 5 paper machines · 30+ converting lines · 70-hectare plant in Mabalacat, Pampanga\n👥 1,000+ workforce`,
        suggestions: withBack([
          "Our group of companies",
          "Careers",
          "Contact us",
        ]),
      };

    case "careers":
      return {
        text: `💼 **Careers at Quanta Paper Corporation**\n\nCurrent openings:\n${CAREERS.map(
          (c) => `• [${c.title}](${c.url})`,
        ).join("\n")}\n\n📧 Send your resume to **${CONTACT.departments.hr}**`,
        suggestions: withBack(["About Quanta Paper", "Contact us"]),
      };

    case "contact":
      return {
        text: `📍 **Corporate Office**\n${CONTACT.address}\n\n🏭 **Manufacturing Plant**\n${CONTACT.plantAddress}\n\n📞 ${CONTACT.phone}\n📠 ${CONTACT.fax}\n📧 ${CONTACT.email}\n🕐 ${CONTACT.hours}\n\n[View on map](${CONTACT.mapUrl}) · [Send us an inquiry](${CONTACT.contactFormUrl})`,
        suggestions: withBack(["Browse products", "Careers"]),
      };

    case "shop":
      return {
        text: `🛒 Shop our full lineup online: [qstore.ph/products](${CONTACT.shopUrl})`,
        suggestions: withBack(["Browse products", "Contact us"]),
      };

    case "group":
      return {
        text: `🏢 **Our Group of Companies**\n\n📦 **Quanta Paper Corporation** — Paper Manufacturing\n🏪 **Quanta Paper Marketing, Inc.** — Retail Distribution & Marketing\n🏬 **Eco Hygiene Institutional Sales Corp.** — Institutional Sales\n❤️ **Quanta Foundation, Inc.** — Corporate Social Responsibility\n\n[Learn more](${CONTACT.groupUrl})`,
        suggestions: withBack(["About Quanta Paper", "Browse products"]),
      };

    case "faq": {
      switch (intent.faqTopic) {
        case "product":
          return {
            text: `❓ **Product Inquiries**\n\nQ: Are your products eco-friendly?\nA: Yes — our paper products use recycled fiber and FSC-certified virgin pulp.\n\nQ: Are your products certified?\nA: Yes — ISO 9001:2015, Green Choice Philippines, and Halal (IDCP) certified.`,
            suggestions: withBack(["Browse products", "Ordering"]),
          };
        case "ordering":
          return {
            text: `❓ **Ordering**\n\nQ: Where can I buy Quanta Paper products?\nA: [Shop online](${CONTACT.shopUrl}), or find us in supermarkets, sari-sari stores, hotels, and restaurants nationwide.\n\nQ: Do you sell to businesses in bulk?\nA: Yes — reach our Institutional Sales team at **${CONTACT.departments.institutionalSales}**`,
            suggestions: withBack(["Shop now", "Distribution"]),
          };
        case "distribution":
          return {
            text: `❓ **Distribution**\n\nQ: Do you distribute nationwide?\nA: Yes — through Quanta Paper Marketing, Inc., reaching distributors, wholesalers, and partners across Luzon, Visayas, and Mindanao.\n\nQ: Can I become a distributor/reseller?\nA: Reach our Consumer Sales team at **${CONTACT.departments.consumerSales}**`,
            suggestions: withBack(["Ordering", "Contact us"]),
          };
        case "general":
          return {
            text: `❓ **General Company Information**\n\nQ: When was Quanta Paper Corporation founded?\nA: 2003, starting with four paper machines and fifty people.\n\nQ: Where is your plant located?\nA: Mabalacat, Pampanga — a 70-hectare site with 5 paper machines and 30+ converting lines.`,
            suggestions: withBack([
              "About Quanta Paper",
              "Our group of companies",
            ]),
          };
        default:
          return {
            text: `❓ **Frequently Asked Questions**\n\nWhat would you like to know more about?`,
            suggestions: withBack([
              "Product inquiries",
              "Ordering",
              "Distribution",
              "General company info",
            ]),
          };
      }
    }

    default:
      return null;
  }
}

/** Renders **bold** and [label](url) markdown inline. */
function FormatText({ text }: { text: string }) {
  const tokenRe = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

  return (
    <>
      {text.split("\n").map((line, i, arr) => (
        <span key={i}>
          {line.split(tokenRe).map((seg, j) => {
            if (seg.startsWith("**") && seg.endsWith("**")) {
              return <strong key={j}>{seg.slice(2, -2)}</strong>;
            }
            const linkMatch = seg.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
            if (linkMatch) {
              const [, label, url] = linkMatch;
              return (
                <a
                  key={j}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 underline underline-offset-2 hover:text-green-800 font-medium"
                >
                  {label}
                </a>
              );
            }
            return seg;
          })}
          {i < arr.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // useEffect(() => {
  //   if (isOpen) {
  //     setTimeout(() => inputRef.current?.focus(), 100);
  //     setUnreadCount(0);
  //   }
  // }, [isOpen]);

  // Seed the welcome message once, the first time the chat is opened.
  useEffect(() => {
    if (!isOpen || messages.length > 0) return;
    addBotMsg(
      "👋 Welcome to **Quanta Paper Corporation Inc.**! How can I help you today?",
      INITIAL_SUGGESTIONS,
    );
  }, [isOpen, messages.length]);

  function addBotMsg(text: string, suggestions: string[]) {
    setMessages((prev) => [
      ...prev,
      { id: `bot-${Date.now()}`, text, sender: "bot", suggestions },
    ]);
  }

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;

    if (
      text === BACK_CHIP ||
      text.toLowerCase().includes("back to main menu") ||
      text.toLowerCase() === "main menu"
    ) {
      setMessages((prev) => [
        ...prev,
        { id: `user-${Date.now()}`, text, sender: "user" },
      ]);
      setIsTyping(true);
      setTimeout(() => {
        addBotMsg("What else can I help you with? 😊", INITIAL_SUGGESTIONS);
        setIsTyping(false);
      }, 400);
      return;
    }

    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, text, sender: "user" },
    ]);

    const intent = detectIntent(text);
    setIsTyping(true);

    const staticResp = getStaticResponse(intent);
    setTimeout(() => {
      if (staticResp) {
        addBotMsg(staticResp.text, withBack(staticResp.suggestions));
      } else {
        addBotMsg(
          "😊 I can help with our products, company info, careers, or contact details. What would you like to know?",
          INITIAL_SUGGESTIONS,
        );
      }
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen && (
        <div
          className="absolute bottom-20 right-0 w-80 sm:w-96 flex flex-col shadow-2xl shadow-black/20 rounded-2xl overflow-hidden border border-neutral-200 bg-white"
          style={{ height: "540px", animation: "chatFadeUp 0.2s ease" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-700 to-green-600 px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center flex-shrink-0 ring-1 ring-white/20">
                <HeadphonesIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight tracking-tight">
                  Quanta Paper Corporation
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-lime-300" />
                  <p className="text-green-50/90 text-xs">AI Assistant</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Sub-header */}
          <div className="bg-neutral-50 px-4 py-2 flex items-center gap-4 flex-shrink-0 border-b border-neutral-200">
            <div className="flex items-center gap-1.5 text-neutral-500 text-xs font-medium">
              <Clock className="w-3 h-3" />
              <span>{CONTACT.hours}</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col gap-2 ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-green-600 text-white rounded-br-sm shadow-sm"
                      : "bg-neutral-100 text-neutral-800 rounded-bl-sm border border-neutral-200"
                  }`}
                >
                  <FormatText text={msg.text} />
                </div>

                {msg.sender !== "user" &&
                  msg.suggestions &&
                  msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2 max-w-[90%]">
                      {msg.suggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => sendMessage(s)}
                          disabled={isTyping}
                          className="text-xs px-3 py-1.5 rounded-full border border-green-200 text-green-700 bg-green-50 hover:bg-green-100 hover:border-green-300 transition-all font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start">
                <div className="bg-neutral-100 border border-neutral-200 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 150, 300].map((d) => (
                      <div
                        key={d}
                        className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${d}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="bg-white border-t border-neutral-200 p-3 flex-shrink-0">
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask about Quanta Paper products…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                className="flex-1 bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/15 transition-all"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 bg-green-600 hover:bg-green-700 disabled:opacity-30 text-white rounded-xl flex items-center justify-center transition-all flex-shrink-0 shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-neutral-400 text-xs text-center mt-2">
              Quanta Paper Corporation Inc. · Mandaluyong City, Philippines
            </p>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        {...(isOpen
          ? { onClick: () => setIsOpen(false) }
          : { onClick: () => setIsOpen(true) })}
        className="relative w-14 h-14 rounded-full bg-gradient-to-br -top-1 -right-4 from-green-700 to-green-500 text-white shadow-xl shadow-green-900/25 hover:shadow-green-700/35 hover:scale-105 transition-all duration-300 flex items-center justify-center border border-green-400/30"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <style>{`
        @keyframes chatFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
