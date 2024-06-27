"use client";
import { Dispatch, SetStateAction } from "react";
import { Button, ButtonProps } from "./ui/button";
import { Plus } from "lucide-react";
import { cn, randomEmojiGenerator } from "@/lib/utils";
import { IProject, useStore } from "@/store";

interface CreateProjectButtonProps extends ButtonProps {
  onCreateProject?: Dispatch<SetStateAction<IProject[]>>;
}

export default function CreateProjectButton({
  onCreateProject,
  className,
  ...props
}: CreateProjectButtonProps) {
  const { newProject } = useStore();

  const handleCreate = () => {
    newProject(`Untitled project ${randomEmojiGenerator()}`);
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      className={cn(
        "flex items-center h-8 gap-2 w-full border-dashed border hover:bg-stone-200/30 text-xs",
        className
      )}
      onClick={handleCreate}
      {...props}
    >
      <Plus className="shrink-0 w-4 h-4" /> Create project
    </Button>
  );
}
