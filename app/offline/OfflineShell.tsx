"use client";

import { LocalProvider } from "@/context/localProvider";
import { Toaster } from "sileo";

export function OfflineShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col">
      <LocalProvider>
        <main>{children}</main>
      </LocalProvider>
      <Toaster position="top-center" />
    </section>
  );
}
