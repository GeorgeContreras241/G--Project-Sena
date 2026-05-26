"use client";

import { LocalProvider } from "@/context/localProvider";

export function OfflineShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col">
      <div className="vault-bg"></div>
      <LocalProvider>
        <main>{children}</main>
      </LocalProvider>
    </section>
  );
}
