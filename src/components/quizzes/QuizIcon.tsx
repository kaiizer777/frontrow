"use client";

import * as React from "react";
import {
  Music,
  Coffee,
  Camera,
  Sparkles,
  PackageCheck,
  Film,
  Palette,
  Moon,
  SunMedium,
  MapPin,
  Wrench,
  Clock,
  Calendar,
  Radio,
  Disc,
  Zap,
  Flame,
  Hammer,
  Eye,
  PenTool,
  HelpCircle,
  Trophy,
  CheckCircle2,
  Compass,
} from "lucide-react";

interface QuizIconProps {
  name?: string;
  className?: string;
}

export function QuizIcon({ name, className = "h-5 w-5" }: QuizIconProps) {
  switch (name) {
    case "Music":
      return <Music className={className} />;
    case "Coffee":
      return <Coffee className={className} />;
    case "Camera":
      return <Camera className={className} />;
    case "Sparkles":
      return <Sparkles className={className} />;
    case "PackageCheck":
      return <PackageCheck className={className} />;
    case "Film":
      return <Film className={className} />;
    case "Palette":
      return <Palette className={className} />;
    case "Moon":
      return <Moon className={className} />;
    case "SunMedium":
      return <SunMedium className={className} />;
    case "MapPin":
      return <MapPin className={className} />;
    case "Wrench":
      return <Wrench className={className} />;
    case "Clock":
      return <Clock className={className} />;
    case "Calendar":
      return <Calendar className={className} />;
    case "Radio":
      return <Radio className={className} />;
    case "Disc":
      return <Disc className={className} />;
    case "Zap":
      return <Zap className={className} />;
    case "Flame":
      return <Flame className={className} />;
    case "Hammer":
      return <Hammer className={className} />;
    case "Eye":
      return <Eye className={className} />;
    case "PenTool":
      return <PenTool className={className} />;
    case "Trophy":
      return <Trophy className={className} />;
    case "Compass":
      return <Compass className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}
