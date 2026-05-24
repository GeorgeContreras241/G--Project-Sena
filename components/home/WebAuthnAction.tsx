"use client";

import WebAuthn from "@/components/ui/icons/WebAuthn";
import { sileo } from "sileo";

export function WebAuthnAction() {
  const handleWebAuthn = () => {
    sileo.warning({ title: "Proximamente" });
  };

  return (
    <button
      type="button"
      onClick={handleWebAuthn}
      className="vault-action-card group relative flex items-center gap-4 rounded-2xl p-4 text-left md:p-6 active:scale-[0.99]"
      role="menuitem"
      aria-label="WebAuthn - Autenticación biométrica"
    >
      <div
        className="vault-icon-frame h-12 w-12 shrink-0 rounded-xl opacity-70 md:h-14 md:w-14"
        aria-hidden="true"
      >
        <WebAuthn />
      </div>
      <div className="min-w-0 flex-1 space-y-1 text-start md:text-center md:space-y-1.5">
        <h2 className="font-sora text-base font-semibold text-zinc-900 dark:text-zinc-50 md:text-lg">
          WebAuthn
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 md:text-sm">
          Biometría, PIN o llave de seguridad
        </p>
        <span className="vault-status-soon flex justify-start md:justify-center">
          Próximamente
        </span>
      </div>
    </button>
  );
}
