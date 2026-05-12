"use client"
import { Gestor } from "@/features/manager/Gestor";
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
