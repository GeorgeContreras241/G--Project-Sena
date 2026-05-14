// neceisto revisar action sutmit  al subir el archivo no setea la info , parece que ya funciona
"use client";
import { encrypt } from "@/lib/crypto/encryptData"
import { buildVaultFile } from "@/lib/vault/saveVault"
import { deriveKey } from "@/lib/crypto/kdfKey"
import { loadVault } from "@/lib/vault/loadVault";
import { createContext, useRef, useEffect, useState } from "react";
import { decrypt } from "@/lib/crypto/decryptData";
import { useStoragePass } from "@/storage/useStoragePass";
import type { ExportResult } from "@/types";

export const LocalContext = createContext(null);

export const LocalProvider = ({ children }: { children: React.ReactNode }) => {
    const { setDataPassword } = useStoragePass();
    const saltRef = useRef<Uint8Array | null>(null);
    const drcKey = useRef<CryptoKey | null>(null);
    const [saltState, setSaltState] = useState(false);

    useEffect(() => {
        toogleDeriveKey();
    }, [])


    const handleReset = () => {
        localStorage.removeItem("salt");
        saltRef.current = null;
        drcKey.current = null;
        setDataPassword([]);
        setSaltState(false);
    }

    const toogleDeriveKey = async () => {
        const saltSave = JSON.parse(localStorage.getItem("salt") || "null");
        const salt = new Uint8Array(saltSave);

        if (salt) {
            const drvKey = await deriveKey("password", salt);
            if (drvKey) {
                saltRef.current = salt
                drcKey.current = drvKey;
            }
            setSaltState(true);
        }

    }

    const handleExport: ExportResult = async (dataPassword) => {
        const saltSave = JSON.parse(localStorage.getItem("salt") || "null");
        const salt = new Uint8Array(saltSave);
        const derivedKey = drcKey.current;
        if (!derivedKey) return;
        const encrypted = await encrypt(derivedKey, dataPassword);
        const { iv, data } = encrypted;
        if (!iv || !data) return;
        const ivArray = new Uint8Array(iv);
        const dataArray = new Uint8Array(data);
        const vaultFile = buildVaultFile(salt, ivArray, dataArray);
        if (!vaultFile) return;
        console.log(vaultFile);
        downloadVault(vaultFile)
    }

    const handleImport = async (file: File) => {
        const vaultData = await loadVault({ file })
        if (!vaultData.state) return {
            state: false,
            message: {
                title: "Error Fatal",
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
                title: "Error Fatal",
                description: "No se pudo cargar el archivo",
                duration: 5000,
                styles: {
                    title: "text-white!"
                }
            }
        };
        const decryptedData = await decrypt(drcKey.current as CryptoKey, { iv, data })
        return {
            state: true,
            decryptedData,
            salt,
            drcKey: drcKey.current
        }
    }

    const downloadVault = (buffer : any) => {
        const blob = new Blob(
            [buffer],
            { type: "application/octet-stream" }
        )
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "pass.enc"
        a.click()
        URL.revokeObjectURL(url)
    }
    return (
        <LocalContext value={{ saltRef, handleExport, handleImport, handleReset } as any}>
            {children}
        </LocalContext>
    )
}   