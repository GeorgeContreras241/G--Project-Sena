// contexto local ts pendiente
"use client";
import { deriveKey } from "@/lib/crypto/kdfKey"
import { createContext, useRef, useEffect, useState } from "react";

export const LocalContext = createContext<{}>(null!);

export const LocalProvider = ({ children }: { children: React.ReactNode }) => {
    const keyRef = useRef<Uint8Array | null>(null);
    const drcKey = useRef<CryptoKey>(null!);
    const [saltState, setSaltState] = useState<boolean>(false);

    useEffect(() => {
        toogleDeriveKey();
    }, [])

    const toogleDeriveKey = async () => {
        const saltSave = JSON.parse(localStorage.getItem("salt") || "null");
        const salt = new Uint8Array(saltSave);
        if (salt) {
            // Si ahy un salt se guarda y estado de la aplicacion se actualiza
            const drvKey = await deriveKey("password", salt);
            if(drvKey) {
                drcKey.current = drvKey;
            }
            setSaltState(true);
        }
        return

    }

    return (
        <LocalContext value={keyRef}>
            {children}
        </LocalContext>
    )
}   