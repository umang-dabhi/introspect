# 🔍 @umang-boss/introspect

> Discover your developer DNA — one command installer for the Introspect skill for Claude Code.

## Install

```bash
npx @umang-boss/introspect
```

That's it. The installer will:

1. ✅ Check Python 3 is available
2. ✅ Check Claude Code (`~/.claude/`) exists
3. ✅ Copy the skill to `~/.claude/skills/introspect`
4. ✅ Show you how to use it

## Commands

```bash
npx @umang-boss/introspect              # Install skill to Claude
npx @umang-boss/introspect install      # Same as above
npx @umang-boss/introspect uninstall    # Remove skill from Claude
npx @umang-boss/introspect --help       # Show help
```

## After Installing

Open Claude Code and say:

```
introspect my last 7 days
```

Or be specific:

```
introspect my last 30 days, pick 20 sessions, only my-project
```

## What You Get

A personalized markdown report with:

- 🏆 **Overall Grade** (S/A/B/C/D) across 13 parameters
- 🎭 **Archetypes** — Primary, Secondary, and Shadow (under stress)
- 🧬 **Behavioral Patterns** — cognitive tendencies detected from your sessions
- 📈 **Session Journey Map** — how your sessions start, flow, and end
- ⏰ **Chrono Analysis** — when you're sharpest
- 🗣️ **Communication DNA** — your prompting style breakdown
- 🌱 **Growth Tips** — actionable, personalized recommendations
- 🎲 **Fun Stats** — tokens burned, peak hours, favorite tools

## Requirements

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) installed
- Python 3.10+
- Some session history to analyze

## Also Available Via

- **ClawHub:** `clawhub install introspect --dir ~/.claude/skills`
- **GitHub:** `git clone https://github.com/umang-dabhi/introspect.git ~/.claude/skills/introspect`

## Privacy

- 🔒 Read-only — never modifies session data
- 🏠 Local only — nothing sent externally
- 🙈 No code in reports — analyzes patterns, not content

## License

MIT

---

*Built by [@umang-dabhi](https://github.com/umang-dabhi)*
