"use client";
import { useStore } from "@/store";
import { notFound, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { notes, projects } = useStore();
  const pathname = usePathname();
  const router = useRouter();
  const projectId = pathname.split("/")[2];

  useEffect(() => {
    const isProjectValid = projects.find((project) => project.id === projectId);
    if (isProjectValid) {
      if (projectId && notes) {
        const newestNoteId = notes.filter(
          (note) => note.projectId === projectId
        )[0]?.id;
        if (newestNoteId) {
          router.push(`/projects/${projectId}/notes/${newestNoteId}`);
        }
      }
    } else {
      notFound();
    }
  }, [notes, projectId, projects, router]);

  return <div className="w-full h-full bg-accent/50"></div>;
}
