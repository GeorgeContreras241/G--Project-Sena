"use client"
import { Exit } from "@/components/ui/exit"
import VaultProvider from "@/context/VaultProvider"

const OfflineLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <section className="flex flex-col">
            <Exit />
            <VaultProvider>
                <main>
                    {children}
                </main>
            </VaultProvider>
        </section>
    )
}

export default OfflineLayout