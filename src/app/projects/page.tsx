"use client";
import { useStore } from "@/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import notfound from "../../../public/abstract-art-6.svg";

export default function Page() {
  const { projects } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (projects.length) {
      const newestProjectId = projects[0]?.id;
      router.push(`/projects/${newestProjectId}`);
    } else {
      router.push(`/projects`);
    }
  }, [projects, projects.length, router]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="relative w-1/2 h-1/2">
        <Image src={notfound} fill alt="not-found" />
      </div>
      <p className="italic text-muted-foreground">
        Seems like you have not create any projects !
      </p>
    </div>
  );
}
