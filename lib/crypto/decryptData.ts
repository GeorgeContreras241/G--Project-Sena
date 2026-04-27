export const decrypt = async (key: CryptoKey, payload: any): Promise<any> => {
  try {
    const iv = new Uint8Array(payload.iv)
    const data = new Uint8Array(payload.data)
    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv
      },
      key,
      data
    )
    return {
      status: true, data: JSON.parse(new TextDecoder().decode(decrypted)) 
    }
    
  } catch (error) {
    return {
      status: false, message: {
        title: "Error al descifrar los datos",
        description: "Datos incorrectos",
        duration: 5000,
        fill: "var(--color-bg-elevated)",
        styles: {
            title: "text-red! font-bold!",
            description: "text-white! text-center!",
        } 
      }
    }
  }
}