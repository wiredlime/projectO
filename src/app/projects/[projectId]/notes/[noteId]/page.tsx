"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { useStore } from "@/store";
import dynamic from "next/dynamic";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { notFound } from "next/navigation";

const Editor = dynamic(() => import("../../../../../components/mdx-editor"), {
  ssr: false,
});

type PageProps = {
  params: {
    noteId: string;
  };
};

function Page({ params }: PageProps) {
  const { notes, editNote } = useStore();
  const editorRef = useRef<MDXEditorMethods | null>(null);

  const handleSave = async (markdown: string) => {
    await editNote(params.noteId, markdown);
  };

  const markdown = useMemo(() => {
    return notes.find((note) => note.id === params.noteId)?.content;
  }, [notes, params.noteId]);

  useEffect(() => {
    const note = notes.find((note) => note.id === params.noteId)?.content;
    if (!note) {
      notFound();
    }
  }, [notes, params.noteId]);

  return (
    <div className="grow flex max-h-[80vh] overflow-y-scroll">
      <Editor
        editorRef={editorRef}
        markdown={markdown || ""}
        onChange={handleSave}
      />
    </div>
  );
}

export default Page;
