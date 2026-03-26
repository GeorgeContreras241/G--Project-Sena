"use client"
import Add from "../ui/icons/Add";
import { Exit } from "@/components/ui/exit";
import { sileo, Toaster } from "sileo"
import { useState } from "react";
import { useStoragePass } from "@/storage/useStoragePass";
import { validateVaultInputs } from "@/utils/SeccionSubmit/validateVaultInputs";
import { openVault } from "@/utils/SeccionSubmit/openVault";


export const ActionSubmit = ({ onSuccess }: { onSuccess: (value: boolean) => void }) => {
    const [file, setFile] = useState<File | null>(null);
    // Storage of decrypted data
    const setDataPassword = useStoragePass((state: any) => state.setDataPassword);
    const setDerivedKey = useStoragePass((state: any) => state.setDerivedKey);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] || null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Stetaless password extraction
        const formData = new FormData(e.target as HTMLFormElement);
        const password = formData.get("password") as string;
        // Validation of inputs
        const validation = validateVaultInputs(password, file!);
        if (validation !== true) return sileo.error(validation);
        // Opening of vault
        const vaultData = await openVault({ file: file!, password });
        // Validation of vault
        if (!vaultData.state && vaultData.message) return sileo.error(vaultData.message);
        // Setting data
        setDataPassword(vaultData.dataDecrypted);
        setDerivedKey(vaultData.key);
        onSuccess(false)
    }

    return (
        <div className="border border-border rounded-md bg-bg-main w-full max-w-xl grid place-items-center gap-2 p-8">
            <Toaster position="bottom-center" />
            <Exit />
            <div className="w-full grid place-items-center gap-2">
                <input className="hidden" id="file" type="file" onChange={handleFileChange} />
                <div className="w-full h-48 border border-border grid place-items-center rounded-lg bg-accent-subtle cursor-pointer">
                    <label htmlFor="file" className="border w-20 h-20 bg-bg-elevated border-border-strong px-6 py-2 rounded  text-xs cursor-pointer">
                        <Add />
                    </label>
                </div>
                <span className={file ? "text-success text-sm border border-success bg-success-subtle rounded px-2 py-1 w-full text-center"
                    : "text-error bg-error-subtle text-sm border border-error bg-error-muted rounded px-2 py-1 w-full text-center"}>
                    {file ? "Archivo Cargado Correctamente" : "Seleccione un archivo"}
                </span>
            </div>
            <form className="w-full flex flex-col gap-2 mt-4 text-sm text-gray-300" onSubmit={handleSubmit}>
                <label htmlFor="password" className="text-start font-bold text-text-secondary">Clave Maestra</label>
                <input type="text"
                    className="w-full border border-border-strong rounded py-2 px-3 
                    placeholder:text-gray-500 placeholder:italic placeholder:text-md focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="Ingresa Aqui" id="password"
                    name="password"
                    autoComplete="off"
                    spellCheck="false"
                    autoCorrect="off"
                />
                <button className="w-full bg-secondary text-text-secondary rounded p-2 cursor-pointer" type="submit">Decifrar</button>
            </form>
        </div>
    )
}