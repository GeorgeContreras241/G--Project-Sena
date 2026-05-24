import { Gestor } from "@/features/manager/Gestor";
import { AuthGuard } from "./AuthGuard";

export default function OfflinePage() {
  return (
    <AuthGuard>
      <Gestor />
    </AuthGuard>
  );
}
