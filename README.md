# AI Control Center (BETA)

This repo is now the **BETA** foundation for the LVA Studio B2B portal.
The focus is a **local-first web app** with a polished owner/member workspace
and an **agent-powered canvas/editor experience**. Backend auth and automations
will come later.

## Product Direction (BETA)

**Public homepage**

This is your **For Dev / Non-Tech** marketing surface.
Its job is to:

- explain what LVA.Studio is
- speak to both audiences
- get people into the software

**Product app**

This is the **inside experience** after they enter.
Its job is to:

- let users create projects
- use agents
- work in the canvas/editor
- manage their portal workflow

**So are we already doing this?**

**Yes, conceptually.**
You already have the split forming:

- **Homepage** = public-facing entry
- **Projects / Workspace / Owner** = actual software experience

**What changed**

**Old prototype**

- GitHub-centered
- agent/control-center feel
- more dev/tooling oriented

**New BETA**

- broader SaaS portal
- for dev **and** non-tech users
- projects first
- workspace first
- agents embedded into the workflow

**Best way to describe it**

Yes — this is the new BETA product direction.

The “For Dev / Non-Tech” homepage is still the public-facing marketing/entry page.

What’s new is the product experience after entry:

- Projects Home
- Workspace
- Owner Dashboard
- agent-powered canvas/editor flow

So the homepage sells the vision, and the app is where users actually work.

That means we are not replacing the public homepage concept — we’re separating the public homepage from the real software UI.

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
