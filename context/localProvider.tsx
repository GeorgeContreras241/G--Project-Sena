// neceisto revisar action sutmit  al subir el archivo no setea la info , parece que ya funciona
"use client";
import { encrypt } from "@/lib/crypto/encryptData"
import { buildVaultFile } from "@/lib/vault/saveVault"
import { deriveKey } from "@/lib/crypto/kdfKey"
import { loadVault } from "@/lib/vault/loadVault";
import { createContext, useRef, useEffect, useState } from "react";
import { decrypt } from "@/lib/crypto/decryptData";
import { useStoragePass } from "@/storage/useStoragePass";
import type { ExportResult , ToogleDeriveKey } from "@/types";
import { sileo } from "sileo"

export const LocalContext = createContext(null);

export const LocalProvider = ({ children }: { children: React.ReactNode }) => {
    const { setDataPassword, dataPassword } = useStoragePass();
    const saltRef = useRef<Uint8Array | null>(null);
    const drcKey = useRef<CryptoKey | null>(null);
    const [saltState, setSaltState] = useState(false);




    const handleReset = () => {
        localStorage.removeItem("salt");
        saltRef.current = null;
        drcKey.current = null;
        setDataPassword(null);
        setSaltState(false);
        console.log("Reset completo");
        console.log("saltRef", saltRef.current);
        console.log("drcKey", drcKey.current);
        console.log("saltState", saltState);
        console.log("setDataPassword", dataPassword);
        console.log("localStorage", localStorage);
    }

    const toogleDeriveKey: ToogleDeriveKey = async (password: string) => { 
        const saltSave = JSON.parse(
            localStorage.getItem("salt") || "null"
        );
        if (!saltSave) {
            console.log("No existe salt");
            return;
        }
        const salt = new Uint8Array(saltSave);
        try {
            const drvKey = await deriveKey(
                password,
                salt
            );
            saltRef.current = salt;
            drcKey.current = drvKey;
            setSaltState(true);
        } catch (error) {
            console.error(
                "Error derivando key",
                error
            );
            setSaltState(false);
        }
    }

    const handleExport: ExportResult = async (dataPassword) => {
        
        const saltSave = JSON.parse(localStorage.getItem("salt") || "null");
        const salt = new Uint8Array(saltSave);
        const derivedKey = drcKey.current;

        // si no se carga archivo es derive key undefinen
  
        if (!derivedKey) {
            sileo.error({
                title: "Error al exportar los datos",
                description: "No se pudo derivar la clave",
                duration: 5000,
                styles: { title: "text-white!" }
            });
            return;
        }
        const encrypted = await encrypt(derivedKey, dataPassword);
        console.log("encrypted", encrypted);
        const { iv, data } = encrypted;
        if (!iv || !data) {
            sileo.error({
                title: "Error al encriptar",
                description: "No se pudo encriptar los datos",
                duration: 5000,
                styles: { title: "text-white!" }
            });
            return;
        }
        const ivArray = new Uint8Array(iv);
        const dataArray = new Uint8Array(data);
        const vaultFile = buildVaultFile(salt, ivArray, dataArray);
        if (!vaultFile) return;
        console.log(vaultFile);
        downloadVault(vaultFile)
    }

    const handleImport = async (file: File, password: string) => {
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
        localStorage.setItem("salt", JSON.stringify(Array.from(salt)));
        // no recibe nada aqui esta el error
        await toogleDeriveKey(password);
        //retorna status mensaje
        const decryptedData = await decrypt(drcKey.current as CryptoKey, { iv, data })

        if (!decryptedData.status) {
            return {
                state: false,
                message: {
                    title: "Error Fatal",
                    description: "No se pudo cargar el archivo",
                    duration: 5000,
                    styles: {
                        title: "text-black!"
                    }
                }
            }
        }
        
        return {
            state: true,
            decryptedData: decryptedData.data,
            salt,
            drcKey: drcKey.current
        }
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
        <LocalContext value={{ saltRef, handleExport, handleImport, handleReset, toogleDeriveKey } as any}>
            {children}
        </LocalContext>
    )
}   