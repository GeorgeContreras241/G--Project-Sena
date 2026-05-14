import { create } from "zustand" ;
import type { PassStorage, dataPassword } from "@/types";

export const useStoragePass = create<PassStorage>((set) => ({
    salt: null,
    derivedKey: null,
    loading: false,
    dataPassword: [],
    setDataPassword: () => set({ dataPassword: [] }),
    setDataPasswordInit: (data: dataPassword[]) => set({ dataPassword: data }),
    setDataPasswordUpdate: (data: dataPassword) => set((state: any) => ({ dataPassword: [...state.dataPassword, data] })),
    setDataPasswordEdit: (data: dataPassword) => set((state: any) => ({ 
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
