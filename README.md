# AI Control Center (BETA)

This repo is now the **BETA** foundation for the LVA Studio B2B portal.
The focus is a **local-first web app** with a polished owner/member workspace
and an **agent-powered canvas/editor experience**. Backend auth and automations
will come later.

## What this BETA can do (right now)

- Present a real SaaS-style portal entry (mock login/signup + role preview)
- Show owner/member views without backend auth (UI-only)
- Provide a workspace shell with:
  - project rail
  - canvas/editor area
  - agent control panel
- Set a clear design direction for future Google login + email/password + 2FA

## What is intentionally disabled (for now)

- GitHub agent workflows
- Vercel-only assumptions or deployment patterns
- Backend auth, database, and automations

## Dashboard (Next.js)

Location: `dashboard/`

Local run:

```bash
cd "Ai_Control Center/dashboard"
npm install
npm run dev
```

## Legacy GitHub Action (Prototype)

The repo root still contains an older GitHub Action prototype
(`action.yml` -> `dist/index.js`). This is **not active in BETA** and will
be revisited after the portal experience is stabilized.

If you do use it, the existing scripts still build it:

```bash
cd "Ai_Control Center"
npm install
npm run build
npm run package
```

## Agent Orchestration Notes

See `AGENT_NEO.MD` for the long-term multi-agent orchestration outline.
