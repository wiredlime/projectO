"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/projects");
  }, []);
  return (
    <main className="flex flex-col items-center justify-between p-24"></main>
  );
}
