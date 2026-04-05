import Link from "next/link";
import { ArrowLeft, FolderGit } from "lucide-react";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ owner: "legacy", name: "repo" }];
}

export default function RepoPage({ params }: { params: { owner: string; name: string } }) {
  return (
    <main className="min-h-screen bg-atmosphere px-6 py-16">
      <div className="max-w-2xl mx-auto surface-card p-10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <FolderGit className="h-6 w-6 text-[var(--color-accent)]" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Legacy GitHub</p>
            <h1 className="text-2xl font-semibold">
              {params.owner}/{params.name}
            </h1>
          </div>
        </div>
        <p className="text-[var(--color-muted)]">
          The GitHub agent workspace is paused in Beta while we focus on the LVA B2B portal. GitHub
          workflows will return once the new auth and workspace foundation are locked.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="badge px-3 py-1 text-xs">GitHub sync disabled</span>
          <span className="badge-warm px-3 py-1 text-xs">Workspace shell only</span>
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
