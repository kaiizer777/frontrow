import * as React from "react";
import Link from "next/link";
import { AppShell } from "@/components/shared/AppShell";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Avatar,
  Input,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui";
import {
  Sparkles,
  Flame,
  Search,
  CheckCircle2,
  Users2,
  BookOpen,
  ArrowRight,
  Palette,
  Layers,
  Component,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <AppShell>
      <div className="space-y-8 pb-12">
        {/* Foundation Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 text-white p-6 sm:p-8 shadow-[0_8px_24px_rgba(240,68,30,0.18)] border-t border-white/20">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold tracking-wide border border-white/20 text-white shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Phase 1 Design Foundation Active</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              FRONTROW — Hobby Learning Platform
            </h1>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              Design system, light-theme palette, typography scale, responsive layout shell, and reusable UI primitives verified and ready for Phase 2 data integration.
            </p>
          </div>

          {/* Decorative ambient backdrop accents */}
          <div className="absolute right-0 top-0 -bottom-10 w-96 bg-gradient-to-l from-white/10 to-transparent pointer-events-none rounded-full blur-2xl" />
        </div>

        {/* Phase 1 Verification Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card variant="default">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 border border-primary-200/60 shrink-0">
                <Palette className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Color System</p>
                <p className="text-[11px] text-slate-500">Sunset Coral & Deep Teal</p>
              </div>
            </CardContent>
          </Card>

          <Card variant="default">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 border border-teal-200/60 shrink-0">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Typography Scale</p>
                <p className="text-[11px] text-slate-500">Outfit + Plus Jakarta Sans</p>
              </div>
            </CardContent>
          </Card>

          <Card variant="default">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700 border border-amber-200/60 shrink-0">
                <Component className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">UI Primitives</p>
                <p className="text-[11px] text-slate-500">Button, Card, Badge, Avatar, Tabs</p>
              </div>
            </CardContent>
          </Card>

          <Card variant="default">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 border border-emerald-200/60 shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Icon System</p>
                <p className="text-[11px] text-slate-500">Lucide React Active</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* UI Primitives Demonstration Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900">
                Design System Primitives Showcase
              </h2>
              <p className="text-xs text-slate-500">
                Calibrated against studio-grade light mode depth tiers
              </p>
            </div>
            <Badge variant="primary" dot={true}>
              Phase 1 Deliverables
            </Badge>
          </div>

          <Tabs defaultValue="buttons" className="w-full">
            <TabsList variant="pill">
              <TabsTrigger value="buttons" badge="6">
                Buttons
              </TabsTrigger>
              <TabsTrigger value="cards" badge="3">
                Cards
              </TabsTrigger>
              <TabsTrigger value="badges" badge="5">
                Badges
              </TabsTrigger>
              <TabsTrigger value="avatars" badge="5">
                Avatars
              </TabsTrigger>
              <TabsTrigger value="inputs" badge="2">
                Inputs
              </TabsTrigger>
            </TabsList>

            {/* Buttons Showcase */}
            <TabsContent value="buttons">
              <Card>
                <CardHeader>
                  <CardTitle>Button Variants & States</CardTitle>
                  <CardDescription>
                    Tier 3 painted light primary CTA, Tier 2 split-border secondary, subtle outlines, and states.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="primary" leftIcon={<Sparkles className="h-4 w-4" />}>
                      Primary Action (Tier 3)
                    </Button>
                    <Button variant="secondary" leftIcon={<Users2 className="h-4 w-4" />}>
                      Secondary Action (Tier 2)
                    </Button>
                    <Button variant="outline">
                      Outline
                    </Button>
                    <Button variant="ghost">
                      Ghost Button
                    </Button>
                    <Button variant="accent">
                      Teal Accent
                    </Button>
                    <Button variant="destructive">
                      Destructive
                    </Button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Button variant="primary" size="xs">
                      Extra Small
                    </Button>
                    <Button variant="primary" size="sm">
                      Small
                    </Button>
                    <Button variant="primary" size="md">
                      Medium
                    </Button>
                    <Button variant="primary" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                      Large Button
                    </Button>
                    <Button variant="primary" isLoading={true}>
                      Loading State
                    </Button>
                    <Button variant="secondary" disabled={true}>
                      Disabled State
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Cards Showcase */}
            <TabsContent value="cards">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card variant="default">
                  <CardHeader>
                    <Badge variant="primary" size="sm" className="w-fit mb-1">Default Card</Badge>
                    <CardTitle>Electric Guitar Masterclass</CardTitle>
                    <CardDescription>Beginner to intermediate pentatonic phrasing.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-slate-600">
                      Resting tier-1 elevation with subtle split border.
                    </p>
                  </CardContent>
                  <CardFooter className="justify-between">
                    <span className="text-xs font-bold text-slate-900">$29/mo</span>
                    <Button variant="primary" size="xs">Enroll</Button>
                  </CardFooter>
                </Card>

                <Card variant="interactive">
                  <CardHeader>
                    <Badge variant="secondary" size="sm" className="w-fit mb-1">Interactive</Badge>
                    <CardTitle>Street Photography Walk</CardTitle>
                    <CardDescription>Hover lift with progressive shadow.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-slate-600">
                      Tuned for clickable cards, courses, and buddy rooms.
                    </p>
                  </CardContent>
                  <CardFooter className="justify-between">
                    <span className="text-xs font-semibold text-teal-700">12 Live Buddies</span>
                    <Button variant="secondary" size="xs">Join Room</Button>
                  </CardFooter>
                </Card>

                <Card variant="subtle">
                  <CardHeader>
                    <Badge variant="amber" size="sm" className="w-fit mb-1">Subtle Tint</Badge>
                    <CardTitle>Specialty Pour-Over</CardTitle>
                    <CardDescription>Muted surface for callouts and sidebars.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-slate-600">
                      Soft slate-50/70 background for secondary modules.
                    </p>
                  </CardContent>
                  <CardFooter className="justify-between">
                    <span className="text-xs text-slate-500">4 Modules</span>
                    <Button variant="outline" size="xs">Preview</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Badges Showcase */}
            <TabsContent value="badges">
              <Card>
                <CardHeader>
                  <CardTitle>Translucent Status Chips</CardTitle>
                  <CardDescription>
                    Tinted translucent chip system with subtle opacity gradient, border, and presence dots.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap items-center gap-3">
                  <Badge variant="primary" dot={true}>
                    Primary Feature
                  </Badge>
                  <Badge variant="secondary" dot={true}>
                    Teal Community
                  </Badge>
                  <Badge variant="amber" dot={true}>
                    Streak Bonus
                  </Badge>
                  <Badge variant="success" dot={true}>
                    Verified Mentor
                  </Badge>
                  <Badge variant="live" dot={true}>
                    Live Session
                  </Badge>
                  <Badge variant="neutral">
                    Standard Tag
                  </Badge>
                  <Badge variant="outline">
                    Outline Tag
                  </Badge>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Avatars Showcase */}
            <TabsContent value="avatars">
              <Card>
                <CardHeader>
                  <CardTitle>Avatar Scales & Online Indicators</CardTitle>
                  <CardDescription>
                    Initials fallback, image error safety, and presence rings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Avatar fallback="SB" size="xs" isOnline={true} />
                    <span className="text-xs text-slate-500">XS (24px)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar fallback="AL" size="sm" isOnline={true} />
                    <span className="text-xs text-slate-500">SM (32px)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar fallback="MR" size="md" isOnline={false} />
                    <span className="text-xs text-slate-500">MD (40px)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar fallback="KD" size="lg" isOnline={true} />
                    <span className="text-xs text-slate-500">LG (48px)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar fallback="FR" size="xl" isOnline={true} />
                    <span className="text-xs text-slate-500">XL (64px)</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Inputs Showcase */}
            <TabsContent value="inputs">
              <Card>
                <CardHeader>
                  <CardTitle>Accessible Inputs</CardTitle>
                  <CardDescription>
                    Icons, states, validation error styling, and aria attributes.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Search Hobby Groups"
                    placeholder="e.g. Vintage synth patching..."
                    leftIcon={<Search className="h-4 w-4" />}
                    helperText="Search by keyword, mentor, or instrument."
                  />
                  <Input
                    label="Community Handle"
                    placeholder="@creative_soul"
                    defaultValue="@saif"
                    error="Handle is already reserved for mentors"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Next Phases Roadmap Summary Card */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Roadmap Progression</CardTitle>
            <CardDescription>
              Status tracking across the FRONTROW prototype implementation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800">Phase 1 Complete</span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
                <p className="text-[11px] text-emerald-700 leading-snug">
                  Design foundation, typography, palette, base layout, and UI primitives completed.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Phase 2 — Next</span>
                  <Badge variant="neutral" size="sm">Upcoming</Badge>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  TypeScript mock data layer for users, courses, buddy rooms, messages, quizzes, and subscriptions.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Phase 3 — Dashboard</span>
                  <Badge variant="neutral" size="sm">Upcoming</Badge>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Full personalised user dashboard with streak widgets, enrolled courses, and buddy room links.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
