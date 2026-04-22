"use client"
import React, { createContext, useRef } from "react"

export const VaultContext = createContext(null)

const VaultProvider = ({ children }: { children: React.ReactNode }) => {
    const keyRef = useRef(null)
    return (
        <VaultContext value={{keyRef}}>
            {children}
        </VaultContext>
    )
}
export default VaultProvider