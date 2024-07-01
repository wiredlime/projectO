"use client";
import React from "react";
import { Blend, History } from "lucide-react";
import ProjectList from "./project-list";
import { Separator } from "./ui/separator";
import { useStore } from "@/store";
import Link from "next/link";

export default function Sidebar() {
  const { recents } = useStore();
  return (
    <div className="h-full p-2 pl-4 flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-extrabold">ProjectO</span>
          <Blend className="w-5 h-5 shrink-0 hover:animate-spin" />
        </div>
        <ProjectList />
      </div>

      <div className="flex flex-col gap-5 shrink">
        <div className="space-y-2">
          <Separator />
          <div className="flex items-center gap-2">
            <History className="shrink-0 w-4 h-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground font-semibold">
              Recent
            </p>
          </div>
          <div className="flex flex-col-reverse gap-2">
            {recents.map((recent) => {
              return (
                <Link
                  key={recent.id}
                  className="grow text-sm text-foreground rounded-sm px-1 hover:underline hover:cursor-pointer"
                  href={`/projects/${recent.id}`}
                >
                  {recent.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="space-x-2 flex justify-end">
          <a
            href="mailto:tiennguyen.baked@gmail.com"
            className="text-xs text-muted-foreground"
          >
            @
          </a>
          <a
            href="https://github.com/wiredlime"
            className="text-xs text-muted-foreground"
          >
            github
          </a>
          <a
            href="https://www.linkedin.com/in/ally-nguyen-67a81520b"
            className="text-xs text-muted-foreground"
          >
            linkedin
          </a>
        </div>
      </div>
    </div>
  );
}
