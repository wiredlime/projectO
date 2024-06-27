"use client";
import { useMarkdown } from "@/providers/markdown-provider";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {};

function Preview({}: Props) {
  const { markdown } = useMarkdown();
  return (
    <article className="prose p-10 max-h-[80dvh] overflow-y-scroll">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </article>
  );
}

export default Preview;
