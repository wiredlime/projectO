"use client";
import React, { ChangeEvent, useMemo, useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Folders, Search } from "lucide-react";
import CreateProjectButton from "./create-project-btn";
import ProjectItem from "./project-item";
import { useStore } from "@/store";
import { Input } from "./ui/input";

export default function ProjectList() {
  const [search, setSearch] = useState<string>("");
  const { projects } = useStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const list = useMemo(() => {
    if (projects.length < 1) {
      return (
        <div className="w-full p-2">
          <p className="text-sm font-medium italic text-muted-foreground">
            You have no projects
          </p>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col gap-1 ">
          {projects
            .filter((project) =>
              project.name.toLowerCase().includes(search?.toLowerCase() || "")
            )
            .map((project) => (
              <ProjectItem
                project={project}
                id={project.id}
                name={project.name}
                key={project.id}
              />
            ))}
        </div>
      );
    }
  }, [projects, search]);

  return (
    <div className="space-y-6">
      <Input
        type="email"
        placeholder="Search..."
        className="rounded-3xl"
        size={9}
        value={search}
        onChange={handleChange}
        startAdornment={<Search className="shrink-0 w-5 h-5" />}
      />
      <Collapsible className="space-y-2 max-h-64" defaultOpen>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Projects</p>
          <CollapsibleTrigger>
            <Folders className="w-4 h-4" />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="w-full space-y-1.5">
          <CreateProjectButton />
          {list}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
