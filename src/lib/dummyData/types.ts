export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  role: 'student' | 'mentor' | 'creator';
  isCurrentUser?: boolean;
  streak: {
    currentDays: number;
    bestDays: number;
    freezeCount: number;
    lastActiveDate: string;
    weeklyActivity: { day: string; active: boolean; minutes: number }[];
  };
  stats: {
    points: number;
    completedCourses: number;
    hoursPracticed: number;
    communityRank: string;
    projectsShared: number;
  };
  enrolledCourses: EnrolledCourseProgress[];
  interests: string[];
  badges: BadgeItem[];
  bookmarkedCourseIds: string[];
}

export interface EnrolledCourseProgress {
  courseId: string;
  progressPercent: number;
  lastAccessedLesson: string;
  lastAccessedDate: string;
  completedLessonsCount: number;
  totalLessonsCount: number;
  nextLessonTitle: string;
}

export interface BadgeItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: 'streak' | 'craft' | 'community' | 'mastery';
}

export interface Hobby {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  iconName: string;
  coverImage: string;
  accentColor: string;
  studentCount: number;
  courseCount: number;
  communityRoomsCount: number;
  difficultyLevel: 'Beginner Friendly' | 'Intermediate' | 'Advanced' | 'All Levels';
  popularTags: string[];
}

export interface CourseInstructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  rating: number;
  reviewCount: number;
  studentsCount: number;
}

export interface CourseLesson {
  id: string;
  title: string;
  durationMinutes: number;
  isCompleted?: boolean;
  isPreview?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: CourseLesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  hobbyId: string;
  hobbyName: string;
  coverImage: string;
  instructor: CourseInstructor;
  level: 'Beginner' | 'Intermediate' | 'Masterclass' | 'All Levels';
  durationHours: number;
  lessonsCount: number;
  rating: number;
  reviewCount: number;
  studentCount: number;
  modules: CourseModule[];
  tags: string[];
  featured?: boolean;
  trending?: boolean;
}

export interface RoomMember {
  id: string;
  name: string;
  avatar: string;
  role: 'mentor' | 'mod' | 'member';
  status: 'online' | 'idle' | 'offline';
  specialty?: string;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
    isCurrentUser?: boolean;
    badge?: string;
  };
  content: string;
  timestamp: string;
  reactions?: { emoji: string; count: number; userReacted?: boolean }[];
  attachment?: {
    type: 'image' | 'audio' | 'link';
    url: string;
    title?: string;
  };
}

export interface BuddyRoom {
  id: string;
  slug: string;
  name: string;
  description: string;
  hobbyId: string;
  hobbyName: string;
  icon: string;
  coverImage: string;
  memberCount: number;
  onlineCount: number;
  tags: string[];
  pinnedAnnouncement?: string;
  members: RoomMember[];
  lastMessageSnippet: string;
  lastMessageTime: string;
}

export interface QuizOption {
  id: string;
  label: string;
  subtitle?: string;
  icon?: string;
  matchedHobbyIds: string[];
  matchedTraits: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  description?: string;
  options: QuizOption[];
}

export interface QuizResultRecommendation {
  hobbyId: string;
  hobbyName: string;
  headline: string;
  matchScorePercent: number;
  summary: string;
  starterCourseId: string;
  recommendedBuddyRoomId: string;
}

export interface Quiz {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Weekend DIY' | 'Music & Audio' | 'Visual Arts' | 'Craft & Tactile' | 'General';
  estimatedMinutes: number;
  coverImage: string;
  accentBadge: string;
  participantsCount: number;
  questions: QuizQuestion[];
  possibleResults: Record<string, QuizResultRecommendation>;
}

export interface MentorReview {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface MentorProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  coverImage: string;
  specialty: string;
  hobbyId: string;
  hobbyName: string;
  bio: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  completedSessions: number;
  hourlyRate: number;
  availableNext: string;
  skills: string[];
  reviews: MentorReview[];
  featured?: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceAnnualBilledMonthly: number;
  popular?: boolean;
  badge?: string;
  features: string[];
  ctaLabel: string;
  mentorshipCreditsPerMonth: number;
}
