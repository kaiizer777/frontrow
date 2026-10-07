"use client";

import * as React from "react";
import { X, ArrowLeft, ArrowRight, Sparkles, HelpCircle } from "lucide-react";
import { Quiz, QuizOption, QuizResultRecommendation } from "@/lib/dummyData/types";
import { QuizQuestionView } from "./QuizQuestionView";
import { QuizResultCard } from "./QuizResultCard";
import { Button } from "@/components/ui/Button";

export interface QuizPlayerModalProps {
  quiz: Quiz | null;
  isOpen: boolean;
  onClose: () => void;
  onExploreOtherQuizzes?: () => void;
}

export function QuizPlayerModal({
  quiz,
  isOpen,
  onClose,
  onExploreOtherQuizzes,
}: QuizPlayerModalProps) {
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState<Record<string, QuizOption>>({});
  const [showResult, setShowResult] = React.useState(false);
  const [calculatedResult, setCalculatedResult] = React.useState<QuizResultRecommendation | null>(null);

  // Reset state whenever a new quiz is opened
  React.useEffect(() => {
    if (isOpen && quiz) {
      setCurrentStepIndex(0);
      setSelectedAnswers({});
      setShowResult(false);
      setCalculatedResult(null);
    }
  }, [isOpen, quiz]);

  // Handle escape key to close
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !quiz) return null;

  const currentQuestion = quiz.questions[currentStepIndex];
  const totalQuestions = quiz.questions.length;
  const currentSelectedOption = currentQuestion ? selectedAnswers[currentQuestion.id] : null;

  // Calculate Match Score when quiz finishes
  const computeFinalResult = (answers: Record<string, QuizOption>) => {
    const hobbyFrequency: Record<string, number> = {};

    Object.values(answers).forEach((option) => {
      option.matchedHobbyIds?.forEach((hId) => {
        hobbyFrequency[hId] = (hobbyFrequency[hId] || 0) + 1;
      });
    });

    // Find the hobby with max votes
    let bestHobbyId = Object.keys(quiz.possibleResults)[0];
    let maxCount = -1;

    Object.entries(hobbyFrequency).forEach(([hId, count]) => {
      if (count > maxCount && quiz.possibleResults[hId]) {
        maxCount = count;
        bestHobbyId = hId;
      }
    });

    const result = quiz.possibleResults[bestHobbyId] || Object.values(quiz.possibleResults)[0];
    setCalculatedResult(result);
    setShowResult(true);
  };

  const handleSelectOption = (option: QuizOption) => {
    const updatedAnswers = {
      ...selectedAnswers,
      [currentQuestion.id]: option,
    };
    setSelectedAnswers(updatedAnswers);

    // Auto-advance with subtle delay for smooth dopamine feedback
    setTimeout(() => {
      if (currentStepIndex < totalQuestions - 1) {
        setCurrentStepIndex((prev) => prev + 1);
      } else {
        computeFinalResult(updatedAnswers);
      }
    }, 280);
  };

  const handleNextStep = () => {
    if (currentStepIndex < totalQuestions - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      computeFinalResult(selectedAnswers);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleRetake = () => {
    setCurrentStepIndex(0);
    setSelectedAnswers({});
    setShowResult(false);
    setCalculatedResult(null);
  };

  const handleExploreOther = () => {
    onClose();
    if (onExploreOtherQuizzes) {
      onExploreOtherQuizzes();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white border border-slate-200/90 shadow-2xl overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-white/95 backdrop-blur-md border-b border-slate-100">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-600 shrink-0">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                {quiz.title}
              </h3>
              <p className="text-[11px] text-slate-500 truncate">
                {showResult ? "✨ Match Profile Ready" : `${quiz.estimatedMinutes} min discovery lounge`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close quiz modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Main Body Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          {showResult && calculatedResult ? (
            <QuizResultCard
              quiz={quiz}
              result={calculatedResult}
              onRetakeQuiz={handleRetake}
              onExploreOtherQuizzes={handleExploreOther}
            />
          ) : (
            <QuizQuestionView
              question={currentQuestion}
              currentStep={currentStepIndex + 1}
              totalSteps={totalQuestions}
              selectedOptionId={currentSelectedOption?.id || null}
              onSelectOption={handleSelectOption}
            />
          )}
        </div>

        {/* Modal Bottom Bar (Wizard controls during question flow) */}
        {!showResult && (
          <div className="sticky bottom-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5 bg-white/95 backdrop-blur-md border-t border-slate-100">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              leftIcon={<ArrowLeft className="h-3.5 w-3.5" />}
              className="text-xs font-bold disabled:opacity-40 cursor-pointer"
            >
              Previous
            </Button>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span>Question {currentStepIndex + 1} of {totalQuestions}</span>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={handleNextStep}
              disabled={!currentSelectedOption}
              rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
              className="text-xs font-bold shadow-xs cursor-pointer bg-teal-600 hover:bg-teal-500 text-white"
            >
              {currentStepIndex === totalQuestions - 1 ? "See My Match 🎉" : "Next Question"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
