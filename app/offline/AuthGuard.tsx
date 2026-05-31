"use client"
import { ReactNode, useContext } from "react"
import { ActionSubmit } from "@/components/SeccionSubmit/ActionSubmit";
import { LocalContext } from "@/context/localProvider";

export const AuthGuard = ({ children }: { children: ReactNode }) => {
    const localContext = useContext(LocalContext);
    const { isUnLocked, setIsUnLocked } = localContext || { isUnLocked: false, setIsUnLocked: () => {} };

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

// Este 

