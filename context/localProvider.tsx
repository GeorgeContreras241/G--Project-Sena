// Data password del storage de zustand es demacioado complejo pasarlo por props- busca solicion en el button.tsx
"use client";
import { encrypt } from "@/lib/crypto/encryptData"
import { buildVaultFile } from "@/lib/vault/saveVault"
import { deriveKey } from "@/lib/crypto/kdfKey"
import { createContext, useRef, useEffect, useState } from "react";

export const LocalContext = createContext<{}>(null!);

export const LocalProvider = ({ children }: { children: React.ReactNode }) => {
    const saltRef = useRef<Uint8Array | null>(null);
    const drcKey = useRef<CryptoKey>(null!);
    const [saltState, setSaltState] = useState<boolean>(false);

    useEffect(() => {
        toogleDeriveKey();
    }, [])

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

    const handleExport = async (data) => {
        console.log("Datos a encryptar ojo :",data)
        const saltSave = JSON.parse(localStorage.getItem("salt") || "null");
        const salt = new Uint8Array(saltSave);

        const encrypted = await encrypt(drcKey.current, data);

        // Tener cuidado que encrypted es un objeto con salt, iv y data
        const vaultFile = buildVaultFile(salt, encrypted.iv, encrypted.data);
        downloadVault(vaultFile)
    }

    const downloadVault = (buffer: any) => {
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
        <LocalContext value={{ saltRef, handleExport }}>
            {children}
        </LocalContext>
    )
}   