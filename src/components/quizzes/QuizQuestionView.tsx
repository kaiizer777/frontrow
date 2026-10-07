"use client";

import * as React from "react";
import { Check, Sparkles, Compass } from "lucide-react";
import { QuizQuestion, QuizOption } from "@/lib/dummyData/types";
import { QuizIcon } from "./QuizIcon";

export interface QuizQuestionViewProps {
  question: QuizQuestion;
  currentStep: number;
  totalSteps: number;
  selectedOptionId: string | null;
  onSelectOption: (option: QuizOption) => void;
}

export function QuizQuestionView({
  question,
  currentStep,
  totalSteps,
  selectedOptionId,
  onSelectOption,
}: QuizQuestionViewProps) {
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  // Keyboard shortcut listener for options (1-4 or A-D)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Numbers 1-4
      if (["1", "2", "3", "4"].includes(e.key)) {
        const index = parseInt(e.key, 10) - 1;
        if (question.options[index]) {
          onSelectOption(question.options[index]);
        }
      }
      // Letters A-D
      const letterIndex = ["a", "b", "c", "d"].indexOf(e.key.toLowerCase());
      if (letterIndex !== -1 && question.options[letterIndex]) {
        onSelectOption(question.options[letterIndex]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [question, onSelectOption]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Step Header & Visual Progress Bar */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span className="flex items-center gap-1.5 text-teal-700 font-bold bg-teal-50 px-3 py-1 rounded-full border border-teal-200/80 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-teal-600" />
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-slate-600 font-bold text-xs bg-slate-100 px-2.5 py-1 rounded-full">
            {progressPercent}% Calibrated
          </span>
        </div>

        {/* Animated Progress Track */}
        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/70 p-0.5">
          <div
            className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-amber-400 rounded-full transition-all duration-300 ease-out shadow-xs"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Title & Description */}
      <div className="space-y-2 text-center sm:text-left">
        <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug tracking-tight">
          {question.question}
        </h2>
        {question.description && (
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {question.description}
          </p>
        )}
      </div>

      {/* Options Grid (Duolingo/Typeform tactile cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
        {question.options.map((option, index) => {
          const isSelected = selectedOptionId === option.id;
          const letter = String.fromCharCode(65 + index); // A, B, C, D

          return (
            <div
              key={option.id}
              onClick={() => onSelectOption(option)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectOption(option);
                }
              }}
              className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl border-2 transition-all duration-150 cursor-pointer text-left select-none outline-none ${
                isSelected
                  ? "border-teal-500 bg-teal-50/70 shadow-lg ring-4 ring-teal-400/20 scale-[1.01]"
                  : "border-slate-200/80 bg-white hover:border-teal-300 hover:bg-slate-50/70 hover:shadow-md"
              }`}
            >
              <div className="space-y-3">
                {/* Option Header: Icon + Letter Key Badge + Radio Circle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors shadow-xs ${
                        isSelected
                          ? "bg-gradient-to-br from-teal-500 to-emerald-500 text-white"
                          : "bg-slate-100 text-slate-700 group-hover:bg-teal-100 group-hover:text-teal-800"
                      }`}
                    >
                      <QuizIcon name={option.icon} className="h-5 w-5" />
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg border ${
                        isSelected
                          ? "bg-teal-100 text-teal-900 border-teal-300"
                          : "bg-slate-100 text-slate-600 border-slate-200 group-hover:bg-slate-200"
                      }`}
                    >
                      {letter}
                    </span>
                  </div>

                  {/* Radio / Checkmark Circle */}
                  <div
                    className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? "border-teal-600 bg-teal-600 text-white scale-110 shadow-xs"
                        : "border-slate-300 bg-white group-hover:border-slate-400"
                    }`}
                  >
                    {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-1">
                  <h3
                    className={`text-sm sm:text-base font-bold leading-snug transition-colors ${
                      isSelected ? "text-teal-950" : "text-slate-800 group-hover:text-slate-950"
                    }`}
                  >
                    {option.label}
                  </h3>
                  {option.subtitle && (
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                      {option.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Matched Trait Tags */}
              {option.matchedTraits && option.matchedTraits.length > 0 && (
                <div className="pt-3 mt-3 border-t border-slate-200/60 flex flex-wrap gap-1.5">
                  {option.matchedTraits.map((trait, tIdx) => (
                    <span
                      key={tIdx}
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                        isSelected
                          ? "bg-teal-200/80 text-teal-950 font-bold"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
