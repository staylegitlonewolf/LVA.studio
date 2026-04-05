"use client";

import { useState } from "react";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Cloud,
  Crown,
  FileStack,
  Grid3x3,
  LayoutGrid,
  Lock,
  PanelLeft,
  PenTool,
  ShieldCheck,
  Sparkles,
  Users,
  Wand2,
} from "lucide-react";

type RoleMode = "guest" | "owner" | "member";
type AuthTab = "login" | "signup";

const mockProjects = [
  { name: "LVA Studio Portal", status: "In Build", tag: "Owner" },
  { name: "Sciplex Client Hub", status: "Design Review", tag: "Client" },
  { name: "Neo Workflow Kit", status: "Drafting", tag: "Internal" },
  { name: "Beta Launch Plan", status: "Mapped", tag: "Ops" },
];

const agentQueue = [
  { title: "Neo", role: "Strategy", task: "Define milestone map for Q2." },
  { title: "Sciplex", role: "Ops", task: "Assemble portal onboarding flow." },
  { title: "Atlas", role: "Design", task: "Generate canvas layout variants." },
];

export default function Home() {
  const [mode, setMode] = useState<RoleMode>("guest");
  const [authTab, setAuthTab] = useState<AuthTab>("login");

  return (
    <main className="bg-atmosphere min-h-screen">
      <div className="relative z-10">
        <header className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-[var(--color-panel)] border border-white/10 flex items-center justify-center">
              <LayoutGrid className="h-5 w-5 text-[var(--color-accent)]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">LVA Studio</p>
              <h1 className="text-lg font-semibold">LVA B2B Portal Beta</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="badge px-3 py-1 text-xs font-semibold">Local-first</span>
            <span className="badge-warm px-3 py-1 text-xs font-semibold">Agents Offline</span>
          </div>
        </header>

        {mode === "guest" ? (
          <div className="max-w-6xl mx-auto px-6 pb-20">
            <section className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 pt-8">
              <div className="space-y-8 animate-rise">
                <div className="space-y-6">
                  <p className="badge px-4 py-1 text-xs font-semibold w-fit">B2B Member Workspace</p>
                  <h2 className="text-display text-4xl md:text-5xl font-semibold leading-tight">
                    Build client-ready systems with an agent-powered canvas workspace.
                  </h2>
                  <p className="text-lg text-[var(--color-muted)] max-w-xl">
                    The LVA portal is evolving into a full operating system for owners and members. No
                    GitHub dependency, no backend auth yet, just a polished shell that previews the
                    experience we are shipping.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: PanelLeft, title: "Owner Visibility", desc: "Monitor teams, projects, and activity with clarity." },
                    { icon: Grid3x3, title: "Canvas Builder", desc: "Drag, connect, and preview work inside the workspace." },
                    { icon: ShieldCheck, title: "Security Ready", desc: "Designed for Google login, email + 2FA." },
                    { icon: Wand2, title: "Agent Guidance", desc: "Neo-style workflows keep teams on track." },
                  ].map((item) => (
                    <div key={item.title} className="surface-card p-5 flex gap-4 items-start animate-fade">
                      <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-[var(--color-accent)]" />
                      </div>
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-[var(--color-muted)]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="surface-card p-6 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-3">
                    <Cloud className="h-5 w-5 text-[var(--color-accent)]" />
                    <p className="text-sm text-[var(--color-muted)]">Future auth stack</p>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs">
                    {["Google OAuth", "Email + Password", "2-Step Verification", "Member Roles", "Owner Admin"].map((item) => (
                      <span key={item} className="badge px-3 py-1">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="surface-card p-8 space-y-6 animate-rise">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Access</p>
                    <h3 className="text-2xl font-semibold">{authTab === "login" ? "Sign In" : "Create Account"}</h3>
                  </div>
                  <div className="flex gap-2">
                    {(["login", "signup"] as AuthTab[]).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setAuthTab(tab)}
                        className={`px-3 py-1 text-xs rounded-full border ${
                          authTab === tab
                            ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                            : "border-white/10 text-[var(--color-muted)]"
                        }`}
                      >
                        {tab === "login" ? "Login" : "Sign up"}
                      </button>
                    ))}
                  </div>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="text-xs text-[var(--color-muted)] uppercase tracking-[0.2em]">Email</label>
                    <input
                      placeholder="member@lvastudio.com"
                      className="mt-2 w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 text-sm outline-hidden focus:border-[var(--color-accent)]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--color-muted)] uppercase tracking-[0.2em]">Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="mt-2 w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 text-sm outline-hidden focus:border-[var(--color-accent)]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--color-muted)] uppercase tracking-[0.2em]">2-Step Code</label>
                    <input
                      placeholder="123 456"
                      className="mt-2 w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 text-sm outline-hidden focus:border-[var(--color-accent)]"
                    />
                  </div>
                  <button
                    type="button"
                    className="w-full rounded-2xl bg-[var(--color-accent)] text-slate-900 font-semibold py-3 flex items-center justify-center gap-2"
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                </form>

                <div className="border-t border-white/10 pt-5 space-y-3">
                  <p className="text-xs text-[var(--color-muted)]">
                    Mock login only. Pick a role to preview the workspace.
                  </p>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setMode("owner")}
                      className="w-full rounded-2xl border border-white/10 px-4 py-3 text-sm flex items-center justify-between hover:border-[var(--color-accent)] transition"
                    >
                      <span className="flex items-center gap-3">
                        <Crown className="h-4 w-4 text-[var(--color-accent)]" />
                        Enter as Owner
                      </span>
                      <ChevronRight className="h-4 w-4 text-[var(--color-muted)]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode("member")}
                      className="w-full rounded-2xl border border-white/10 px-4 py-3 text-sm flex items-center justify-between hover:border-[var(--color-accent)] transition"
                    >
                      <span className="flex items-center gap-3">
                        <Users className="h-4 w-4 text-[var(--color-accent)]" />
                        Enter as Member
                      </span>
                      <ChevronRight className="h-4 w-4 text-[var(--color-muted)]" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-6 pb-16">
            <section className="surface-card px-6 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {mode === "owner" ? (
                    <Crown className="h-5 w-5 text-[var(--color-accent)]" />
                  ) : (
                    <Users className="h-5 w-5 text-[var(--color-accent)]" />
                  )}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
                    {mode === "owner" ? "Owner Console" : "Member Portal"}
                  </p>
                  <h2 className="text-lg font-semibold">Welcome back, LoneWolf</h2>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="badge px-3 py-1 text-xs font-semibold">Workspace Online</span>
                <button
                  type="button"
                  onClick={() => setMode("guest")}
                  className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] hover:text-[var(--color-accent)]"
                >
                  Mock Sign Out
                </button>
              </div>
            </section>

            <div className="mt-8 grid xl:grid-cols-[260px_1fr_320px] gap-6">
              <aside className="surface-panel p-5 space-y-6">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
                  <PanelLeft className="h-4 w-4 text-[var(--color-accent)]" />
                  Project Rail
                </div>
                <div className="space-y-3">
                  {mockProjects.map((project) => (
                    <div key={project.name} className="canvas-node p-4 space-y-2">
                      <div className="flex items-center justify-between text-sm font-semibold">
                        <span>{project.name}</span>
                        <span className="badge-warm px-2 py-0.5 text-[10px]">{project.tag}</span>
                      </div>
                      <p className="text-xs text-[var(--color-muted)]">{project.status}</p>
                      <div className="flex items-center gap-2 text-[10px] text-[var(--color-muted)]">
                        <FileStack className="h-3 w-3" />
                        12 assets connected
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="w-full rounded-2xl border border-white/10 px-4 py-3 text-sm flex items-center justify-center gap-2 hover:border-[var(--color-accent)]"
                >
                  <Sparkles className="h-4 w-4 text-[var(--color-accent)]" />
                  New Project
                </button>
              </aside>

              <section className="space-y-6">
                <div className="surface-panel p-5 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Canvas Editor</p>
                    <h3 className="text-xl font-semibold">LVA Studio Portal</h3>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <span className="badge px-3 py-1">Draft Mode</span>
                    <span className="badge-warm px-3 py-1">Preview Ready</span>
                    <span className="badge px-3 py-1">Auto-save On</span>
                  </div>
                </div>

                <div className="canvas-grid p-6 min-h-[420px] relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-10 left-16 h-24 w-24 rounded-full bg-[var(--color-accent)]/10 blur-2xl animate-float" />
                    <div className="absolute bottom-16 right-20 h-28 w-28 rounded-full bg-[var(--color-accent-2)]/20 blur-3xl animate-float" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 relative z-10">
                    {[
                      { title: "Client Onboarding", desc: "Collect intake data and route to agents." },
                      { title: "Design Sprint", desc: "Align deliverables and visual language." },
                      { title: "Ops Workflow", desc: "Trigger checklists and approvals." },
                      { title: "Final Preview", desc: "Publish polished outputs." },
                    ].map((node) => (
                      <div key={node.title} className="canvas-node p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold">{node.title}</p>
                          <CheckCircle2 className="h-4 w-4 text-[var(--color-accent)]" />
                        </div>
                        <p className="text-xs text-[var(--color-muted)]">{node.desc}</p>
                        <div className="flex items-center gap-2 text-[10px] text-[var(--color-muted)]">
                          <ClipboardList className="h-3 w-3" />
                          4 linked tasks
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="surface-panel p-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-sm text-[var(--color-muted)]">
                    <PenTool className="h-4 w-4 text-[var(--color-accent)]" />
                    Drag nodes, connect outputs, and preview deliverables.
                  </div>
                  <button
                    type="button"
                    className="rounded-2xl bg-[var(--color-accent)] text-slate-900 font-semibold px-4 py-2 text-sm flex items-center gap-2"
                  >
                    Launch Preview <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </section>

              <aside className="surface-panel p-5 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Agent Control</p>
                    <h4 className="text-lg font-semibold">Neo Workflow Stack</h4>
                  </div>
                </div>

                <div className="space-y-3">
                  {agentQueue.map((agent) => (
                    <div key={agent.title} className="canvas-node p-4 space-y-2">
                      <div className="flex items-center justify-between text-sm font-semibold">
                        <span>{agent.title}</span>
                        <span className="badge px-2 py-0.5 text-[10px]">{agent.role}</span>
                      </div>
                      <p className="text-xs text-[var(--color-muted)]">{agent.task}</p>
                      <div className="flex items-center gap-2 text-[10px] text-[var(--color-muted)]">
                        <Sparkles className="h-3 w-3" />
                        Awaiting signal
                      </div>
                    </div>
                  ))}
                </div>

                <div className="surface-card p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
                    <Lock className="h-4 w-4 text-[var(--color-accent)]" />
                    Access Controls
                  </div>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>{mode === "owner" ? "Owner overrides" : "Member role"}</span>
                      <span className="badge px-2 py-0.5 text-[10px]">Active</span>
                    </div>
                    <div className="flex items-center justify-between text-[var(--color-muted)] text-xs">
                      <span>2-Step required</span>
                      <span className="badge-warm px-2 py-0.5 text-[10px]">Configured</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full rounded-2xl border border-white/10 px-4 py-3 text-sm flex items-center justify-between hover:border-[var(--color-accent)]"
                >
                  Open Agent Brief <ArrowRight className="h-4 w-4" />
                </button>
              </aside>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
