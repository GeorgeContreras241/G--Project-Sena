import { create } from "zustand" ;

export const useStoragePass = create((set) => ({
    salt: null,
    derivedKey: null,
    loading: false,
    dataPassword: null,
    setDataPassword: (data: object) => set({ dataPassword: data }),
    setLoading: (loading: boolean) => set({ loading }),
    setDerivedKey: (key: CryptoKey) => set({ derivedKey: key }),
    setSalt: (salt: Uint8Array) => set({ salt }),
}))
