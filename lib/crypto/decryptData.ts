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
      console.log("Decrypted:", decrypted);
      return JSON.parse(
        new TextDecoder().decode(decrypted)
      )
    } catch (error) {
      console.log("Error:", error);
      return { error }
    }
  }