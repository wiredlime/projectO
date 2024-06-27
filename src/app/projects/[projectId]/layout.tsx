"use client";
import { ReactNode, useMemo } from "react";
import NoteList from "@/components/note-list";
import ProjectPageHeader from "@/components/project-page-header";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useStore } from "@/store";

type LayoutProps = {
  children: ReactNode;
  params: {
    projectId: string;
  };
};

export default function Layout({ params, children }: LayoutProps) {
  const { projects, notes } = useStore();

  const notesByProject = useMemo(() => {
    return notes.filter((note) => note.projectId === params.projectId);
  }, [notes, params.projectId]);

  const content = useMemo(() => {
    const project = projects.find((project) => project.id === params.projectId);
    if (project) {
      return (
        <div className="flex flex-col h-full">
          <ProjectPageHeader
            projectName={project.name}
            projectId={project.id}
            createdAt={project.createdAt}
          />
          <ResizablePanelGroup direction="horizontal" className="flex">
            <ResizablePanel defaultValue={20} className="max-w-sm">
              <NoteList notes={notesByProject} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultValue={80} className="flex grow w-full p-5">
              {children}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      );
    } else {
      return children;
    }
  }, [children, notesByProject, params.projectId, projects]);

  return content;
}
