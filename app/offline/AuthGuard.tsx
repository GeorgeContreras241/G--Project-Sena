"use client"
import { useState } from "react"
import { ActionSubmit } from "@/components/SeccionSubmit/ActionSubmit";

export const AuthGuard = ({ children }) => {
    const [isUnLocked, setIsUnLocked] = useState(false)

    if (!isUnLocked) {
        return (
            <section className="grid place-items-center h-dvh w-full px-2">
                <ActionSubmit onSuccess={() => setIsUnLocked(true)} />
            </section>
        )
    }

    return (
        <>
            {children}
        </>
    )
}