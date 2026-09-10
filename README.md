# MyAnatomy — Candidate Career Hub & Portfolio Studio

A feature-complete, interactive candidate experience web application built with modern vanilla web standards (Semantic HTML5, CSS Grid/Flexbox, Native `<dialog>`, and modular JavaScript).

---

## 🚀 Quick Start

### Option 1: Open Directly in Any Browser
You can open `index.html` directly in your browser (Chrome, Edge, Firefox, Safari):
```powershell
Start-Process "C:\Users\niran\.gemini\antigravity\scratch\myanatomy-career-hub\index.html"
```

### Option 2: Run via Local Dev Server
```powershell
cd C:\Users\niran\.gemini\antigravity\scratch\myanatomy-career-hub
npx serve .
# Or using Python:
python -m http.server 3000
```
Then open `http://localhost:3000`.

---

## ✨ Features Overview

### 1. 🎮 Interactive Hero Dashboard & Gamified XP
- **Interactive 3D Tilt**: Move your cursor over the hero card for reactive perspective rotation.
- **Dynamic Greeting & Avatar**: Entering your name immediately updates your player avatar initials and greeting (`Hey, <Name> ✦`).
- **XP Progression & Levels**:
  - Level 1: Explorer (0 - 150 XP)
  - Level 2: Builder (150 - 350 XP)
  - Level 3: Trailblazer (350+ XP)
- **Persistent Progress Dock**: Fixed bottom bar tracking your real-time level and XP with quick access to achievements.

### 2. 🗺️ Candidate Persona Route
- Switch between **Student**, **Fresher**, and **Job Seeker**.
- Dynamically loads tailored progression paths and recommended tools.
- Direct click on any route node opens that tool's detailed modal drawer.

### 3. 🎯 Skill Quests & Interactive Quizzes
- Select between 3 core career tracks: **Tech & Coding**, **Data & Analytics**, **Design & Product**.
- 3 interactive scenario questions per track with instant explanations, visual progress indicators, and automatic score calculation.
- Earning 2/3 or higher awards **+100 XP** and unlocks track achievement badges.

### 4. 🌌 Skill DNA Constellation
- Interactive SVG constellation featuring all 6 assessment dimensions:
  - Coding
  - Domain Knowledge
  - Aptitude
  - Cognitive Reasoning
  - Emotional Intelligence (EQ)
  - Communication
- Test interactive sample questions with real-time feedback and cycle through all 6 dimensions.

### 5. 💼 Portfolio Studio (Live Builder & Exporter)
- 3-step intuitive builder:
  1. **About you**: Identity, role, location, bio, skills, education, contact.
  2. **Your projects**: Add up to 6 projects with descriptions, tech stacks, and live links.
  3. **Make it yours**: Choose between 3 bespoke themes (**Canvas**, **Midnight**, and **Editorial**).
- **Live Reactive Preview**: Edits update the mockup in real-time with an auto-calculated completion percentage.
- **One-Click Standalone Export**: Generates and downloads `myanatomy-portfolio.html` — a clean, single-file responsive website ready to host anywhere. Awards **+200 XP** upon export!

### 6. 🔬 Interactive Working Labs
- **Resume Quick-Draft Lab**:
  - One-click import from your saved portfolio profile or sample data.
  - Live formatted text preview with dual-pane layout.
  - Download `.txt` resume draft or copy to clipboard with a single click.
- **JD–CV Keyword Matching Lab**:
  - Compares resume text against target job descriptions using an expanded dictionary of 45+ in-demand skills.
  - Generates coverage percentage score, matched skill badges, missing skills checklist, and strategic tips.
- **Interactive Code Sandbox**:
  - Live test array operations with real-time numeric calculations and input validation.
- **Badges Reveal**:
  - 3D flip card interactions for milestones.

### 7. 📌 Opportunities & Shortlist
- Filter through internships, full-time positions, and community hackathons.
- Bookmark jobs to your shortlist with a live saved counter and detailed requirements view.

### 8. ♿ Accessibility & Modern UX
- Native `<dialog closedby="any">` with cross-browser backdrop click light-dismiss fallback.
- Keyboard accessible navigation (`Tab`, `Esc`, `Enter`).
- Motion toggle button respecting `prefers-reduced-motion`.
- Scroll-driven reading progress bar at the top of the page.
