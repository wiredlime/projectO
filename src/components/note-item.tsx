"use client";
import React, { useCallback } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { X } from "lucide-react";

import { formatDistanceToNow } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/store";

type NoteItemProps = {
  id: string;
  title: string;
  subtitle: string;
  updatedAt: number;
};

export default function NoteItem({
  id,
  title,
  subtitle,
  updatedAt,
}: NoteItemProps) {
  const { deleteNote } = useStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleOpenNote = useCallback(() => {
    if (pathname.includes(`/notes/${id}`)) {
      return;
    } else if (pathname.includes(`/notes`)) {
      const path = pathname.split("/").slice(1, 3).join("/");
      router.push(`/${path}/notes/${id}`);
    } else {
      router.push(`${pathname}/notes/${id}`);
    }
  }, [id, pathname, router]);

  const handleDeleteNote = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    deleteNote(id);
    const path = pathname.split("/").splice(1, 3).join("/");
    const isNoteOpened = pathname.split("/")[4] === id;
    if (isNoteOpened) {
      router.push(`/${path}`);
    }
  };
  return (
    <Card
      className="p-4 space-y-4 hover:cursor-pointer"
      onClick={handleOpenNote}
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

      <div>
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-xs text-muted-foreground line-clamp-3">{subtitle}</p>
      </div>
    </Card>
  );
}
