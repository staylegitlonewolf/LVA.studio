import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-atmosphere px-6 py-16">
      <div className="max-w-2xl mx-auto surface-card p-10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <ShieldAlert className="h-6 w-6 text-[var(--color-accent)]" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Legacy Area</p>
            <h1 className="text-2xl font-semibold">Owner Dashboard Disabled</h1>
          </div>
        </div>
        <p className="text-[var(--color-muted)]">
          The GitHub/agent owner dashboard has been paused for the Beta portal shift. This space will
          return when the new authentication and member systems are wired in.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="badge px-3 py-1 text-xs">GitHub features off</span>
          <span className="badge-warm px-3 py-1 text-xs">Auth not active</span>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portal
        </Link>
      </div>
    </main>
  );
}
