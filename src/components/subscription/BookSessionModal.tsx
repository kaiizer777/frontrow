"use client";

import * as React from "react";
import {
  X,
  Calendar,
  Clock,
  Video,
  FileCheck,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  CalendarDays,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { mentors } from "@/lib/dummyData/subscriptionPlans";
import { MentorProfile } from "@/lib/dummyData/types";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface BookSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMentorId?: string | null;
  initialPlanName?: string | null;
}

const timeSlots = [
  { id: "slot-1", time: "10:00 AM", period: "Morning", available: true },
  { id: "slot-2", time: "11:30 AM", period: "Morning", available: true },
  { id: "slot-3", time: "02:00 PM", period: "Afternoon", available: true },
  { id: "slot-4", time: "03:30 PM", period: "Afternoon", available: true },
  { id: "slot-5", time: "05:00 PM", period: "Evening", available: false },
  { id: "slot-6", time: "06:30 PM", period: "Evening", available: true },
];

const availableDates = [
  { day: "Today", date: "Oct 7", full: "Tuesday, Oct 7, 2026" },
  { day: "Tomorrow", date: "Oct 8", full: "Wednesday, Oct 8, 2026" },
  { day: "Thu", date: "Oct 9", full: "Thursday, Oct 9, 2026" },
  { day: "Fri", date: "Oct 10", full: "Friday, Oct 10, 2026" },
  { day: "Sat", date: "Oct 11", full: "Saturday, Oct 11, 2026" },
];

export function BookSessionModal({
  isOpen,
  onClose,
  initialMentorId,
  initialPlanName,
}: BookSessionModalProps) {
  const [step, setStep] = React.useState<1 | 2 | 3>(1);
  const [selectedFormat, setSelectedFormat] = React.useState<"live" | "async">("live");
  const [selectedMentorId, setSelectedMentorId] = React.useState<string>(
    initialMentorId || mentors[0]?.id || ""
  );
  const [selectedDateIdx, setSelectedDateIdx] = React.useState<number>(1);
  const [selectedSlotId, setSelectedSlotId] = React.useState<string>("slot-4");
  const [sessionTopic, setSessionTopic] = React.useState<string>("");
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  // Sync if initialMentorId changes
  React.useEffect(() => {
    if (initialMentorId) {
      setSelectedMentorId(initialMentorId);
    }
  }, [initialMentorId]);

  // Reset state when opened
  React.useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Handle escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentMentor =
    mentors.find((m) => m.id === selectedMentorId) || mentors[0];
  const currentDate = availableDates[selectedDateIdx];
  const currentSlot = timeSlots.find((s) => s.id === selectedSlotId);

  const handleConfirmBooking = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card / Bottom Sheet on Mobile */}
      <div className="relative w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden z-10 max-h-[92vh] flex flex-col transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors"
                aria-label="Go back to Step 1"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="primary" size="sm">
                  {step === 3
                    ? "Booking Confirmed"
                    : step === 1
                    ? "Step 1 of 2: Session Format"
                    : "Step 2 of 2: Schedule & Goals"}
                </Badge>
                {initialPlanName && step !== 3 && (
                  <span className="hidden sm:inline text-xs font-semibold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-md border border-primary-100">
                    {initialPlanName}
                  </span>
                )}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display mt-0.5">
                {step === 3
                  ? "🎉 You're on the Fast-Track to Mastery!"
                  : `Book 1-on-1 with ${currentMentor.name}`}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* STEP 1: Select Format & Mentor */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Selected Mentor Card Summary */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-primary-50/60 via-amber-50/40 to-slate-50 border border-primary-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <Avatar
                    src={currentMentor.avatar}
                    alt={currentMentor.name}
                    fallback={currentMentor.name.substring(0, 2)}
                    size="lg"
                    isOnline={true}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                        {currentMentor.name}
                      </h4>
                      <Badge variant="amber" size="sm">
                        Verified Master
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600">
                      {currentMentor.specialty}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500">
                      <span className="text-amber-600 font-bold">
                        ★ {currentMentor.rating} ({currentMentor.reviewCount} reviews)
                      </span>
                      <span>•</span>
                      <span>{currentMentor.completedSessions} sessions</span>
                    </div>
                  </div>
                </div>

                <div className="sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200/60">
                  <span className="text-xs text-slate-500 block">Rate / Credit:</span>
                  <span className="text-base font-extrabold text-slate-900">
                    ${currentMentor.hourlyRate}
                    <span className="text-xs font-normal text-slate-500">
                      {" "}
                      or 1 Pro Credit
                    </span>
                  </span>
                </div>
              </div>

              {/* Mentor Switcher if user wants another craft */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select Mentor
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {mentors.map((m) => {
                    const isSelected = m.id === currentMentor.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedMentorId(m.id)}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                          isSelected
                            ? "border-primary-500 bg-primary-50/50 shadow-xs ring-2 ring-primary-500/20"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <Avatar
                          src={m.avatar}
                          alt={m.name}
                          fallback={m.name.substring(0, 2)}
                          size="sm"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {m.name}
                          </p>
                          <p className="text-[10px] text-slate-500 truncate">
                            {m.hobbyName}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Session Format Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Choose Session Format
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Format 1: Live Video */}
                  <div
                    onClick={() => setSelectedFormat("live")}
                    className={`cursor-pointer p-4 rounded-xl border transition-all ${
                      selectedFormat === "live"
                        ? "border-primary-500 bg-primary-50/30 shadow-xs ring-2 ring-primary-500/20"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/80"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="p-2 rounded-lg bg-primary-100 text-primary-700">
                        <Video className="h-5 w-5" />
                      </div>
                      <div
                        className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                          selectedFormat === "live"
                            ? "border-primary-600 bg-primary-600"
                            : "border-slate-300"
                        }`}
                      >
                        {selectedFormat === "live" && (
                          <div className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                    <div className="mt-3">
                      <h4 className="text-sm font-bold text-slate-900">
                        45-Min Live 1-on-1 Video Call
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Real-time high-fidelity call with live audio/video, multi-angle camera review, and immediate coaching.
                      </p>
                      <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                        <Zap className="h-3 w-3" />
                        <span>Interactive live jam & breakdown</span>
                      </div>
                    </div>
                  </div>

                  {/* Format 2: Async Review */}
                  <div
                    onClick={() => setSelectedFormat("async")}
                    className={`cursor-pointer p-4 rounded-xl border transition-all ${
                      selectedFormat === "async"
                        ? "border-primary-500 bg-primary-50/30 shadow-xs ring-2 ring-primary-500/20"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/80"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
                        <FileCheck className="h-5 w-5" />
                      </div>
                      <div
                        className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                          selectedFormat === "async"
                            ? "border-primary-600 bg-primary-600"
                            : "border-slate-300"
                        }`}
                      >
                        {selectedFormat === "async" && (
                          <div className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                    <div className="mt-3">
                      <h4 className="text-sm font-bold text-slate-900">
                        24h Async Video Paint-over & Critique
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Submit a 5-minute practice clip or project file. Receive a detailed 10-minute annotated critique within 24 hours.
                      </p>
                      <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-primary-700">
                        <Clock className="h-3 w-3" />
                        <span>Guaranteed turn-around in 24 hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantees row */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-600">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>
                  100% Satisfaction Guarantee. Reschedule freely up to 4 hours before the session.
                </span>
              </div>
            </div>
          )}

          {/* STEP 2: Date, Slot & Goal */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Date selection carousel / pills */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select Date
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {availableDates.map((item, idx) => {
                    const isSelected = selectedDateIdx === idx;
                    return (
                      <button
                        key={item.date}
                        type="button"
                        onClick={() => setSelectedDateIdx(idx)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          isSelected
                            ? "border-primary-500 bg-primary-500 text-white shadow-xs font-bold"
                            : "border-slate-200 hover:border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="block text-[11px] font-medium opacity-80 uppercase">
                          {item.day}
                        </span>
                        <span className="block text-sm font-extrabold mt-0.5">
                          {item.date}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Select Time Slot ({currentDate.day}, {currentDate.date})
                  </label>
                  <span className="text-[11px] text-slate-500">Time zone: GMT+5:30 (Local)</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedSlotId === slot.id;
                    const isAvail = slot.available;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        disabled={!isAvail}
                        onClick={() => setSelectedSlotId(slot.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          !isAvail
                            ? "border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed opacity-50"
                            : isSelected
                            ? "border-primary-500 bg-primary-50/60 ring-2 ring-primary-500/20 text-primary-950 font-bold"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-800"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">{slot.time}</span>
                          <span className="text-[10px] uppercase font-semibold text-slate-600">
                            {slot.period}
                          </span>
                        </div>
                        <span className="text-[10px] text-emerald-600 font-medium block mt-1">
                          {isAvail ? "● Available" : "○ Booked"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Goal / Focus Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  What would you like to focus on during this session?
                </label>
                <textarea
                  rows={3}
                  value={sessionTopic}
                  onChange={(e) => setSessionTopic(e.target.value)}
                  placeholder="e.g. Master clean double-stop transitions in Bb pentatonic, clean up fret buzz, and get feedback on my overdrive gain staging."
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 text-slate-900 placeholder:text-slate-400 transition-all resize-none"
                />
                <p className="text-[11px] text-slate-600 mt-1">
                  Your mentor will review this beforehand to prepare custom exercises and sheet/sample materials.
                </p>
              </div>

              {/* Session Summary Snapshot */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Session:</span>
                  <span className="font-semibold text-slate-900">
                    {selectedFormat === "live"
                      ? "45-min Live Video Call"
                      : "24h Async Video Critique"}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Mentor:</span>
                  <span className="font-semibold text-slate-900">
                    {currentMentor.name} ({currentMentor.hobbyName})
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Scheduled Time:</span>
                  <span className="font-semibold text-slate-900">
                    {currentDate.full} at {currentSlot?.time}
                  </span>
                </div>
                <div className="border-t border-slate-200/60 pt-2 flex justify-between font-bold text-slate-900">
                  <span>Payment / Credit:</span>
                  <span className="text-emerald-700">1 Pro Mentorship Credit</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Confirmed Success View */}
          {step === 3 && (
            <div className="py-4 text-center space-y-6">
              <div className="relative inline-flex items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 animate-bounce">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <div className="absolute -top-1 -right-1 h-7 w-7 rounded-full bg-amber-400 flex items-center justify-center text-amber-950 font-bold text-xs shadow-md">
                  ★
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                  Session Successfully Booked!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-md mx-auto">
                  A calendar invite and private video studio link have been sent to your email. {currentMentor.name} has been notified.
                </p>
              </div>

              {/* Confirmed Details Ticket */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-primary-50/30 border border-slate-200 shadow-xs text-left max-w-lg mx-auto space-y-3.5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={currentMentor.avatar}
                      alt={currentMentor.name}
                      fallback={currentMentor.name.substring(0, 2)}
                      size="md"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {currentMentor.name}
                      </h4>
                      <p className="text-xs text-slate-600">
                        {currentMentor.specialty}
                      </p>
                    </div>
                  </div>
                  <Badge variant="primary" size="sm">
                    {selectedFormat === "live" ? "Live Video" : "Async Review"}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-100/70">
                    <span className="text-[10px] font-bold text-slate-600 uppercase block">
                      Date & Time
                    </span>
                    <span className="font-bold text-slate-900 mt-0.5 block">
                      {currentDate.date}, 2026 • {currentSlot?.time}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-100/70">
                    <span className="text-[10px] font-bold text-slate-600 uppercase block">
                      Session Room
                    </span>
                    <span className="font-bold text-primary-600 mt-0.5 block truncate">
                      frontrow.live/m/{currentMentor.id.replace("inst-", "")}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-800 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>
                    1 Pro Credit applied. You have <strong>1 credit</strong> remaining for this billing cycle.
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => alert("Added to calendar (Google & Apple Cal .ics file generated)!")}
                >
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Add to Calendar (.ics)
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={onClose}
                >
                  Done & Return to Hub
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions (Step 1 and 2) */}
        {step !== 3 && (
          <div className="px-5 sm:px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-xs text-slate-600 hover:text-slate-900"
            >
              Cancel
            </Button>

            {step === 1 ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setStep(2)}
                className="text-xs group"
              >
                <span>Continue to Schedule</span>
                <ChevronRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                isLoading={isSubmitting}
                onClick={handleConfirmBooking}
                className="text-xs group"
              >
                <span>Confirm & Reserve Slot</span>
                <Sparkles className="h-3.5 w-3.5 ml-1.5 text-amber-300" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
