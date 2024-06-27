"use client";
import React from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/store";

type ProjectPageHeaderProps = {
  projectId: string;
  projectName: string;
  createdAt: number;
};

export default function ProjectPageHeader({
  projectId,
  projectName,
  createdAt,
}: ProjectPageHeaderProps) {
  const router = useRouter();
  const { newNote, deleteProject } = useStore();

  const handleAddNote = () => {
    newNote(projectId);
  };

  const handleDeleteProject = async () => {
    await deleteProject(projectId);
    router.push(`/projects`);
  };
  return (
    <div className="border-b px-4 py-1 flex items-center justify-between">
      <div className="bg-indigo-100 rounded-md px-2 w-fit">
        <p className="font-medium">{projectName}</p>
      </div>
      <div className="flex items-center">
        <p className="px-4 text-muted-foreground text-xs italic">
          Created at: {format(createdAt, "hh:mmaa - do MMM, yyy")}
        </p>
        <Separator orientation="vertical" className="h-6 mr-2" />
        <Button
          className="flex items-center gap-1"
          size="sm"
          variant="ghost"
          onClick={handleAddNote}
        >
          <Plus className="w-4 h-4" />
          <p className="text-xs">Add note</p>
        </Button>
        <Button
          className="flex items-center gap-1"
          size="sm"
          variant="ghost"
          onClick={handleDeleteProject}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
