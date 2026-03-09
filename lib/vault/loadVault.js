
export const loadVault = async({file,setLoading})=> {
    setLoading(true);
    try {
        // transformamos file a array buffer
        const fileArrayBuffer = await file?.arrayBuffer();
        // transformamos array buffer a Uint8Array
        const fileBuffer = new Uint8Array(fileArrayBuffer);
        // extraer salt, iv y data
        const salt = fileBuffer.slice(0, 16);
        const iv = fileBuffer.slice(16, 28);
        const data = fileBuffer.slice(28);
        const payload = { iv, data };
        // Derivavos la key con el salt extraido de vault
        const key = await deriveKey(password, new Uint8Array(salt));

        return { key, payload };
    } catch (error) {
        console.error(error)
    }finally{
        setLoading(false);
    }
}