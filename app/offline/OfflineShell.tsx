"use client";

import { LocalProvider } from "@/context/localProvider";

export function OfflineShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col">
      <LocalProvider>
        <main>{children}</main>
      </LocalProvider>
    </section>
  );
}
