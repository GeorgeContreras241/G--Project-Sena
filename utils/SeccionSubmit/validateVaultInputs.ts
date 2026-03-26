export const validateVaultInputs = (password: string, file: File) => {
    if (!password) return {
        title: "Error Fatal",
        description: "El archivo es requerido",
        duration: 5000
    };
    if (!file) return {
        title: "Error Fatal",
        description: "El archivo es requerido",
        duration: 5000
    };
    return true
}