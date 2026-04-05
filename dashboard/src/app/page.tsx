import Link from "next/link";
import {
  ArrowRight,
  Cloud,
  LayoutGrid,
  ShieldCheck,
  Sparkles,
  Users,
  Wand2,
} from "lucide-react";

export default function Home() {
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
              <h1 className="text-lg font-semibold">AI Control Center (BETA)</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="badge px-3 py-1 text-xs font-semibold">Local-first</span>
            <span className="badge-warm px-3 py-1 text-xs font-semibold">Mock Auth</span>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 pb-20">
          <section className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 pt-8">
            <div className="space-y-8 animate-rise">
              <div className="space-y-6">
                <p className="badge px-4 py-1 text-xs font-semibold w-fit">B2B Member Workspace</p>
                <h2 className="text-display text-4xl md:text-5xl font-semibold leading-tight">
                  A real product OS for owners, members, and agent-guided work.
                </h2>
                <p className="text-lg text-[var(--color-muted)] max-w-xl">
                  This is the Beta portal for LVA Studio. It is designed to feel like the final
                  product: workspace-first, canvas-driven, and ready for Google login + email/2FA
                  once the Apps Script backend is connected.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Users, title: "Owner Visibility", desc: "Member activity, projects, and usage." },
                  { icon: Sparkles, title: "Canvas Builder", desc: "Drag, connect, and preview outputs." },
                  { icon: ShieldCheck, title: "Security Ready", desc: "Built for Google login + 2FA." },
                  { icon: Wand2, title: "Agent Guidance", desc: "Neo + Sciplex workflows." },
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
                  <p className="text-sm text-[var(--color-muted)]">Planned backend</p>
                </div>
                <div className="flex flex-wrap gap-3 text-xs">
                  {["Google Sheets DB", "Apps Script", "Role-based Access", "Project Tokens"].map((item) => (
                    <span key={item} className="badge px-3 py-1">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="surface-card p-8 space-y-6 animate-rise">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Access</p>
                <h3 className="text-2xl font-semibold">Sign In / Registration</h3>
                <p className="text-sm text-[var(--color-muted)] mt-2">
                  This is a mock flow. Choose a role to preview the live workspace.
                </p>
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
                  Mock entry for BETA. Pick a role.
                </p>
                <div className="grid gap-2">
                  <Link
                    href="/projects?role=owner"
                    className="w-full rounded-2xl border border-white/10 px-4 py-3 text-sm flex items-center justify-between hover:border-[var(--color-accent)] transition"
                  >
                    <span>Enter as Owner</span>
                    <ArrowRight className="h-4 w-4 text-[var(--color-muted)]" />
                  </Link>
                  <Link
                    href="/projects?role=member"
                    className="w-full rounded-2xl border border-white/10 px-4 py-3 text-sm flex items-center justify-between hover:border-[var(--color-accent)] transition"
                  >
                    <span>Enter as Member</span>
                    <ArrowRight className="h-4 w-4 text-[var(--color-muted)]" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
