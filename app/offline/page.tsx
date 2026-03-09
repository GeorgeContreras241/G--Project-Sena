"use client"
import { ActionSubmit } from "@/components/SeccionSubmit/ActionSubmit";
import { Gestor } from "@/components/gestor/Gestor";
import { useState } from "react";

export const OfflinePage = () => {
  const [isKeyLoaded, setIsKeyLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vault, setVault] = useState(null);


  return (
    <>
      {
        isKeyLoaded ? (
          <Gestor />
        ) : (
          <section className="grid place-items-center h-dvh w-full px-2">
            <ActionSubmit isKeyLoaded={isKeyLoaded} setIsKeyLoaded={setIsKeyLoaded} />
          </section>
        )
      }
    </>
  )
}

export default OfflinePage
