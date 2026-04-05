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
} from "lucide-react";

const projectList = [
  "Client Website Redesign",
  "Marketing Automation",
  "ChatGPT Integration",
  "Social Media Planner",
  "Automated Reports",
];

export default function WorkspacePage() {
  return (
    <main className="min-h-screen bg-atmosphere">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <header className="surface-panel px-5 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/projects"
              className="h-9 w-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[var(--color-accent)]"
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
            <button className="h-9 w-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[var(--color-accent)]">
              <Users className="h-4 w-4" />
            </button>
            <button className="h-9 w-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[var(--color-accent)]">
              <MessageSquare className="h-4 w-4" />
            </button>
            <button className="h-9 w-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[var(--color-accent)]">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="mt-6 grid xl:grid-cols-[260px_1fr_320px] gap-6">
          <aside className="surface-panel p-5 space-y-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
              <span>Projects</span>
              <button className="h-7 w-7 rounded-lg border border-white/10 flex items-center justify-center hover:border-[var(--color-accent)]">
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <button className="w-full rounded-2xl bg-[var(--color-accent)] text-slate-900 font-semibold py-3 flex items-center justify-center gap-2">
              <FolderPlus className="h-4 w-4" />
              New Project
            </button>
            <div className="space-y-2">
              {projectList.map((project) => (
                <div
                  key={project}
                  className="flex items-center gap-3 p-3 rounded-2xl border border-white/5 bg-white/5 hover:border-[var(--color-accent)]"
                >
                  <div className="h-8 w-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-[var(--color-accent)]" />
                  </div>
                  <span className="text-sm">{project}</span>
                </div>
              ))}
            </div>
            <div className="surface-card p-4 space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Quick Actions</p>
              <button className="w-full rounded-2xl border border-white/10 px-3 py-2 text-sm flex items-center justify-between hover:border-[var(--color-accent)]">
                Invite Members
                <Users className="h-4 w-4" />
              </button>
              <button className="w-full rounded-2xl border border-white/10 px-3 py-2 text-sm flex items-center justify-between hover:border-[var(--color-accent)]">
                Search Assets
                <Search className="h-4 w-4" />
              </button>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="surface-panel p-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Canvas</p>
                <h2 className="text-xl font-semibold">Start Building</h2>
              </div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                <button className="rounded-full border border-white/10 px-3 py-1 hover:border-[var(--color-accent)]">
                  Undo
                </button>
                <button className="rounded-full border border-white/10 px-3 py-1 hover:border-[var(--color-accent)]">
                  Redo
                </button>
                <button className="rounded-full border border-white/10 px-3 py-1 hover:border-[var(--color-accent)]">
                  Preview
                </button>
              </div>
            </div>

            <div className="canvas-grid min-h-[520px] p-6 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-12 left-10 h-24 w-24 rounded-full bg-[var(--color-accent)]/10 blur-2xl animate-float" />
                <div className="absolute bottom-12 right-16 h-28 w-28 rounded-full bg-[var(--color-accent-2)]/20 blur-3xl animate-float" />
              </div>

              <div className="absolute left-6 top-6 flex flex-col gap-3">
                {["C", "+", "S", "M"].map((tool) => (
                  <button
                    key={tool}
                    className="h-10 w-10 rounded-2xl border border-white/10 bg-black/40 text-sm font-semibold hover:border-[var(--color-accent)]"
                  >
                    {tool}
                  </button>
                ))}
              </div>

              <div className="flex flex-col items-center justify-center h-full text-center relative z-10">
                <p className="text-2xl font-semibold">Start Building</p>
                <p className="text-sm text-[var(--color-muted)] mt-2 max-w-md">
                  Create a project, then drag components onto the canvas to connect workflows. Ask
                  Sciplex or Neo to generate your first sequence.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="rounded-2xl bg-[var(--color-accent)] text-slate-900 font-semibold px-4 py-2">
                    New Project
                  </button>
                  <button className="rounded-2xl border border-white/10 px-4 py-2 text-sm hover:border-[var(--color-accent)]">
                    Pick & Connect Components
                  </button>
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
                    <span className="badge px-2 py-0.5 text-[10px]">Ready</span>
                  </div>
                  <p className="text-xs text-[var(--color-muted)]">{agent.desc}</p>
                </div>
              ))}
            </div>

            <div className="surface-card p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
                <SlidersHorizontal className="h-4 w-4 text-[var(--color-accent)]" />
                Agent Chat
              </div>
              <div className="text-sm text-[var(--color-muted)]">
                Hi Jessica, what should we build today?
              </div>
              <input
                placeholder="Ask Sciplex..."
                className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-2 text-sm outline-hidden focus:border-[var(--color-accent)]"
              />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
