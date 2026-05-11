import { create } from "zustand" ;

export const useStoragePass = create((set) => ({
    salt: null,
    derivedKey: null,
    loading: false,
    dataPassword: [],
    setDataPassword: (data: object) => set({ dataPassword: [] }),
    setDataPasswordInit: (data: object) => set({ dataPassword: data }),
    setDataPasswordUpdate: (data: object) => set((state: any) => ({ dataPassword: [...state.dataPassword, data] })),
    setDataPasswordEdit: (data: any) => set((state: any) => ({ 
        dataPassword: state.dataPassword.map((item: any) => 
            item.id === data.id ? data : item
        )
    })),
    setDataPasswordFavorite: (id: string) => set((state: any) => ({ 
        dataPassword: state.dataPassword.map((item: any) => 
            item.id === id ? { ...item, favorite: !item.favorite } : item
        )
    })),
    setDataPasswordDelate: (id:string|number) => set((state: any) => ({ dataPassword: state.dataPassword.filter((item:any)=>item.id !== id) })),
    setLoading: (loading: boolean) => set({ loading }),
    setDerivedKey: (key: CryptoKey) => set({ derivedKey: key }),
    setSalt: (salt: Uint8Array) => set({ salt }),
}))
