"use client";

import { cn } from "@/lib/utils";
import InlineEditable from "./inline-editable";
import { Input } from "./ui/input";
import { useCallback, useMemo } from "react";
import { IProject, useStore } from "@/store";
import { usePathname, useRouter } from "next/navigation";

type ProjectItemProps = {
  id: string;
  name: string;
  project: IProject;
  onClick?: VoidFunction;
};

const ProjectItem = ({ id, name, project }: ProjectItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { editProject, setRecents } = useStore();
  const handleSubmit = useCallback(
    (value: string) => {
      editProject(id, value);
    },
    [editProject, id]
  );

  const handleOpenProject = async () => {
    await setRecents(project);
    router.push(`/projects/${id}`);
  };

  const isActive = useMemo(() => {
    return pathname.includes(`projects/${id}`);
  }, [id, pathname]);

  return (
    <div
      onClick={handleOpenProject}
      className={cn(
        "px-3 py-1.5 flex items-center gap-2 rounded-md hover:bg-stone-200 hover:cursor-pointer first:animate-slide-in",
        {
          "bg-stone-200 font-medium": isActive,
        }
      )}
    >
      <InlineEditable
        text={name}
        placeholder="Another evil plan"
        textStyle="truncate text-sm"
        onSubmitForm={handleSubmit}
        editor={({ onChange, value }) => (
          <Input
            onChange={(e) => onChange(e.target.value)}
            value={value}
            className="bg-transparent border-none px-0 h-5"
          />
        )}
      />
    </div>
  );
};

export default ProjectItem;
