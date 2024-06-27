import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default async function layout({ children }: LayoutProps) {
  return children;
}
