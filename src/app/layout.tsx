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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ToastProvider from "@/providers/toast-provider";
import { Menu } from "lucide-react";

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
    <div>
      <div className="w-full md:hidden flex justify-end p-2 pb-0">
        <Sheet>
          <SheetTrigger>
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={20}
          className="hidden md:block max-w-sm min-h-screen"
        >
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle className="invisible" />
        <ResizablePanel
          defaultSize={80}
          className="min-h-screen p-2 flex flex-col gap-2"
        >
          <Card className="grow">{children}</Card>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
