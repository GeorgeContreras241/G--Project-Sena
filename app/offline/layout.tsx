"use client"
import { Exit } from "@/components/ui/exit"
import { LocalProvider } from "@/context/localProvider"

const OfflineLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <section className="flex flex-col">
            <Exit />
            <LocalProvider>
                <main>
                    {children}
                </main>
            </LocalProvider>
        </section>
    )
}

export default OfflineLayout