"use client";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { projects } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (projects.length) {
      const newestProjectId = projects[0]?.id;
      router.push(`/projects/${newestProjectId}`);
    }
  }, [projects, projects.length, router]);

  return (
    <div className="w-full grid place-items-center">
      <p className="text-xs text-muted-foreground">You have no projects</p>
    </div>
  );
}
