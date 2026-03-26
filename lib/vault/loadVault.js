export const loadVault = async ({ file }) => {
    try {
        // transformamos file a array buffer
        const fileArrayBuffer = await file?.arrayBuffer();
        // transformamos array buffer a Uint8Array
        const fileBuffer = new Uint8Array(fileArrayBuffer);
        // extraer salt, iv y data
        const salt = fileBuffer.slice(0, 16);
        const iv = fileBuffer.slice(16, 28);
        const data = fileBuffer.slice(28);

        return { state: true, salt, iv, data };
    } catch (error) {
        console.error(error)
        return { state: false, error };
    }
}
