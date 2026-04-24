// contextp gloabl ts pendiente
"use client";
import { createContext } from "react";

export const CloudContext = createContext<{}>(null!);

export const CloudProvider = ({children}: {children: React.ReactNode})=> {
    return(
        <CloudContext value={{}}>
            {children}
        </CloudContext>
    )
}