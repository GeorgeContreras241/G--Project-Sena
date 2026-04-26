import { ReactNode } from "react"

export const Button = ({ children, text, className, handleExport, dataPassword }: { children: ReactNode, text: string, className?: string, handleExport?: () => void }) => {
   
    return (
        <button className={`flex gap-2 items-center bg-primary text-white px-4 py-2 rounded-md border border-border 
        cursor-pointer hover:bg-bg-elevated ${className || ''}`}>
            {children}
            {text}
        </button>
    )
}