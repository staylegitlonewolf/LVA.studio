import { Suspense } from "react";
import ProjectsClient from "./projects-client";

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={<div className="min-h-screen bg-atmosphere flex items-center justify-center text-sm text-[var(--color-muted)]">Loading projects...</div>}
    >
      <ProjectsClient />
    </Suspense>
  );
}
