"use client"
import { Gestor } from "@/features/manager/componentes/Gestor";
import { AuthGuard } from "./AuthGuard";

export const OfflinePage = () => {
  return (
    <main>
      <AuthGuard>
          <Gestor/>
      </AuthGuard>
    </main>
  )
}

export default OfflinePage
