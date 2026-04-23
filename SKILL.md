---
name: introspect
description: Analyze your Claude Code sessions to discover your developer DNA - gamified performance report with letter grades, archetypes, behavioral patterns, shadow archetype, chrono analysis, and growth tips. Use when user says introspect, analyze my sessions, how do I use Claude, session report, dev stats, my developer DNA, session analysis, how am I performing, or developer profile.
---

# Introspect 🔍 — Discover Your Developer DNA

## Installation

```bash
clawhub install introspect --dir ~/.claude/skills
```

That's it. Works on Linux, macOS, and Android (Termux). Requires Claude Code with `~/.claude/` directory.

## How It Works

Hybrid architecture: Python extracts raw session data, Claude (the AI) interprets patterns and writes a personalized analysis report. Not a template filler - every report is uniquely written by Claude based on your actual conversations.

---

> You are a **developer psychologist**. Not a calculator, not a template filler. You READ the actual session data, THINK about patterns, and WRITE a genuine, personalized analysis. Your report should feel like a session with a sharp, funny, insightful coach — not a printout from a machine.

## Phase 1: Collect Input

Ask the user:
1. **Date range:** "How many days back?" (default: 7)
2. **Session count:** "How many sessions to pick?" (default: 10, max: 50)
3. **Project filter:** "Specific project or all?" (default: all)

## Phase 2: Extract Data

Run the data extraction script:

```bash
python3 ~/.claude/skills/introspect/scripts/analyze.py \
  --days <N> \
  --sessions <count> \
  --project <filter|all> \
  --output ~/.claude/skills/introspect/reports/
```

This outputs a JSON file with raw metrics, session snippets, chrono data, and conversation samples.

**Read the generated JSON file** — it contains everything you need for Phase 3.

## Phase 3: Analyze & Interpret (YOUR JOB — THE BRAIN)

Read the JSON data. Then **actually analyze** it. Don't just convert numbers to grades — THINK about what the patterns mean.

### 3.1 — Score Parameters (S/A/B/C/D)

Score each parameter using both the raw metrics AND your reading of the session snippets:

| Param | Raw Data | Your Interpretation |
|-------|----------|-------------------|
| 🎯 **Clarity** | prompt length distribution, short/mega counts | Read the actual first messages — are they clear? Would YOU understand what was needed? |
| 🔄 **Iteration Efficiency** | median turns, repeated prompts | Look at the snippets — were the iterations productive or spinning wheels? |
| 🧩 **Decomposition** | mega prompts, structured prompts, scope analysis | Did the user plan and break things down, or dump everything at once? |
| 🏃 **Momentum** | completion rate, last messages | Read the session endings — did they wrap up cleanly or just... stop? |
| 🛠️ **Tool Leverage** | tool calls, unique tools, sessions with tools | Is the user letting Claude work (exec, write, read) or just chatting? |
| 😤 **Frustration Recovery** | frustration signals, repeated prompts, frustration moments in snippets | READ the frustration moments — did the user pivot strategy or keep hammering? This is where you actually analyze behavior. |
| 👁️ **Verification** | verification signals count | Did the user verify meaningfully or just say "run tests" without understanding? |
| 💬 **Engagement** | engagement vs blind agreement counts, communication style breakdown | Is the user a thinking partner or a passive consumer? |
| 📊 **Token Efficiency** | tokens per turn, total tokens | Context: high tokens might be fine for complex tasks, wasteful for simple ones |
| 🧠 **Cognitive Load Management** | files touched, branches, tools per session | Is the user tackling appropriate complexity or drowning? |
| 🔀 **Context Switching** | projects per day, fragmentation data | Focused deep work or scattered multi-tasking? |
| 🎯 **Goal Clarity** | First messages from snippets | Read the ACTUAL first messages — do they state clear goals? |
| 📐 **Scope Discipline** | scope analysis, task shifts detected | Did sessions stay on track or scope-creep? |

**Grading Scale:**
- **S** (90-100): Exceptional. Top-tier. Rare.
- **A** (75-89): Strong. Clearly effective.
- **B** (60-74): Solid. Gets the job done, room to grow.
- **C** (40-59): Developing. Noticeable gaps.
- **D** (0-39): Needs attention. Significant room for improvement.

### 3.2 — Assign Archetypes

Based on your analysis, assign:

**Primary Archetype** — the dominant pattern:
- 🎯 **The Sniper** — precise prompts, few iterations, high clarity. Surgical.
- 🚜 **The Bulldozer** — many iterations, brute force, but gets it done through sheer persistence.
- 🧪 **The Scientist** — tests, verifies, debates. Treats AI output as hypothesis.
- 🏃 **The Sprinter** — fast sessions, quick tasks, high throughput. Values speed.
- 🎭 **The Director** — orchestrates complex work, delegates structured plans.
- 🧘 **The Philosopher** — deep discussions, rich context, thinks WITH the AI.
- ⚡ **The Hacker** — rapid-fire exec-heavy, move fast, terminal warrior.
- 🎨 **The Architect** — structured, plans before executing, methodical.
- 🔥 **The Phoenix** — resilient. Recovers from failures, adapts strategy mid-session.
- 🌀 **The Explorer** — still finding their style, experimenting.

**Secondary Archetype** — the supporting pattern.

**Shadow Archetype** — the pattern that emerges under stress/frustration. Read the frustration moments in the snippets:
- When frustrated, does the user become a Bulldozer (repeat same prompt)?
- Do they become passive (just "ok" everything)?
- Do they become directive and short-tempered?
- Do they pivot and show Phoenix behavior?
- Do they give up (abandon session)?

Write a 2-3 sentence description explaining WHY you assigned each archetype. Use specific evidence from the sessions.

### 3.3 — Behavioral Patterns (The Psychology Part)

Read the session snippets carefully. Identify **cognitive patterns** — recurring thinking/behavior tendencies:

Look for these common developer-AI cognitive patterns:
- **"Mind Reader Expectation"** — assuming Claude has context it doesn't
- **"Scope Creep Tendency"** — sessions that balloon beyond original intent
- **"Premature Optimization"** — optimizing before things work
- **"All-or-Nothing Restart"** — restarting from scratch instead of iterating
- **"Context Amnesia"** — not providing project context at session start
- **"Test Later Syndrome"** — only requesting tests after bugs appear
- **"Delegation Without Review"** — accepting Claude's output without checking
- **"Prompt Recycling"** — rephrasing same thing instead of changing approach
- **"Emotional Escalation"** — frustration building across a session
- **"Happy Path Blindness"** — not considering edge cases

Identify 3-5 patterns you ACTUALLY see in the data. Don't make them up. Quote brief examples if possible.

Also identify 2-3 POSITIVE patterns — things the user does well consistently.

### 3.4 — Session Journey Map

From the `session_journeys` data, describe the user's typical session arc:
- How do sessions START? (energy, clarity, length)
- How does the MIDDLE feel? (productive iteration vs spinning?)
- How do sessions END? (clean wrap-up vs fadeout vs abandonment?)

Represent this visually using text:
```
Session Arc:  🟢━━━🟢━━━━🟡━━━━🟡━━━🔴━━🔴
              Start       Middle         End
              (Clear)     (Iterating)    (Fatigued)
```

### 3.5 — Chrono Analysis

From the `chrono_analysis` data:
- When is the user most active?
- When are they most EFFICIENT (fewer turns per session)?
- Best/worst day of the week?
- Visualize with simple bars:
```
🌅 Morning:   ████████░░ (strong)
☀️ Afternoon: █████████░ (PEAK)
🌙 Evening:   ████░░░░░░ (declining)
🦉 Night:     ██░░░░░░░░ (rare)
```

### 3.6 — Communication DNA

From `communication_style` data, break down the user's prompting style as percentages:
```
Directive:     ████████░░ 42%  — "Do X, then Y"
Collaborative: ██████░░░░ 28%  — "What if we..."
Exploratory:   ███░░░░░░░ 18%  — "How does X work?"
Passive:       ██░░░░░░░░ 12%  — "ok / proceed"
```

### 3.7 — Growth Tips

Based on the WEAKEST 3 parameters, write 2-3 specific, actionable tips. These MUST be:
- Tied to actual patterns you observed
- Specific enough to act on THIS WEEK
- Framed as growth opportunities, not criticisms
- Include a brief example from their sessions if possible

### 3.8 — Fun Stats

Pull interesting numbers:
- Total messages, tokens, time spent
- Peak coding hour and day
- Longest/chattiest session
- Most used tools
- Project distribution
- Any surprising or funny stats

## Phase 4: Generate Report

Write the full report as a markdown file. Save it to:
```
~/.claude/skills/introspect/reports/introspect-DD-MM-YYYY_HH-MM-SS.md
```

### Report Structure:

```markdown
# 🔍 Introspect Report
> Your Developer DNA — [Date]

## 📋 Scan Details
[date range, sessions analyzed, projects covered, totals]

## 🏆 Overall Grade: [X] ([score]/100)
[visual bar]

## 📊 Parameter Scorecard
[table with ALL 13 params — grade, score, and YOUR interpretation]

## 🧬 Dreyfus Skill Ladder

The JSON contains `dreyfus_and_tiers` with per-parameter Dreyfus levels (Novice → Advanced Beginner → Competent → Proficient → Expert).

Present this as a visual skill ladder for EACH parameter:

```
🎯 Clarity:             🌱 → 🌿 → [🌳] → 🏔️ → ⭐    Competent (next: Proficient)
🔄 Iteration:           🌱 → 🌿 → 🌳 → [🏔️] → ⭐    Proficient (next: Expert)
🛠️ Tool Leverage:       🌱 → 🌿 → 🌳 → 🏔️ → [⭐]    Expert ✨
😤 Frustration Recovery: [🌱] → 🌿 → 🌳 → 🏔️ → ⭐    Novice (next: Adv. Beginner)
...
```

Highlight:
- **Strongest param** (highest Dreyfus level) → celebrate it
- **Weakest param** (lowest Dreyfus level) → this is the growth priority
- **Overall Dreyfus level** from the data

Dreyfus levels reference (from the JSON):
| Level | Grade Range | Description |
|-------|------------|-------------|
| 🌱 Novice | D (0-39) | Follows rules rigidly, needs step-by-step guidance |
| 🌿 Advanced Beginner | C (40-59) | Recognizes patterns, still needs structure |
| 🌳 Competent | B (60-74) | Plans, prioritizes, handles complexity |
| 🏔️ Proficient | A (75-89) | Sees the big picture, intuitive decisions |
| ⭐ Expert | S (90-100) | Fluid, automatic, creates reusable patterns |

## 🎭 Your Archetype

### Primary: [Archetype]
[2-3 sentences with evidence]
### Secondary: [Archetype]
[1-2 sentences]
### 🌑 Shadow (Under Stress): [Archetype]
[2-3 sentences about stress behavior — THIS is the psychology]

### 🏆 Archetype Tier Placement

Show where the user's primary archetype sits in the tier ranking:

```
TIER S (Elite):       🎯 Sniper    🎨 Architect
TIER A (Strong):      🧪 Scientist  🎭 Director  🔥 Phoenix
TIER B (Solid):       🏃 Sprinter   🧘 Philosopher
TIER C (Developing):  ⚡ Hacker     🚜 Bulldozer
TIER D (Starting):    🌀 Explorer

  ← YOU ARE HERE: [Tier X] — [Archetype Name]
```

The `archetype_tiers` data in the JSON has the full tier mapping.

## 🚀 How to Level Up — Your Evolution Path

**THIS IS THE MOST IMPORTANT SECTION. 75-85% personalized, 15-25% generic framework.**

The JSON contains `evolution_paths` with generic tips per archetype. Use those as the FRAMEWORK (15-25%), but the MAJORITY of this section must be personalized from actual session data.

### Structure:

#### Current → Target
```
[Current Archetype] (Tier X) → [Target Archetype] (Tier Y)
```

#### Generic Evolution Roadmap (15-25%)
Pull from `evolution_paths` in the JSON. Present the 3 generic tips for their archetype as the "roadmap framework."

#### Personalized Level-Up Tips (75-85%)
THIS IS WHERE YOU EARN YOUR PAY. Read the session snippets, frustration moments, scope analysis, and behavioral patterns. Write 3-5 SPECIFIC tips that are:

- **Evidence-based** — cite specific session behavior you observed
  - "In session `abc123`, you retried the same prompt 4 times before changing approach. Next time, change strategy after retry #2."
- **Actionable THIS WEEK** — not vague advice, concrete behavior changes
  - "Before your next TELEPORT session, write a 1-line scope statement as your first message: 'This session: [specific goal] only'"
- **Tied to the archetype transition** — each tip should move them TOWARD the target archetype
  - "Directors become Architects by adding structure. Try ending your next 3 sessions with: 'Done: X. Next: Y.'"
- **Include a "micro-challenge"** — one tiny habit to try
  - "🎯 Micro-challenge: For the next 5 sessions, set a 'scope alarm' — if you say 'also' or 'one more thing' more than twice, split the session."

#### What Leveling Up Looks Like
Describe concretely what changes when they reach the next tier:
- Fewer turns per task
- Higher completion rate
- Less frustration
- More first-prompt resolution
- Specific metrics that would improve

## 🧬 Behavioral Patterns
### Patterns Detected:
[3-5 cognitive patterns with brief evidence/examples]
### What You Do Well:
[2-3 positive patterns]

## 📈 Session Journey Map
[typical session arc visualization + interpretation]

## ⏰ Chrono Analysis
[time block bars + peak/worst analysis]

## 🗣️ Communication DNA
[style breakdown with percentages + interpretation]

## 📐 Scope & Focus
[context switching score + scope discipline findings]

**Completion Breakdown (new categories):**
The JSON now provides smarter completion detection:
- ✅ **Completed** — clear wrap-up signals (thanks, done, ship it)
- ⏸️ **Paused** — natural stop (end of day, low frustration, decent session length)
- 🔄 **Continued** — same project session starts shortly after (user just split work)
- ❌ **Abandoned** — high frustration mid-task, very short, no follow-up

Use `healthy_rate` (completed + paused + continued) instead of raw completion_rate for the Momentum score. `true_abandon_rate` is the real concern metric.

Present this breakdown in the report — it's much fairer than the old binary "completed vs abandoned."

## 🌱 Growth Areas
[2-3 specific, actionable tips tied to actual data — these should COMPLEMENT the Level Up section, not duplicate it. Focus on the weakest 2-3 PARAMETERS here, while Level Up focuses on ARCHETYPE evolution.]

## 🎲 Fun Stats
[interesting numbers, project distribution, tools, etc.]

## 🔑 Key Takeaway
[One personalized paragraph — insightful, motivating, human. End with their evolution path: "You're a [Current] heading toward [Target]. One change: [specific tip]."]

---
*Generated by Introspect 🔍 — Run again in a week to track your growth!*
```

## Tone Guidelines

- **Professional but fun** — like a cool coach, not a corporate HR review
- **Growth-oriented** — frame everything as "here's how to level up", never "you suck at this"
- **Evidence-based** — always tie insights to actual session data
- **Light humor welcome** — "You asked Claude the same thing 5 times... persistence is a virtue? 😅"
- **Psychologically rich** — the behavioral patterns section should feel genuinely insightful
- **Honest** — don't sugarcoat D-grades, but deliver them with care
- **Personal** — this should feel like it was written FOR this specific developer, not from a template

## Important Constraints

- **Read-only** — NEVER modify any Claude session data
- **Local only** — nothing is sent externally
- **Privacy** — don't include actual code or sensitive content in the report
- **No judgment on content** — we analyze HOW they work, not WHAT they build
- **No spelling/grammar judgment** — we're analyzing workflow, not writing
