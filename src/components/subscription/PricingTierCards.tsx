"use client";

import * as React from "react";
import { Check, Sparkles, Zap, Crown, ArrowRight } from "lucide-react";
import { subscriptionPlans } from "@/lib/dummyData/subscriptionPlans";
import { SubscriptionPlan } from "@/lib/dummyData/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface PricingTierCardsProps {
  billingCycle: "monthly" | "annual";
  onBillingCycleChange: (cycle: "monthly" | "annual") => void;
  onSelectPlan: (plan: SubscriptionPlan) => void;
}

export function PricingTierCards({
  billingCycle,
  onBillingCycleChange,
  onSelectPlan,
}: PricingTierCardsProps) {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-display">
          Transparent, Flexible Plans for Every Stage
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Skip years of trial & error. Work 1-on-1 with vetted master artisans for live HD video sessions, 24h async project paint-overs, and custom roadmaps.
        </p>

        {/* Billing Cycle Switcher */}
        <div className="pt-2 flex items-center justify-center">
          <div className="inline-flex items-center p-1.5 rounded-full bg-slate-100 border border-slate-200/80 shadow-inner">
            <button
              type="button"
              onClick={() => onBillingCycleChange("monthly")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                billingCycle === "monthly"
                  ? "bg-white text-slate-900 shadow-sm font-extrabold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => onBillingCycleChange("annual")}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold transition-all ${
                billingCycle === "annual"
                  ? "bg-white text-slate-900 shadow-sm font-extrabold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                SAVE 25%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-4">
        {subscriptionPlans.map((plan) => {
          const isPro = plan.popular;
          const isMaster = plan.id === "plan-master";
          const displayPrice =
            billingCycle === "annual"
              ? plan.priceAnnualBilledMonthly
              : plan.priceMonthly;
          const savings =
            (plan.priceMonthly - plan.priceAnnualBilledMonthly) * 12;

          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl transition-all duration-300 flex flex-col justify-between ${
                isPro
                  ? "bg-gradient-to-b from-white via-primary-50/30 to-amber-50/20 border-2 border-primary-500 shadow-xl shadow-primary-500/10 md:-translate-y-2 ring-4 ring-primary-500/10"
                  : "bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300"
              } p-6 sm:p-7`}
            >
              {/* Top Floating Popular Badge */}
              {isPro && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-primary-600 to-amber-500 text-white text-[11px] font-black uppercase tracking-wider shadow-md shadow-primary-600/30">
                    <Sparkles className="h-3 w-3 fill-white" />
                    Most Popular Choice
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {isMaster ? (
                      <div className="h-7 w-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                        <Crown className="h-4 w-4" />
                      </div>
                    ) : isPro ? (
                      <div className="h-7 w-7 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center">
                        <Zap className="h-4 w-4" />
                      </div>
                    ) : null}
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                      {plan.name}
                    </h3>
                  </div>

                  {plan.badge && !isPro && (
                    <Badge variant="secondary" size="sm">
                      {plan.badge}
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-slate-600 mt-2 min-h-[36px] leading-relaxed">
                  {plan.tagline}
                </p>

                {/* Pricing Number Block */}
                <div className="mt-5 pb-5 border-b border-slate-100 flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
                    ${displayPrice}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    / month
                  </span>
                  {billingCycle === "annual" && savings > 0 && (
                    <span className="ml-auto text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Save ${savings}/yr
                    </span>
                  )}
                </div>

                {/* Mentorship Credits Ribbon */}
                <div className="mt-4 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">
                    1-on-1 Mentorship:
                  </span>
                  <span
                    className={`font-black ${
                      plan.mentorshipCreditsPerMonth > 0
                        ? "text-primary-700 font-display"
                        : "text-slate-600"
                    }`}
                  >
                    {plan.mentorshipCreditsPerMonth > 0
                      ? `${plan.mentorshipCreditsPerMonth} Sessions / Month`
                      : "Self-Paced Jam"}
                  </span>
                </div>

                {/* Features List */}
                <div className="mt-5 space-y-3">
                  <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    Included in this tier:
                  </p>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-slate-700"
                      >
                        <div
                          className={`mt-0.5 rounded-full p-0.5 shrink-0 ${
                            isPro
                              ? "bg-primary-500 text-white"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          <Check className="h-3 w-3 stroke-[2.5]" />
                        </div>
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom CTA Button */}
              <div className="mt-8 pt-4 border-t border-slate-100">
                <Button
                  variant={isPro ? "primary" : "outline"}
                  size="md"
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full justify-center group text-xs sm:text-sm ${
                    isPro ? "shadow-md shadow-primary-500/25 py-2.5 font-bold" : ""
                  }`}
                >
                  <span>{plan.ctaLabel}</span>
                  <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Button>
                <p className="text-center text-[11px] text-slate-600 mt-2">
                  No credit card required for 7-day trial
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
