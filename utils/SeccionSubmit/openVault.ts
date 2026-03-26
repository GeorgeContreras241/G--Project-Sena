
import { loadVault } from "@/lib/vault/loadVault";
import { deriveKey } from "@/lib/crypto/kdfKey";
import { decrypt } from "@/lib/crypto/decryptData";

export const openVault = async ({ file, password }: { file: File, password: string }) => {
    const vaultData = await loadVault({ file });
    if (!vaultData.state) return {
        state: false,
        message: {
            title: "Error Fatal",
            description: "No se pudo cargar el archivo",
            duration: 5000
        }
    };
    const { salt, iv, data } = vaultData;
    if (!salt || !iv || !data) return {
        state: false,
        message: {
            title: "Error Fatal",
            description: "No se pudo cargar el archivo",
            duration: 5000
        }
    };
    const key = await deriveKey(password, salt);
    const dataDecrypted = await decrypt(key, { iv, data });
    return { state: true, dataDecrypted, key };
}