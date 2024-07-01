import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@mdxeditor/editor/style.css";
import "./globals.css";
import { cn } from "@/lib/utils";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Card } from "@/components/ui/card";
import Sidebar from "@/components/sidebar";
import ToastProvider from "@/providers/toast-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "projecto",
  description: "Your favorite Markdown note application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-secondary font-sans antialiased",
          fontSans.variable
        )}
      >
        <ToastProvider>
          <AppLayout>{children}</AppLayout>
        </ToastProvider>
      </body>
    </html>
  );
}

const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={20} className="max-w-sm min-h-screen">
        <Sidebar />
      </ResizablePanel>
      <ResizableHandle className="invisible hover:visible" />
      <ResizablePanel
        defaultSize={80}
        className="min-h-screen p-2 flex flex-col gap-2"
      >
        <Card className="grow">{children}</Card>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
