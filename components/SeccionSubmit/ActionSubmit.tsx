"use client"
import Add from "../../components/icons/Add";
import { deriveKey } from "../../lib/crypto/kdf";
import { encrypt } from "../../lib/crypto/encrypt";
import { decrypt } from "../../lib/crypto/decrypt";
import { useState } from "react";
import { buffer } from "stream/consumers";


export const ActionSubmit = ({ isKeyLoaded, setIsKeyLoaded }: { isKeyLoaded: boolean; setIsKeyLoaded: (value: boolean) => void }) => {
    const [file, setFile] = useState<File | null>(null);

    // Almazenamientos de datos Decifrados.
    const [dataPassword, setDataPassword] = useState<object | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] || null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const password = formData.get("password") as string;
    }

    function buildVaultFile(salt: Uint8Array, iv: Uint8Array | number[], data: Uint8Array | any) {

        const buffer = new Uint8Array(
            salt.length + (iv?.length || 0) + data.length
        )

        buffer.set(salt, 0)
        buffer.set(iv, 16)
        buffer.set(data, 28)

        return buffer
    }
    

    function downloadVault(vault: any) {
        const blob = new Blob(
            [vault],
            { type: "application/octet-stream" }
        )

        const url = URL.createObjectURL(blob)

        const a = document.createElement("a")

        a.href = url
        a.download = "vault.enc"

        a.click()

        URL.revokeObjectURL(url)
    }


    return (
        <div className="border border-gray-800/70 w-full max-w-xl grid place-items-center gap-2 p-8">
            <div className="w-full grid place-items-center gap-2">
                <input className="hidden" id="file" type="file" onChange={handleFileChange} />
                <div className="w-full h-48 border border-neutral-700 grid place-items-center rounded-lg bg-neutral-900/80">
                    <label htmlFor="file" className="border w-20 h-20 border-gray-800 px-6 py-2 rounded  text-xs cursor-pointer">
                        <Add />
                    </label>
                </div>
                <span className={file ? "text-green-600 text-sm border border-green-600/50 rounded px-2 py-1 w-full text-center" : "text-neutral-300  text-xs mt-2 border bg-yellow-500/50 border-yellow-600/50 rounded px-2 py-1 w-full text-center"}>
                    {file ? "Archivo Cargado Correctamente" : "Seleccione un archivo"}
                </span>
            </div>
            <form className="w-full flex flex-col gap-2 mt-4 text-sm text-gray-300" onSubmit={handleSubmit}>
                <label htmlFor="password" className="text-start font-bold">Clave Maestra</label>
                <input type="text"
                    className="w-full border border-gray-800/70 rounded py-2 px-3 placeholder:text-gray-500 placeholder:italic placeholder:text-xs "
                    placeholder="Ingresa Aqui" id="password"
                    name="password"
                    required 
                    autoComplete="none"
                    spellCheck="false"
                    autoCorrect="off"
                    />
                <button className="w-full bg-neutral-700/50 text-white rounded p-2 cursor-pointer" type="submit">Decifrar</button>
            </form>
        </div>
    )
}