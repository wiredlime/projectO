"use client";
import React, { Dispatch, SetStateAction, useMemo } from "react";
import NoteItem from "./note-item";
import { INote, useStore } from "@/store";

type NoteListProps = {
  notes: INote[];
  setNotes?: Dispatch<SetStateAction<Note[]>>;
};

function NoteList({ notes }: NoteListProps) {
  const list = useMemo(() => {
    if (notes.length) {
      return (
        <div className="flex flex-col-reverse gap-3">
          {notes
            .sort((a, b) => a.updatedAt - b.updatedAt)
            .map((note) => (
              <NoteItem
                key={note.id}
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
  }, [notes]);

  return (
    <div className="p-3 space-y-3 max-h-[88dvh] overflow-y-scroll">{list}</div>
  );
}

export default NoteList;
