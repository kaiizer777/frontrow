# FRONTROW — Hobby Learning Platform Prototype

## 📌 Project Context

**What is this?**
FRONTROW is a hobby learning platform where users can explore, learn, and connect over hobbies. This is a **frontend prototype** (not a full working product) being built for a presentation — screenshots of the UI will be used to explain the concept to the group/audience.

### Make sure all the pages and ui ux is fully  responsive for all phone - pc and tab view.

**Scope:**
- ✅ Prototype only — static pages, **dummy/hardcoded data** everywhere (no real backend, no real auth, no DB)
- ✅ Built in **Next.js + TypeScript + Tailwind CSS**
- ✅ Goal: top-notch modern, light-theme UI/UX — clean, polished, presentation-ready
- ✅ Core pages to build:
  1. Personalised User Dashboard (shows all features at a glance)
  2. One-on-One Subscription page
  3. Buddy Rooms page (dummy real-time-looking chat)
  4. Quizzes page (interest/hobby discovery quizzes)
- ❌ No real backend, no real-time chat logic, no payment integration — all dummy data/UI only

**Priority:** Speed + visual polish > functional completeness. It needs to *look* real in screenshots.

---

## Phase 1 — Design Foundation & Theme Setup
*(Assumes Next.js + TS + Tailwind project is already initialized)*

**Work to be done:**
- Set up global theme: light color palette (primary, accent, background, surface, text colors) in `tailwind.config.ts`
- Set up typography scale (font family — pick a modern Google Font like Inter/Satoshi/General Sans, heading/body sizes)
- Create base layout component (Navbar + Sidebar shell + content area)
- Build reusable UI primitives: Button, Card, Badge, Avatar, Input, Tabs
- Set up folder structure: `/app`, `/components/ui`, `/components/shared`, `/lib/dummyData`
- Add icon library (Lucide React) and confirm it renders

**Checkboxes:**
- [x] Tailwind theme colors + fonts configured
- [x] Base layout (Navbar + Sidebar) built
- [x] Reusable UI components (Button, Card, Badge, Avatar, Tabs) built
- [x] Folder structure finalized
- [x] Icon library working

---

## Phase 2 — Dummy Data Layer

**Work to be done:**
- Create static TypeScript files with mock data: users, hobbies, courses, buddy rooms, chat messages, quizzes, subscription plans
- Keep data realistic (good names, avatars via placeholder/avatar service, believable progress %s, dates)
- Type everything properly (interfaces/types for User, Course, BuddyRoom, Message, Quiz, Plan)

**Checkboxes:**
- [x] `dummyData/users.ts` created
- [x] `dummyData/hobbies.ts` + `courses.ts` created
- [x] `dummyData/buddyRooms.ts` + `messages.ts` created
- [x] `dummyData/quizzes.ts` created
- [x] `dummyData/subscriptionPlans.ts` created
- [x] TypeScript interfaces/types defined for all of the above

---

## Phase 3 — Personalised User Dashboard
*(Note: dashboard links to Quizzes page built in Phase 6 — just ensure quiz dummy data from Phase 2 exists so the widget has something to point to)*

**Work to be done:**
- Set dashboard as the app's root/home route (`/`) — this is the first screen in the demo, no landing/login page needed
- Build dashboard page showing: welcome header with user info, progress/streak widget, enrolled courses carousel, quick links to Buddy Rooms, quiz recommendations widget, subscription status card
- Make it feel "personalised" — greeting, recommended-for-you section based on dummy interest data
- Responsive grid layout (cards arranged nicely)

**Checkboxes:**
- [x] Dashboard set as root route (`/`)
- [x] Welcome/greeting + streak/progress widget
- [x] Enrolled courses section
- [x] Recommended hobbies/quizzes widget (links to Phase 6 page)
- [x] Quick-access cards to Buddy Rooms & Subscriptions
- [x] Responsive polish pass

---

## Phase 4 — One-on-One Subscription Page

**Work to be done:**
- Build pricing/plans page with 2-3 tiers (e.g. Basic, Pro, Premium one-on-one mentorship)
- Show mentor cards (dummy mentors with photo, hobby expertise, rating, price/session)
- Add a "Book a session" button (UI only, can open a dummy modal/confirmation state)
- Highlight recommended/popular plan visually

**Checkboxes:**
- [x] Subscription page route created
- [x] Pricing tier cards built
- [x] Mentor list/grid with dummy mentors
- [x] Book session button + dummy confirmation modal
- [x] Visual polish (highlight best plan, hover states)

---

## Phase 5 — Buddy Rooms Page

**Work to be done:**
- Build room list view: rooms grouped/filterable by hobby, showing member count, room avatar/icon
- Build chat UI for a selected room: message bubbles, member list sidebar, input box (non-functional send, just UI/dummy append)
- Add "similar hobby" matching visual cue (e.g. tags showing shared interests)

**Checkboxes:**
- [ ] Buddy Rooms list page built
- [ ] Hobby filter/tabs on list page
- [ ] Chat room UI (messages + members + input) built
- [ ] Dummy message send interaction (appends to UI state)
- [ ] Visual polish pass

---

## Phase 6 — Quizzes Page

**Work to be done:**
- Build quiz listing page (multiple quizzes, each targeting a different interest-discovery angle)
- Build quiz-taking flow: question → options → next → result screen
- Result screen shows suggested hobby/interest based on dummy scoring logic
- Keep it light/fun visually (progress bar, animated transitions between questions)

**Checkboxes:**
- [ ] Quiz listing page built
- [ ] Quiz-taking flow (question/option/progress) built
- [ ] Result screen with hobby suggestion built
- [ ] Transitions/animations polish
- [ ] Link result → back to Dashboard recommendation

---

## Phase 7 — Navigation, Polish & Screenshot Prep

**Work to be done:**
- Wire up all navigation (Navbar/Sidebar links to all 4 pages working correctly)
- Full responsive check (desktop-first since screenshots, but don't break on smaller screens)
- Consistent spacing, shadows, border-radius, hover/active states across all pages
- Add favicon + page titles for realism
- Decide screenshot setup: browser window size (e.g. 1440x900), zoom level, whether to crop browser chrome — for consistent-looking slides
- Take final high-quality screenshots of each page for the presentation

**Checkboxes:**
- [ ] All navigation links working end-to-end
- [ ] Responsive/visual consistency pass across all pages
- [ ] Favicon + metadata/titles added
- [ ] Screenshot dimensions/setup decided (consistent across all pages)
- [ ] Final screenshots captured for all 4 core pages
- [ ] Prototype reviewed as a group before presentation