# Ventiq — Build Phases & Progress

## Phase 1: Google OAuth + Onboarding Flow ✅
- [x] Set up NextAuth.js with Google OAuth provider
- [x] Create sign-in page with Google button
- [x] Create sign-up page with email/password + Google
- [x] Backend: `/auth/google/verify` endpoint
- [x] Backend: `/auth/register` and `/auth/login` endpoints
- [x] JWT strategy + guards
- [x] Onboarding flow: role selection (Founder / Investor)
- [x] Founder profile form (LinkedIn, experience, technical background)
- [x] Investor verification form (type, check size, sectors, accreditation)
- [x] Middleware route protection + role-based redirects
- [x] Migrate database from PostgreSQL/Drizzle to MongoDB/Mongoose
- [x] Custom UUID-based IDs on all models (never expose `_id`)

---

## Phase 2: Idea Submission Wizard ✅
- [x] Update Idea schema with all wizard fields (team, traction, funding)
- [x] Backend: `IdeasModule` with `POST /api/ideas` endpoint
- [x] Backend: `CreateIdeaDto` with class-validator
- [x] Frontend: Zustand store (`usePitchStore`) for wizard state
- [x] Step 1 — The Idea (name, pitch, description, domain, market, differentiation)
- [x] Step 2 — Team (co-founders, technical founder, experience, size)
- [x] Step 3 — Traction (conditional fields based on status)
- [x] Step 4 — Funding Ask (stage, amount, currency, use of funds)
- [x] Step 5 — Review & Submit (read-back + API submission)
- [x] Progress stepper with animated transitions
- [x] Toast notifications on success/error
- [x] Placeholder `/ideas` page

---

## Phase 3: AI Evaluation (Single Agent Pipeline) ✅
*Status: Done*
- [x] Sets up the background queue and runs the first AI agent.
- **Backend:**
  - [x] Setup BullMQ and link to Redis (Docker).
  - [x] Create `EvaluationModule` and worker processor.
  - [x] Build `MarketResearchAgent` using `gemini-1.5-flash` with structured JSON output.
  - [x] When an idea is created, add job to `evaluation-queue`.
  - [x] Update `Evaluation` document with score and reasoning.
- **Frontend:**
  - [x] Build `My Pitches` page showing submitted ideas and their status.
  - [x] Build `Pitch Details` page to show the AI's market evaluation score, strengths, and weaknesses.

---

## Phase 4: Score Breakdown Page ✅
- [x] Render full agent output on `/ideas/[ideaId]`
- [x] Radar chart for multi-dimensional scoring
- [x] Individual agent cards with reasoning text
- [x] Score ring animation (SVG stroke-dashoffset)
- [x] Financial projection graph placeholder
- [x] Competitor landscape section
- [x] Red-Team critique section (visually distinct)
- [x] Score history / versioning (if idea is re-submitted)

---

## Phase 5: Full Agent Set + LangGraph Orchestration ✅
- [x] LangGraph state graph definition
- [x] Market Research Agent
- [x] Differentiation Agent (depends on Market Research)
- [x] Financial Model Agent
- [x] Team Fit Agent
- [x] Traction Agent
- [x] Clarity Agent
- [x] Regulatory Agent
- [x] Red-Team Agent (depends on all other agents)
- [x] Scoring Critic Agent (applies ceiling logic)
- [x] Versioned rubric as JSON config (`rubric/v1.json`)
- [x] Parallel execution where possible
- [x] Per-agent token usage + duration logging
- [x] Idea similarity/dedup via embeddings (Pinecone or pgvector)

---

## Phase 6: Investor Explore / Interest / Approval Flow
- [ ] Backend: `InterestModule` (express interest, approve, decline)
- [ ] `/explore` — Investor discovery feed with filters
- [ ] `/explore/[ideaId]` — Investor-facing idea view (gated breakdown)
- [ ] "Express Interest" CTA + pending/approved states
- [ ] `/interests` — Investor's interest tracker
- [ ] `/ideas/[ideaId]/interest` — Founder's interest inbox
- [ ] Approve/Decline flow unlocks full breakdown for investor
- [ ] Verified investor guard on explore routes
- [ ] Admin panel for investor verification approval

---

## Phase 7: Theming, Motion Polish, Landing Page
- [ ] ThemeProvider + ThemeToggle (`@theme-toggles/react` Classic)
- [ ] CSS variable-based color system (semantic tokens)
- [ ] Dark/light mode with FOUC prevention
- [ ] Framer Motion page transitions + micro-interactions
- [ ] Landing page hero (asymmetric, real product preview)
- [ ] "How scoring works" agent pipeline diagram
- [ ] Dual-path section (For Founders / For Investors)
- [ ] Sample score breakdown (interactive, no login required)
- [ ] Pricing teaser section
- [ ] `/how-it-works` page
- [ ] `/pricing` page
- [ ] `/for-investors` page
- [ ] `/about`, `/legal/privacy`, `/legal/terms` pages
- [ ] App shell: Sidebar + topbar + mobile nav
- [ ] Role-aware dashboard (`/dashboard`)

---

## Phase 8: Billing / Tier Gating
- [ ] Stripe integration
- [ ] Free vs Pro tier definition
- [ ] Usage metering (evaluations per month)
- [ ] Tier-limit guards on backend
- [ ] `/settings/billing` page
- [ ] `/pro/upgrade` page with comparison
- [ ] Deep-links from limit-hit moments
- [ ] `/settings/profile`, `/settings/notifications`, `/settings/security`
- [ ] `/notifications` page
