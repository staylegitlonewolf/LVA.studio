"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  CreditCard,
  LayoutGrid,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

const tabs = ["Overview", "Members", "Billing", "Settings"] as const;
type Tab = (typeof tabs)[number];

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  return (
    <main className="min-h-screen bg-atmosphere">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <header className="surface-panel px-5 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/projects?role=owner"
              className="h-9 w-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[var(--color-accent)]"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="h-10 w-10 rounded-2xl bg-[var(--color-panel)] border border-white/10 flex items-center justify-center">
              <LayoutGrid className="h-5 w-5 text-[var(--color-accent)]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Owner Dashboard</p>
              <h1 className="text-lg font-semibold">AI Control Center (BETA)</h1>
            </div>
          </div>
          <span className="badge px-3 py-1 text-xs">Admin Only</span>
        </header>

        <div className="surface-panel p-2 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-2xl text-sm font-semibold transition ${
                activeTab === tab
                  ? "bg-[var(--color-accent)] text-slate-900"
                  : "text-[var(--color-muted)] hover:text-[var(--color-accent)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Overview" ? (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="surface-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-[var(--color-accent)]" />
                <h2 className="text-lg font-semibold">API Usage Metrics</h2>
              </div>
              <div className="h-40 rounded-2xl border border-white/10 bg-black/30 flex items-center justify-center text-sm text-[var(--color-muted)]">
                Chart placeholder
              </div>
              <p className="text-sm text-[var(--color-muted)]">
                92% quota remaining. Usage will sync from Google Sheets later.
              </p>
            </div>
            <div className="surface-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-[var(--color-accent)]" />
                <h2 className="text-lg font-semibold">Security Posture</h2>
              </div>
              <ul className="space-y-3 text-sm text-[var(--color-muted)]">
                <li>2-step authentication: Enabled (planned)</li>
                <li>Google OAuth: Pending</li>
                <li>Member roles: Drafted</li>
              </ul>
              <button className="rounded-2xl border border-white/10 px-4 py-2 text-sm hover:border-[var(--color-accent)]">
                Review Security Plan
              </button>
            </div>
          </div>
        ) : null}

        {activeTab === "Members" ? (
          <div className="surface-card p-6 space-y-5">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-[var(--color-accent)]" />
              <h2 className="text-lg font-semibold">Team Members</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {["Jessica Wolfe", "Marvin Carter", "Sabrina Hall", "Neo Ops"].map((name) => (
                <div key={name} className="canvas-node p-4 space-y-2">
                  <p className="font-semibold">{name}</p>
                  <p className="text-xs text-[var(--color-muted)]">Role: Member</p>
                  <button className="text-xs text-[var(--color-accent)] font-semibold">
                    View Activity
                  </button>
                </div>
              ))}
            </div>
            <button className="rounded-2xl bg-[var(--color-accent)] text-slate-900 font-semibold px-4 py-2 text-sm">
              Invite Member
            </button>
          </div>
        ) : null}

        {activeTab === "Billing" ? (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="surface-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-[var(--color-accent)]" />
                <h2 className="text-lg font-semibold">Billing Overview</h2>
              </div>
              <p className="text-sm text-[var(--color-muted)]">
                Current plan: BETA. Billing will activate once Google Sheets sync is live.
              </p>
              <button className="rounded-2xl border border-white/10 px-4 py-2 text-sm hover:border-[var(--color-accent)]">
                Manage Plan
              </button>
            </div>
            <div className="surface-card p-6 space-y-4">
              <h3 className="text-lg font-semibold">Usage Summary</h3>
              <div className="space-y-2 text-sm text-[var(--color-muted)]">
                <p>Tokens used this month: 5,400</p>
                <p>Next reset: 12 days</p>
                <p>Active members: 8</p>
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === "Settings" ? (
          <div className="surface-card p-6 space-y-6">
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-[var(--color-accent)]" />
              <h2 className="text-lg font-semibold">Portal Settings</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="canvas-node p-4 space-y-2">
                <p className="font-semibold">Branding</p>
                <p className="text-xs text-[var(--color-muted)]">Upload logo + brand tokens later.</p>
              </div>
              <div className="canvas-node p-4 space-y-2">
                <p className="font-semibold">Integrations</p>
                <p className="text-xs text-[var(--color-muted)]">Google Sheets + Apps Script.</p>
              </div>
            </div>
            <button className="rounded-2xl border border-white/10 px-4 py-2 text-sm hover:border-[var(--color-accent)]">
              Save Settings
            </button>
          </div>
        ) : null}
      </div>
    </main>
  );
}
