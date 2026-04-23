#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const readline = require("readline");

const SKILL_DIR = path.join(__dirname, "..", "skill");
const CLAUDE_SKILLS = path.join(
  process.env.HOME || process.env.USERPROFILE,
  ".claude",
  "skills",
  "introspect"
);

const CYAN = "\x1b[36m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

function log(msg) {
  console.log(msg);
}

function banner() {
  log("");
  log(`${BOLD}${CYAN}  🔍 Introspect — Discover Your Developer DNA${RESET}`);
  log(`${CYAN}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);
  log("");
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function checkPython() {
  try {
    execSync("python3 --version", { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

function checkClaude() {
  const claudeDir = path.join(
    process.env.HOME || process.env.USERPROFILE,
    ".claude"
  );
  return fs.existsSync(claudeDir);
}

function install() {
  banner();

  // Check prerequisites
  log(`${BOLD}  Checking prerequisites...${RESET}`);
  log("");

  const hasPython = checkPython();
  const hasClaude = checkClaude();

  log(
    `  ${hasPython ? GREEN + "✔" : RED + "✖"} Python 3${RESET}${
      hasPython ? "" : " — required for analysis engine"
    }`
  );
  log(
    `  ${hasClaude ? GREEN + "✔" : RED + "✖"} Claude Code (~/.claude/)${RESET}${
      hasClaude ? "" : " — required for session data"
    }`
  );
  log("");

  if (!hasClaude) {
    log(
      `${RED}  ✖ Claude Code not found. Install Claude Code first:${RESET}`
    );
    log(`    https://docs.anthropic.com/en/docs/claude-code`);
    log("");
    process.exit(1);
  }

  if (!hasPython) {
    log(`${RED}  ✖ Python 3 not found. Install it:${RESET}`);
    log(`    Ubuntu/Debian: sudo apt install python3`);
    log(`    macOS: brew install python3`);
    log(`    Android/Termux: pkg install python`);
    log("");
    process.exit(1);
  }

  // Check if already installed
  if (fs.existsSync(CLAUDE_SKILLS)) {
    if (isSilent) {
      // Silent mode (postinstall) — just overwrite
      doInstall();
      return;
    }
    log(`${YELLOW}  ⚠ Introspect already installed at:${RESET}`);
    log(`    ${CLAUDE_SKILLS}`);
    log("");

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(
      `  Overwrite with latest version? (y/N) `,
      (answer) => {
        rl.close();
        if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
          doInstall();
        } else {
          log(`\n${CYAN}  Skipped. Existing installation preserved.${RESET}\n`);
        }
      }
    );
    return;
  }

  doInstall();
}

function doInstall() {
  log(`${BOLD}  Installing to ~/.claude/skills/introspect ...${RESET}`);
  log("");

  try {
    copyDir(SKILL_DIR, CLAUDE_SKILLS);

    // Create reports directory
    const reportsDir = path.join(CLAUDE_SKILLS, "reports");
    fs.mkdirSync(reportsDir, { recursive: true });

    log(`${GREEN}  ✔ Installed successfully!${RESET}`);
    log("");
    log(`${BOLD}  Location:${RESET} ${CLAUDE_SKILLS}`);
    log("");
    log(`${CYAN}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);
    log("");
    log(`${BOLD}  How to use:${RESET}`);
    log("");
    log(`  Open Claude Code and say:`);
    log(`  ${GREEN}> introspect my last 7 days${RESET}`);
    log(`  ${GREEN}> analyze my sessions from the past month${RESET}`);
    log(`  ${GREEN}> give me my developer DNA${RESET}`);
    log("");
    log(`  Or run directly:`);
    log(
      `  ${GREEN}$ python3 ~/.claude/skills/introspect/scripts/analyze.py --days 7 --sessions 10${RESET}`
    );
    log("");
    log(`${CYAN}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);
    log(`${BOLD}  Happy introspecting! 🔍🧠${RESET}`);
    log("");
  } catch (err) {
    log(`${RED}  ✖ Installation failed: ${err.message}${RESET}`);
    process.exit(1);
  }
}

function uninstall() {
  banner();

  if (!fs.existsSync(CLAUDE_SKILLS)) {
    log(`${YELLOW}  Introspect is not installed.${RESET}\n`);
    process.exit(0);
  }

  log(`${BOLD}  Removing from ~/.claude/skills/introspect ...${RESET}`);
  fs.rmSync(CLAUDE_SKILLS, { recursive: true, force: true });
  log(`${GREEN}  ✔ Uninstalled successfully.${RESET}\n`);
}

// ─── CLI Router ────────────────────────────────────────────

const args = process.argv.slice(2);
const isSilent = args.includes("--silent");
const hasHelp = args.includes("--help") || args.includes("-h");
const hasVersion = args.includes("--version") || args.includes("-v");
const command = hasHelp ? "--help" : hasVersion ? "--version" : args.filter((a) => !a.startsWith("--"))[0] || "install";

switch (command) {
  case "install":
  case "i":
    install();
    break;
  case "uninstall":
  case "remove":
    uninstall();
    break;
  case "--help":
  case "-h":
    banner();
    log(`${BOLD}  Usage:${RESET}`);
    log(`    npx @umang-boss/introspect           Install skill to Claude`);
    log(`    npx @umang-boss/introspect install    Install skill to Claude`);
    log(`    npx @umang-boss/introspect uninstall  Remove skill from Claude`);
    log(`    npx @umang-boss/introspect --help     Show this help`);
    log("");
    break;
  case "--version":
  case "-v":
    const pkg = require("../package.json");
    log(pkg.version);
    break;
  default:
    log(`${RED}Unknown command: ${command}${RESET}`);
    log(`Run: npx @umang-boss/introspect --help`);
    process.exit(1);
}
