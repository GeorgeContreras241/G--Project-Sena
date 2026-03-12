
export const buildVaultFile = (salt, iv, data) => {
    const buffer = new Uint8Array(
      salt.length + iv.length + data.length
    )
  
    buffer.set(salt, 0)
    console.log("salt del archivo:" ,salt)
    buffer.set(iv, 16)
    buffer.set(data, 28)
  
    return buffer
  }