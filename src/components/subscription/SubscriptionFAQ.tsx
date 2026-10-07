"use client";

import * as React from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do 1-on-1 Mentorship Credits work?",
    answer:
      "When you subscribe to Pro Mentorship (2 credits/month) or Masterclass All-Access (5 credits/month), your credits renew at the start of each billing cycle. 1 credit can be redeemed for either a 45-minute live HD video session or a comprehensive 24h async project critique with paint-overs and timestamped voiceover notes.",
  },
  {
    question: "Can I book sessions with mentors across different crafts?",
    answer:
      "Yes! Your credits are completely universal. You can book an Electric Guitar tone session this week with Marcus Vance, and next week book an espresso sensory calibration with Elena Rostova. You have unrestricted access to our entire vetted artisan roster.",
  },
  {
    question: "What hardware/setup do I need for live video sessions?",
    answer:
      "Just your phone, laptop, or tablet with a webcam and microphone. Our in-browser video studio supports multi-camera angles (e.g. overhead view for pottery or fretboard view for guitar) and low-latency high-definition audio so your mentor hears your real acoustics.",
  },
  {
    question: "What if I need to reschedule or cancel a booked session?",
    answer:
      "You can freely reschedule or cancel any session with up to 4 hours notice directly from your dashboard with zero penalty or credit deduction. If an emergency occurs, our 100% satisfaction guarantee ensures you get your credit restored.",
  },
  {
    question: "Can I upgrade, downgrade, or pause my subscription?",
    answer:
      "Yes, you can modify or cancel your subscription anytime with a single click in your account settings. Unused credits roll over for up to 60 days.",
  },
];

export function SubscriptionFAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 text-primary-700 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="h-4 w-4" />
          <span>Got Questions?</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Everything you need to know about 1-on-1 mentorship, credits, and session workflows.
        </p>
      </div>

      <div className="space-y-3 pt-2">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden transition-all shadow-2xs"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="font-bold text-slate-900 text-xs sm:text-sm">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-primary-600" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
