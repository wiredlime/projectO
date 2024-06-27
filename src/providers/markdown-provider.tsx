"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface MarkdownContext {
  markdown: string;
  setMarkdown?: Dispatch<SetStateAction<string>>;
}

const MarkdownContext = createContext<MarkdownContext>({
  markdown: "",
});

const MarkdownProvider = ({ children }: { children: ReactNode }) => {
  const [markdown, setMarkdown] = useState("");

  return (
    <MarkdownContext.Provider value={{ markdown, setMarkdown }}>
      {children}
    </MarkdownContext.Provider>
  );
};

export const useMarkdown = () => useContext(MarkdownContext);

export default MarkdownProvider;
