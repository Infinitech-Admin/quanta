"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type Tab = "terms" | "privacy";

interface TermsPrivacyModalProps {
  open: boolean;
  onClose: () => void;
  initialTab?: Tab;
}

export function TermsPrivacyModal({
  open,
  onClose,
  initialTab = "terms",
}: TermsPrivacyModalProps) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Reset to whichever tab was requested each time the modal opens
  useEffect(() => {
    if (open) setTab(initialTab);
  }, [open, initialTab]);

  // Esc to close + lock background scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tp-modal-title"
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-forest-deep/60 backdrop-blur-sm" />

      <div
        ref={panelRef}
        className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-forest-deep/10 bg-cream shadow-2xl shadow-black/40"
        style={{ maxHeight: "min(640px, 85vh)" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-forest-deep/10 px-6 pt-6 pb-4 sm:px-8">
          <div>
            <h2
              id="tp-modal-title"
              className="font-serif text-2xl text-forest-deep"
            >
              {tab === "terms" ? "Terms of Service" : "Privacy Policy"}
            </h2>
            <p className="mt-1 text-sm text-forest-deep/60">
              Last updated September 2026
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-forest-deep/50 transition-colors hover:bg-forest-deep/5 hover:text-forest-deep"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-forest-deep/10 px-6 sm:px-8">
          {(["terms", "privacy"] as Tab[]).map((t) => {
            const active = tab === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                  active
                    ? "text-forest-deep"
                    : "text-forest-deep/50 hover:text-forest-deep/80"
                }`}
              >
                {t === "terms" ? "Terms" : "Privacy"}
                {active && (
                  <span className="absolute inset-x-4 -bottom-px h-0.5 rounded-full bg-sun" />
                )}
              </button>
            );
          })}
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          {tab === "terms" ? <TermsContent /> : <PrivacyContent />}
        </div>

        {/* Footer */}
        <div className="border-t border-forest-deep/10 px-6 py-4 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-forest-deep px-4 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-forest-deep/90 sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 last:mb-0">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-forest-deep/70">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-forest-deep/80">{children}</p>
    </div>
  );
}

function TermsContent() {
  return (
    <div>
      <Section title="Acceptance of terms">
        By creating an account with Quanta Paper Corporation, you agree to these
        Terms of Service and to use our platform in accordance with applicable
        laws.
      </Section>
      <Section title="Your account">
        You're responsible for keeping your login credentials secure and for all
        activity that happens under your account. Let us know right away if you
        suspect unauthorized access.
      </Section>
      <Section title="Orders and payments">
        Placing an order through Quanta Paper is an offer to purchase at the
        listed price. We'll confirm availability and pricing before your order
        is finalized.
      </Section>
      <Section title="Acceptable use">
        Don't use the platform to violate any law, infringe on others' rights,
        or interfere with the service's normal operation.
      </Section>
      <Section title="Changes to these terms">
        We may update these terms from time to time. Continued use of the
        platform after changes take effect means you accept the revised terms.
      </Section>
    </div>
  );
}

function PrivacyContent() {
  return (
    <div>
      <Section title="Information we collect">
        We collect the information you provide when you register — your name,
        email, phone number, and delivery details — along with order history and
        basic usage data.
      </Section>
      <Section title="How we use it">
        We use your information to process orders, send account and delivery
        updates, and improve the platform. We don't sell your personal
        information to third parties.
      </Section>
      <Section title="Data storage">
        Your data is stored securely and retained only as long as needed to
        provide our services or as required by law.
      </Section>
      <Section title="Your choices">
        You can request access to, correction of, or deletion of your personal
        data at any time by contacting our support team.
      </Section>
      <Section title="Contact">
        Questions about this policy can be sent to privacy@quantapaper.example.
      </Section>
    </div>
  );
}
