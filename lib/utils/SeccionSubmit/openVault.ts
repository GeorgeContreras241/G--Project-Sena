// Donde Se decrypta

import { loadVault } from "@/lib/vault/loadVault";


export const openVault = async ( file : File ) => {
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
  
    return { state: true, dataDecrypted: data, salt };
}