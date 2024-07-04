"use client";
import React from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";

import { formatDistanceToNow } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/store";
import Link from "next/link";

type NoteItemProps = {
  projectId: string;
  id: string;
  title: string;
  subtitle: string;
  updatedAt: number;
};

export default function NoteItem({
  projectId,
  id,
  title,
  subtitle,
  updatedAt,
}: NoteItemProps) {
  const { deleteNote } = useStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleDeleteNote = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    deleteNote(id);
    const path = pathname.split("/").splice(1, 3).join("/");
    const isNoteOpened = pathname.split("/")[4] === id;
    if (isNoteOpened) {
      router.push(`/${path}`);
    }
  };
  return (
    <Link
      href={`/projects/${projectId}/notes/${id}`}
      className="p-4 space-y-4 rounded-lg border bg-card text-card-foreground shadow-sm"
    >
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <p>{formatDistanceToNow(updatedAt, { addSuffix: true })}</p>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-transparent h-4 px-1"
          onClick={handleDeleteNote}
        >
          <X className="w-4 h-4 text-muted-foreground/50" />
        </Button>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-3">{subtitle}</p>
    </Link>
  );
}
