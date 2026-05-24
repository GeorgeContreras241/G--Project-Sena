import { create } from "zustand";
import type { PassStorage, PasswordEntry } from "@/types";

export const useStoragePass = create<PassStorage>((set) => ({
  salt: null,
  derivedKey: null,
  loading: false,
  dataPassword: [],
  setDataPassword: () => set({ dataPassword: [] }),
  setDataPasswordInit: (data: PasswordEntry[]) => set({ dataPassword: data }),
  setDataPasswordUpdate: (data) =>
    set((state) => ({ dataPassword: [...state.dataPassword, data] })),
  setDataPasswordEdit: (data) =>
    set((state) => ({
      dataPassword: state.dataPassword.map((item) =>
        item.id === data.id ? data : item,
      ),
    })),
  setDataPasswordFavorite: (id) =>
    set((state) => ({
      dataPassword: state.dataPassword.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item,
      ),
    })),
  setDataPasswordDelate: (id) =>
    set((state) => ({
      dataPassword: state.dataPassword.filter((item) => item.id !== id),
    })),
  setLoading: (loading) => set({ loading }),
  setDerivedKey: (key) => set({ derivedKey: key }),
  setSalt: (salt) => set({ salt }),
}));
