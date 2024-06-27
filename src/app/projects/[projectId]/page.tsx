"use client";
import { useStore } from "@/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { notes } = useStore();
  const pathname = usePathname();
  const router = useRouter();
  const projectId = pathname.split("/")[2];

  useEffect(() => {
    if (projectId && notes) {
      const newestNoteId = notes.filter(
        (note) => note.projectId === projectId
      )[0]?.id;
      if (newestNoteId) {
        router.push(`/projects/${projectId}/notes/${newestNoteId}`);
      } else {
        router.push(`/projects/${projectId}`);
      }
    }
  }, [notes, projectId, router]);

  return <div className="w-full h-full bg-accent/50"></div>;
}
