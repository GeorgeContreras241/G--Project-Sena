"use client"
import { Exit } from "@/components/ui/exit"
import { LocalProvider } from "@/context/localProvider"
import { Toaster } from "sileo"

const OfflineLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <section className="flex flex-col">
            <LocalProvider>
                <main>
                    {children}
                </main>
            </LocalProvider>
            <Toaster position="top-center"/>
        </section>
    )
}

export default OfflineLayout