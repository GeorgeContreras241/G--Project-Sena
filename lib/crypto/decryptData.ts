export const decrypt = async (
  key: CryptoKey,
  payload: any
): Promise<any> => {
  
  try {
    // Validar key
    if (!key) {
      throw new Error("Key inválida")
    }

    // Validar payload
    if (!payload) {
      throw new Error("Payload vacío")
    }

    // Validar iv
    if (!payload.iv) {
      throw new Error("IV no encontrado")
    }

    
    // Validar data
    if (!payload.data) {
      throw new Error("Data no encontrada")
    }


    // Validar longitud IV AES-GCM
    if (payload.iv.length !== 12) {
      throw new Error("IV inválido para AES-GCM")
    }

    // Validar contenido data
    if (payload.data.length === 0) {
      throw new Error("Data vacía")
    }

    // Convertimos
    const iv = new Uint8Array(payload.iv)
    const data = new Uint8Array(payload.data)

    // Decrypt
    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv
      },
      key,
      data
    )

    // Decode
    const decoded = new TextDecoder().decode(decrypted)

    // Parse JSON seguro
    let parsedData

    try {
      parsedData = JSON.parse(decoded)
    } catch {
      throw new Error("JSON inválido")
    }

    return {
      status: true,
      data: parsedData
    }

  } catch (error: any) {

    console.error("Decrypt Error:", error)

    return {
      status: false,
      message: {
        title: "Error al descifrar los datos",
        description:
          error?.message || "Datos incorrectos",
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