"use client";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import NoteItem from "./note-item";
import { INote } from "@/store";

type NoteListProps = {
  notes: INote[];
  setNotes?: Dispatch<SetStateAction<Note[]>>;
  projectId: string;
};

function NoteList({ notes, projectId }: NoteListProps) {
  const list = useMemo(() => {
    if (notes.length) {
      return (
        <div className="flex flex-col-reverse gap-3">
          {notes
            .sort((a, b) => a.updatedAt - b.updatedAt)
            .map((note) => (
              <NoteItem
                key={note.id}
                projectId={projectId}
                id={note.id}
                title={note.content.slice(0, 50)}
                subtitle={note.content.slice(0)}
                updatedAt={note.updatedAt}
              />
            ))}
        </div>
      );
    } else {
      return (
        <div className="w-full p-10 grid place-items-center">
          <p className="text-muted-foreground italic">
            Let&apos;s jot down some cool notes!
          </p>
        </div>
      );
    }
  }, [notes, projectId]);

  return <div className="p-5 space-y-3 h-full overflow-y-scroll">{list}</div>;
}

export default NoteList;
