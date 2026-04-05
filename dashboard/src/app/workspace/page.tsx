"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Bot,
  ChevronLeft,
  FolderPlus,
  LayoutGrid,
  MessageSquare,
  Plus,
  Search,
  Settings,
  SlidersHorizontal,
  Sparkles,
  Users,
  Wand2,
} from "lucide-react";

const projects = [
  { id: "p1", name: "Client Website Redesign", status: "Active", updated: "2 hours ago" },
  { id: "p2", name: "Marketing Automation", status: "Draft", updated: "Yesterday" },
  { id: "p3", name: "ChatGPT Integration", status: "Planning", updated: "2 days ago" },
  { id: "p4", name: "Social Media Planner", status: "Queued", updated: "3 days ago" },
  { id: "p5", name: "Automated Reports", status: "Review", updated: "Last week" },
];

const quickPrompts = [
  "Build a landing page flow",
  "Map a client portal onboarding",
  "Generate a campaign workflow",
  "Draft the project milestones",
];

const quickActions = [
  "Create Landing Page",
  "Start Client Portal",
  "Ask Sciplex to Build",
];

export default function WorkspacePage() {
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id);
  const [agentInput, setAgentInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [lastAction, setLastAction] = useState("Ready");

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId) ?? projects[0],
    [activeProjectId]
  );

  useEffect(() => {
    setIsTyping(true);
    const timeout = setTimeout(() => setIsTyping(false), 1600);
    return () => clearTimeout(timeout);
  }, [activeProjectId]);

  const handlePrompt = (prompt: string) => {
    setAgentInput(prompt);
    setLastAction("Queued");
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1600);
  };

  return (
    <main className="min-h-screen bg-atmosphere">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <header className="surface-panel px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/projects"
              className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[var(--color-accent)]"
            >
              <ChevronLeft className="h-4 w-4" />
            </Link>
            <div className="h-10 w-10 rounded-2xl bg-[var(--color-panel)] border border-white/10 flex items-center justify-center">
              <LayoutGrid className="h-5 w-5 text-[var(--color-accent)]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Workspace</p>
              <h1 className="text-lg font-semibold">AI Control Center (BETA)</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
            <span className="badge px-3 py-1 text-[10px]">Team View</span>
            <button className="icon-btn">
              <Users className="h-4 w-4" />
            </button>
            <button className="icon-btn">
              <MessageSquare className="h-4 w-4" />
            </button>
            <button className="icon-btn">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="mt-6 grid xl:grid-cols-[260px_1fr_320px] gap-6">
          <aside className="surface-panel p-5 space-y-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
              <span>Projects</span>
              <button className="icon-btn h-7 w-7">
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <button className="btn-primary w-full flex items-center justify-center gap-2">
              <FolderPlus className="h-4 w-4" />
              New Project
            </button>
            <div className="space-y-2">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setActiveProjectId(project.id)}
                  className={`w-full text-left flex items-center gap-3 p-3 rounded-2xl border transition ${
                    activeProjectId === project.id
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10"
                      : "border-white/5 bg-white/5 hover:border-[var(--color-accent)]"
                  }`}
                >
                  <div className="h-8 w-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-[var(--color-accent)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{project.name}</p>
                    <p className="text-[10px] text-[var(--color-muted)]">
                      {project.status} · {project.updated}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            <div className="surface-card p-4 space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Quick Actions</p>
              <button className="btn-secondary w-full flex items-center justify-between">
                Invite Members
                <Users className="h-4 w-4" />
              </button>
              <button className="btn-secondary w-full flex items-center justify-between">
                Search Assets
                <Search className="h-4 w-4" />
              </button>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="surface-panel p-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Canvas</p>
                <h2 className="text-xl font-semibold">{activeProject.name}</h2>
                <p className="text-sm text-[var(--color-muted)]">
                  {activeProject.status} · Updated {activeProject.updated}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                <button className="btn-ghost">Undo</button>
                <button className="btn-ghost">Redo</button>
                <button className="btn-secondary">Preview</button>
              </div>
            </div>

            <div className="canvas-grid min-h-[520px] p-6 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-12 left-10 h-24 w-24 rounded-full bg-[var(--color-accent)]/10 blur-2xl animate-float" />
                <div className="absolute bottom-12 right-16 h-28 w-28 rounded-full bg-[var(--color-accent-2)]/20 blur-3xl animate-float" />
              </div>

              <div className="absolute left-6 top-6 flex flex-col gap-3">
                {["C", "+", "S", "M"].map((tool) => (
                  <button key={tool} className="tool-btn">
                    {tool}
                  </button>
                ))}
              </div>

              <div className="absolute right-12 top-16 space-y-4">
                {["Client Intake", "Generate AI Content", "Email Campaign"].map((node) => (
                  <div key={node} className="canvas-node px-4 py-3 text-sm w-40">
                    {node}
                  </div>
                ))}
              </div>

              <div className="absolute left-24 bottom-16 space-y-3">
                {["Lead Form", "Gmail Automation"].map((node) => (
                  <div key={node} className="canvas-node px-4 py-3 text-sm w-36">
                    {node}
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center justify-center h-full text-center relative z-10 space-y-6">
                <div>
                  <p className="text-2xl font-semibold">Start Building</p>
                  <p className="text-sm text-[var(--color-muted)] mt-2 max-w-md">
                    Create a project, drag components onto the canvas, and connect workflows. Ask
                    Sciplex or Neo to generate your first sequence.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                  {quickActions.map((action) => (
                    <button
                      key={action}
                      className="btn-secondary"
                      onClick={() => handlePrompt(action)}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <aside className="surface-panel p-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Bot className="h-5 w-5 text-[var(--color-accent)]" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">AI Agents</p>
                <h3 className="text-lg font-semibold">Sciplex + Neo</h3>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { name: "Sciplex", desc: "Lifecycle agent for projects." },
                { name: "Neo", desc: "Strategy and sequencing." },
              ].map((agent) => (
                <div key={agent.name} className="canvas-node p-4 space-y-2">
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span>{agent.name}</span>
                    <span className="badge px-2 py-0.5 text-[10px]">{lastAction}</span>
                  </div>
                  <p className="text-xs text-[var(--color-muted)]">{agent.desc}</p>
                </div>
              ))}
            </div>

            <div className="surface-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
                  <SlidersHorizontal className="h-4 w-4 text-[var(--color-accent)]" />
                  Agent Chat
                </div>
                <span className="badge px-2 py-0.5 text-[10px]">Live</span>
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)]">Sciplex</p>
                  <p className="text-sm text-[var(--color-text)] mt-1">
                    Hi Jessica, I can build a first draft or map your workflow. What should we do?
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)]">You</p>
                  <p className="text-sm text-[var(--color-text)] mt-1">
                    Let’s start with a landing page + onboarding flow.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handlePrompt(prompt)}
                    className="chip chip-strong"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="relative">
                <input
                  value={agentInput}
                  onChange={(event) => setAgentInput(event.target.value)}
                  placeholder="Ask Sciplex..."
                  className="input-field pr-16"
                />
                {isTyping ? (
                  <div className="absolute right-4 top-3 flex items-center gap-1 text-[var(--color-muted)] text-xs">
                    <span className="typing-dot" />
                    <span className="typing-dot delay-150" />
                    <span className="typing-dot delay-300" />
                  </div>
                ) : null}
              </div>

              <div className="flex items-center gap-2">
                <button className="btn-primary flex-1" onClick={() => handlePrompt("Generate first draft")}>
                  Send to Sciplex
                </button>
                <button className="btn-ghost" onClick={() => handlePrompt("Summarize project context")}>
                  <Wand2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
