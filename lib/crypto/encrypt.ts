export const encrypt = async (key: CryptoKey, data: any) => {

    const iv = crypto.getRandomValues(new Uint8Array(12))

    const encoded = new TextEncoder().encode(JSON.stringify(data))

    const ciphertext = await crypto.subtle.encrypt({
        name: "AES-GCM",
        iv: iv
    }, key, encoded)

    return {
        iv: [...iv],
        data: [...new Uint8Array(ciphertext)]
    }
}
