import type { PasswordEntry } from "@/types";

export type EncryptResult = {
   iv: number[];
   data: number[];
};

export const encrypt = async (
   key: CryptoKey,
   data: PasswordEntry[]
): Promise<EncryptResult> => {

   if (!crypto?.subtle) {
      throw new Error("Web Crypto API no soportada");
   }

   if (!key) {
      throw new Error("La key es requerida");
   }
   console.log("clave derivada", key);
   try {

      // IV recomendado para AES-GCM
      const iv = crypto.getRandomValues(new Uint8Array(12));

      // Convertimos el objeto a bytes
      const encodedData = new TextEncoder().encode(
         JSON.stringify(data)
      );

      // Encriptamos
      const encryptedBuffer = await crypto.subtle.encrypt(
         {
            name: "AES-GCM",
            iv
         },
         key,
         encodedData
      );

      // Convertimos ArrayBuffer -> number[]
      const encryptedArray = Array.from(
         new Uint8Array(encryptedBuffer)
      );

      return {
         iv: Array.from(iv),
         data: encryptedArray
      };

   } catch (error) {

      console.error("Error encryptando datos:", error);

      throw new Error("No se pudieron encryptar los datos");
   }
};