const sileoWarning = {
    title: "Error Fatal",
    description: "Seguro que desea continuar sin archivo",
    duration: 5000,
    fill: "var(--color-bg-elevated)",
    styles: {
        title: "text-red! font-bold!",
        description: "text-white! text-center!",
    },
    button: {
        onClick: () => {
            console.log("onSuccess");
        },
        title: "Aceptar"
    },
};

const sileoError = {
    title: "Error",
    description: "Error al procesar el archivo",
    duration: 5000,
    fill: "var(--color-bg-elevated)",
    styles: {
        title: "text-red! font-bold!",
        description: "text-white! text-center!",
    },
    button: {
        onClick: () => {
            console.log("onError");
        },
        title: "Aceptar"
    },
};

const sileoSuccess = {
    title: "Éxito",
    description: "Archivo procesado correctamente",
    duration: 5000,
    fill: "var(--color-bg-elevated)",
    styles: {
        title: "text-green! font-bold!",
        description: "text-white! text-center!",
    },
    button: {
        onClick: () => {
            console.log("onSuccess");
        },
        title: "Aceptar"
    },
};

const sileoInfo = {
    title: "Información",
    description: "Información importante",
    duration: 5000,
    fill: "var(--color-bg-elevated)",
    styles: {
        title: "text-blue! font-bold!",
        description: "text-white! text-center!",
    },
    button: {
        onClick: () => {
            console.log("onInfo");
        },
        title: "Aceptar"
    },
};

export { sileoWarning, sileoError, sileoSuccess, sileoInfo };