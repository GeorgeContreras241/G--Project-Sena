export async function decrypt(key: CryptoKey, payload: any) {

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

  return JSON.parse(
    new TextDecoder().decode(decrypted)
  )
}