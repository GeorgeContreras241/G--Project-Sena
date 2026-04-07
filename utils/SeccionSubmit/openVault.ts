
import { loadVault } from "@/lib/vault/loadVault";
import { deriveKey } from "@/lib/crypto/kdfKey";
import { decrypt } from "@/lib/crypto/decryptData";

export const openVault = async ({ file, password }: { file: File, password: string }) => {
    const vaultData = await loadVault({ file });
    if (!vaultData.state) return {
        state: false,
        message: {
            title: "Error Fataldd",
            description: "No se pudo cargar el archivo",
            duration: 5000,
            styles: {
                title: "text-white!"
            }
        }
    };
    const { salt, iv, data } = vaultData;
    if (!salt || !iv || !data) return {
        state: false,
        message: {
            title: "Error Fatal dd",
            description: "No se pudo cargar el archivo",
            duration: 5000,
            styles: {
                title: "text-white!"
            }
        }
    };
    const key = await deriveKey(password, salt);
    const dataDecrypted = await decrypt(key, { iv, data });
    if (!dataDecrypted.status) return {
        status: false,
        message: dataDecrypted.message
    };
    return { state: true, dataDecrypted: dataDecrypted.data, key, salt };
}