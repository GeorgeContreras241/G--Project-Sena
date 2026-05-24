"use client"
import { Gestor } from "@/features/manager/Gestor";
import { AuthGuard } from "./AuthGuard";

export const OfflinePage = () => {
  return (
    <AuthGuard>
      <Gestor />
    </AuthGuard>
  );
};

export default OfflinePage
