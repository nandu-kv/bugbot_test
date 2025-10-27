# 🐞 BUGBOT.md
### Guidelines for Automated Bug Detection and Fix Suggestions

This file defines the **rules**, **style preferences**, and **review expectations** that BugBot should follow while analyzing and proposing fixes in this repository.

---

## 🧭 Purpose
BugBot should:
1. Identify bugs, logic errors, or potential regressions.  
2. Provide *clear, concise explanations* of what caused the issue.  
3. Suggest *minimal, safe, and reversible* code changes.  
4. Always follow the team’s **coding standards**, **architecture**, and **error-handling conventions**.

---

## 🧩 General Rules

1. **Explain Before Fixing**  
   Always include a short explanation (2–3 lines) describing the *root cause* of the issue before proposing a fix.

2. **Safe Fix First**  
   Prefer minimal, non-breaking patches. Avoid major refactors unless explicitly required.

3. **No Blind Rewrites**  
   Only modify the exact scope of the detected bug. Don’t alter unrelated logic or formatting.

4. **Comment Fixes Clearly**  
   When suggesting patches, annotate with `// BUGBOT FIX:` and a short reasoning line.

5. **Follow Codebase Style**  
   Match indentation, variable naming, and linting rules (e.g., ESLint / gofmt / Prettier).

6. **Validate Before Suggesting**  
   Run sanity checks:
   - Does the fix compile?  
   - Does it break imports or type definitions?  
   - Does it pass nearby tests?

7. **Error Messaging Convention**  
   Use human-readable, actionable error messages.  
   Example:  
   ✅ `Invalid user token: session expired.`  
   ❌ `Error code 401-UX12`

---

## 🧠 Analysis Priorities

When analyzing bugs, focus in this order:

| Priority | Category | Description |
|-----------|-----------|-------------|
| 1️⃣ | Runtime Crashes | Null refs, undefined vars, unhandled promises, panics |
| 2️⃣ | Logic Errors | Wrong conditions, data flow mistakes |
| 3️⃣ | Validation Issues | Missing guards, unsafe parsing, type mismatches |
| 4️⃣ | Performance | Unnecessary loops, large in-memory operations |
| 5️⃣ | Maintainability | Repetitive code, long functions, missing comments |

---

## 🧰 Fixing Guidelines

### ✅ DO:
- Suggest **incremental patches** that fix only the detected issue.  
- Add **guards or error checks** when data assumptions fail.  
- Keep fix **backward-compatible** with existing interfaces.  
- Include **one short explanation + one diff** per fix.

### ❌ DON’T:
- Change unrelated files or rename functions unnecessarily.  
- Introduce third-party dependencies without a reason.  
- Modify architectural patterns (e.g., from MVC → MVVM).  
- Auto-fix lint/style issues unless they relate to the bug.

---

## 💬 Example Bug Report Format

When BugBot comments on a bug or PR, it should follow this structure:

