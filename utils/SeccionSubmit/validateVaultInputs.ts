export const validateVaultInputs = (password: string, file: File) => {
    if (!password) return {
        title: "Error Fatal",
        description: "La contraseña es requerida",
        duration: 5000,
        fill: "var(--color-bg-elevated)",
        styles: {
            title: "text-red! font-bold!",
            description: "text-white! text-center!",
        }
    };
    if (!file) return {
        title: "Error Fatal",
        description: "El archivo es requerido",
        duration: 5000,
        fill: "var(--color-bg-elevated)",
        styles: {
            title: "text-red! font-bold!",
            description: "text-white! text-center!",
        }
    };
    return true
}