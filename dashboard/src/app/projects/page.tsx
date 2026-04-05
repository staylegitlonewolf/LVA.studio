"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  Bell,
  BookOpen,
  Bot,
  Calendar,
  LayoutGrid,
  MessageSquare,
  Plus,
  Search,
  Settings,
  Sparkles,
  Star,
  User,
} from "lucide-react";

const recentProjects = [
  { name: "Client Website Redesign", status: "Active", updated: "Today", owner: "Owner" },
  { name: "Marketing Automation", status: "Draft", updated: "Yesterday", owner: "Member" },
  { name: "Sciplex Ops Portal", status: "Review", updated: "2 days ago", owner: "Owner" },
];

const templates = [
  { name: "Launch Campaign", desc: "AI + email + social workflow template." },
  { name: "Client Intake", desc: "Forms, onboarding, and handoff flow." },
  { name: "Product Sprint", desc: "Research, build, and QA lanes." },
  { name: "Ops Automation", desc: "Recurring tasks and approvals." },
];

const agentSuggestions = [
  { title: "Neo", desc: "Draft a milestone plan for the next project." },
  { title: "Sciplex", desc: "Build the onboarding checklist and invite flow." },
  { title: "Atlas", desc: "Generate three layout variants for the canvas." },
];

export default function ProjectsHome() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") ?? "member";
  const isOwner = role === "owner";
  const [activeProject, setActiveProject] = useState(recentProjects[0]);
  const [continueEditing, setContinueEditing] = useState({
    label: recentProjects[0].name,
    source: "Project",
  });

  return (
    <main className="bg-atmosphere min-h-screen">
      <header className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-[var(--color-panel)] border border-white/10 flex items-center justify-center">
            <LayoutGrid className="h-5 w-5 text-[var(--color-accent)]" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Projects Home</p>
            <h1 className="text-lg font-semibold">AI Control Center (BETA)</h1>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
          <span className="badge px-3 py-1 text-[10px]">{isOwner ? "Owner" : "Member"} View</span>
          <button className="h-9 w-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[var(--color-accent)]">
            <Search className="h-4 w-4" />
          </button>
          <button className="h-9 w-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[var(--color-accent)]">
            <Bell className="h-4 w-4" />
          </button>
          <button className="h-9 w-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[var(--color-accent)]">
            <User className="h-4 w-4" />
          </button>
          <button className="h-9 w-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[var(--color-accent)]">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pb-16 grid xl:grid-cols-[260px_1fr_320px] gap-6">
        <aside className="surface-panel p-5 space-y-6">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Navigation</div>
          <button className="btn-primary w-full flex items-center justify-center gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </button>
          <div className="space-y-3">
            {recentProjects.map((project) => (
              <button
                key={project.name}
                onClick={() => {
                  setActiveProject(project);
                  setContinueEditing({ label: project.name, source: "Project" });
                }}
                className={`w-full text-left canvas-node p-4 space-y-2 transition ${
                  activeProject.name === project.name
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>{project.name}</span>
                  <span className="badge-warm px-2 py-0.5 text-[10px]">{project.status}</span>
                </div>
                <p className="text-xs text-[var(--color-muted)]">Updated {project.updated}</p>
              </button>
            ))}
          </div>
          <div className="space-y-2 text-xs text-[var(--color-muted)]">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-[var(--color-accent)]" />
              Team messages
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[var(--color-accent)]" />
              Milestone calendar
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[var(--color-accent)]" />
              Knowledge base
            </div>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="surface-panel p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
                Welcome back, {isOwner ? "Owner" : "Member"}
              </p>
              <h2 className="text-2xl font-semibold">Projects Home</h2>
              <p className="text-sm text-[var(--color-muted)]">
                Start with a template or continue editing an active project.
              </p>
            </div>
            <Link
              href={`/workspace?role=${role}`}
              className="rounded-2xl bg-[var(--color-accent)] text-slate-900 font-semibold px-4 py-2 text-sm flex items-center gap-2"
            >
              Enter Workspace <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="surface-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Continue Editing</p>
                <h3 className="text-lg font-semibold">{continueEditing.label}</h3>
              </div>
              <span className="badge px-3 py-1 text-xs">{continueEditing.source}</span>
            </div>
            <p className="text-sm text-[var(--color-muted)]">
              Last opened 2 hours ago. 12 nodes connected.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/workspace?role=${role}`}
                className="btn-secondary"
              >
                Open Canvas <ArrowRight className="h-4 w-4" />
              </Link>
              {isOwner ? (
                <Link
                  href="/owner"
                  className="btn-ghost"
                >
                  Owner Dashboard <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
          </div>

          <div className="surface-panel p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Templates</h3>
              <button className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                View all
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <button
                  key={template.name}
                  onClick={() =>
                    setContinueEditing({ label: template.name, source: "Template" })
                  }
                  className="text-left canvas-node p-4 space-y-2 transition hover:border-[var(--color-accent)]"
                >
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span>{template.name}</span>
                    <Star className="h-4 w-4 text-[var(--color-accent)]" />
                  </div>
                  <p className="text-xs text-[var(--color-muted)]">{template.desc}</p>
                  <button className="text-xs font-semibold text-[var(--color-accent)] flex items-center gap-2">
                    Use Template <ArrowRight className="h-3 w-3" />
                  </button>
                </button>
              ))}
            </div>
          </div>
        </section>

        <aside className="surface-panel p-5 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Bot className="h-5 w-5 text-[var(--color-accent)]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Agent Suggestions</p>
              <h4 className="text-lg font-semibold">Next Best Actions</h4>
            </div>
          </div>

          <div className="space-y-3">
            {agentSuggestions.map((agent) => (
              <div key={agent.title} className="canvas-node p-4 space-y-2">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>{agent.title}</span>
                  <span className="badge px-2 py-0.5 text-[10px]">Queued</span>
                </div>
                <p className="text-xs text-[var(--color-muted)]">{agent.desc}</p>
                <button className="text-xs font-semibold text-[var(--color-accent)] flex items-center gap-2">
                  Start Task <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="surface-card p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
              <Sparkles className="h-4 w-4 text-[var(--color-accent)]" />
              Tips
            </div>
            <p className="text-xs text-[var(--color-muted)]">
              Use templates to speed up delivery. Invite members once the workspace is scoped.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
