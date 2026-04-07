import { create } from "zustand" ;

export const useStoragePass = create((set) => ({
    salt: null,
    derivedKey: null,
    loading: false,
    dataPassword: null,
    setDataPasswordInit: (data: object) => set({ dataPassword: data }),
    setDataPasswordUpdate: (data: object) => set((state: any) => ({ dataPassword: [...state.dataPassword, data] })),
    setDataPasswordDelate: (id:string|number) => set((state: any) => ({ dataPassword: state.dataPassword.filter((item:any)=>item.id !== id) })),
    setLoading: (loading: boolean) => set({ loading }),
    setDerivedKey: (key: CryptoKey) => set({ derivedKey: key }),
    setSalt: (salt: Uint8Array) => set({ salt }),
}))
