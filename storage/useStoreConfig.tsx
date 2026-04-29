// contexto global ts pendiente
"use client";
import { create } from "zustand";

export const useStoreConfig = create((set) => ({
    theme: null,
    mode: null,
    seccion: null,
    setTheme: (payload: string) => set({ theme : payload})
}));