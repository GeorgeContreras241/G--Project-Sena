"use client"
import Add from "../ui/icons/Add";
import { Exit } from "@/components/ui/exit";
import { sileo, Toaster } from "sileo"
import { useState } from "react";
import { useStoragePass } from "@/storage/useStoragePass";
import { validateVaultInputs } from "@/utils/SeccionSubmit/validateVaultInputs";
import { openVault } from "@/utils/SeccionSubmit/openVault";
import { Eye } from "../ui/icons/Eye";
import { EyeClose } from "../ui/icons/EyeClose";


export const ActionSubmit = ({ onSuccess }: { onSuccess: (value: boolean) => void }) => {
    const [file, setFile] = useState<File | null>(null);
    const [viewPass, setViewPass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [fileError, setFileError] = useState('');
    // Storage of decrypted data
    const setDataPasswordInit = useStoragePass((state: any) => state.setDataPasswordInit);
    const dataPassword = useStoragePass((state: any) => state.dataPassword);
    const setDerivedKey = useStoragePass((state: any) => state.setDerivedKey);
    const setSalt = useStoragePass((state: any) => state.setSalt);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        if (password.length === 0) {
            setPasswordError('');
        } else if (password.length < 4) {
            setPasswordError('La clave debe tener al menos 4 caracteres');
        } else {
            setPasswordError('');
        }
    };

    const handleClearFile = () => {
        setFile(null);
        setFileError('');
        // Reset file input 
        const fileInput = document.getElementById('file') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;

        if (selectedFile) {
            if (!selectedFile.name.endsWith('.enc')) {
                setFileError('Solo se permiten archivos .enc');
                setFile(null);
                // Reset file input
                e.target.value = '';
            } else if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
                setFileError('El archivo es demasiado grande (máximo 10MB)');
                setFile(null);
                e.target.value = '';
            } else {
                setFileError('');
                setFile(selectedFile);
            }
        } else {
            setFileError('');
            setFile(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        const formData = new FormData(e.target as HTMLFormElement);
        const password = formData.get("password") as string;

        if (password.length < 4) {
            setPasswordError('La clave debe tener al menos 4 caracteres');
            return;
        }
        setIsLoading(true);

        try {
            // Validation of inputs
            const validation = validateVaultInputs(password);
            if (validation !== true) return sileo.error(validation);

            if(!file){
                sileo.warning({
        title: "Error Fatal",
        description: "La contraseña es requerida",
        duration: 5000,
        fill: "var(--color-bg-elevated)",
        styles: {
            title: "text-red! font-bold!",
            description: "text-white! text-center!",
        }
    })
                return
            }
            // Opening of vault
            const vaultData = await openVault({ file: file!, password });
            // Validation of vault
            if (!vaultData.state && vaultData.message) {
                return sileo.error(vaultData.message);
            }

            // Setting data
            setSalt(vaultData.salt);    
            setDataPasswordInit(vaultData.dataDecrypted);
            setDerivedKey(vaultData.key);
            onSuccess(false);
        } catch (error) {
            sileo.error({ title: "Error al descifrar el archivo." });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="border border-border rounded-md bg-bg-main w-full max-w-xl grid place-items-center gap-2 p-8">
            <Toaster position="bottom-center" />
            <Exit />
            <div className="w-full grid place-items-center gap-2">
                <div className="w-full flex gap-3">
                    <input className="hidden" id="file" type="file" onChange={handleFileChange} accept=".enc" />
                    <div className="flex-1 h-48 border-2 border-dashed border-border rounded-xl bg-accent-subtle/50 hover:bg-accent-subtle transition-colors cursor-pointer group">
                        <label htmlFor="file" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                            <div className="w-16 h-16 bg-bg-elevated rounded-full border-2 border-border-strong flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                                <Add />
                            </div>
                            <span className="text-sm text-text-muted font-medium">Arrastra o haz clic para subir</span>
                            <span className="text-xs text-text-muted/60 mt-1">Solo archivos .enc</span>
                        </label>
                    </div>
                    {file && (
                        <button
                            type="button"
                            onClick={handleClearFile}
                            className="grid place-content-center w-12 h-12 rounded-xl border border-border bg-bg-elevated cursor-pointer
                            hover:bg-bg-hover hover:border-border-strong transition-all group"
                            title="Eliminar archivo"
                        >
                            <svg className="w-5 h-5 text-text-muted group-hover:text-error transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    )}
                </div>
                <span className={`${file ? "text-success border-success bg-success-subtle" : "text-error border-error bg-error-subtle"} text-sm border rounded px-2 py-1 w-full text-center`}>
                    {fileError ? fileError : (file ? "Archivo Cargado Correctamente" : "Seleccione un archivo")}
                </span>
            </div>
            <form className="w-full flex flex-col gap-2 mt-4 text-sm text-gray-300" onSubmit={handleSubmit}>
                <div className="flex justify-between">
                    <label htmlFor="password" className="text-start font-bold text-text-secondary">Clave Maestra</label>
                    {passwordError && (
                        <span id="password-error" className="text-error text-xs mt-1" role="alert">
                            {passwordError}
                        </span>
                    )}
                </div>
                <div className="relative">
                    <input
                        type={viewPass ? "text" : "password"}
                        className={`w-full border rounded py-2 px-3 pr-10
                        placeholder:text-gray-500 placeholder:italic placeholder:text-md focus:outline-none focus:ring-2 focus:ring-accent/20 ${passwordError ? 'border-error focus:ring-error/20' : 'border-border-strong'
                            }`}
                        placeholder="Ingresa Aqui"
                        id="password"
                        name="password"
                        autoComplete="off"
                        spellCheck="false"
                        autoCorrect="off"
                        onChange={handlePasswordChange}
                        aria-invalid={passwordError ? 'true' : 'false'}
                        aria-describedby={passwordError ? 'password-error' : undefined}
                    />
                    <button
                        type="button"
                        onClick={() => setViewPass(!viewPass)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                        aria-label={viewPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                        {viewPass ? (
                            <Eye />
                        ) : (
                            <EyeClose />
                        )}
                    </button>
                </div>

                <button
                    className="w-full bg-secondary text-text-secondary rounded p-2 cursor-pointer flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isLoading}
                    aria-busy={isLoading}
                    aria-describedby="loading-status"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Descifrando...</span>
                        </>
                    ) : (
                        <span>Descifrar</span>
                    )}
                </button>
                {isLoading && (
                    <span id="loading-status" className="sr-only">
                        Procesando archivo, por favor espere
                    </span>
                )}
            </form>
        </div>
    )
}