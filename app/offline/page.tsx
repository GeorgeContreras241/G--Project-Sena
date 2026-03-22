"use client"
import { ActionSubmit } from "@/components/SeccionSubmit/ActionSubmit";
import { useStoragePass } from "@/storage/useStoragePass";
import { Gestor } from "@/features/manager/componentes/Gestor";
import { useState } from "react";

export const OfflinePage = () => {
  const [ isPage, setPage ] = useState(false);
  return (
    <main className="fondo">
      {
        isPage ? (
          <Gestor />
        ) : (
          <section className="grid place-items-center h-dvh w-full px-2">
            <ActionSubmit isPageOn={setPage} />
          </section>
        )
      }
    </main>
  )
}

export default OfflinePage
