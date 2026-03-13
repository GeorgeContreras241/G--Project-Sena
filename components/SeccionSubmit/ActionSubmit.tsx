"use client"
import Add from "../ui/icons/Add";
import { useState } from "react";
import { loadVault } from "../../lib/vault/loadVault";
import { useStoragePass } from "@/storage/useStoragePass";
import { decrypt } from "@/lib/crypto/decryptData";
import { deriveKey } from "@/lib/crypto/kdfKey";


export const ActionSubmit = ({ isPageOn }: { isPageOn: (value: boolean) => void }) => {
    const [file, setFile] = useState<File | null>(null);
    //Estodos de carga
    const setLoading = useStoragePass((state: any) => state.setLoading);
    const setDataPassword = useStoragePass((state: any) => state.setDataPassword);
    const setDerivedKey = useStoragePass((state: any) => state.setDerivedKey);
    const setSalt = useStoragePass((state: any) => state.setSalt);
    const derivedKey = useStoragePass((state: any) => state.derivedKey);
    const salt = useStoragePass((state: any) => state.salt);

    // Almazenamientos de datos Decifrados.

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] || null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const password = formData.get("password") as string;

        if (!password) {
            console.error("Clave Necesaria para continuar");
            return;
        }
        if (file) {
            console.log("ARchivo existe")
            const { iv, data, salt } = await loadVault({ file, setLoading });
            const key = await deriveKey(password, salt);
            console.log("key", salt)
            console.log("Derive key: ", key)
            const dataDecrypted = await decrypt(key, { iv, data }, setLoading);
            setDataPassword(dataDecrypted)
            if (dataDecrypted.error) {
                console.log(dataDecrypted.error)
                return;
            }
        }
        // Almacenar los clave devicada
        console.log("Clave devicada existe");
        const salt = crypto.getRandomValues(new Uint8Array(16))

        const key = await deriveKey(password, salt);

        
        setDerivedKey(key);
        isPageOn(true);

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
                    autoComplete="off"
                    spellCheck="false"
                    autoCorrect="off"
                />
                <button className="w-full bg-neutral-700/50 text-white rounded p-2 cursor-pointer" type="submit">Decifrar</button>
            </form>
        </div>
    )
}