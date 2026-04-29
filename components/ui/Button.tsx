import { ReactNode } from "react"

export const Button = ({ children, text, className, handleExport, dataPassword }: { children: ReactNode, text: string, className?: string, handleExport?: () => void }) => {
   
    return (
        <button className={`flex gap-2 items-center bg-primary dark:bg-gray-700 text-white px-4 py-2 rounded-md border border-border dark:border-gray-600 
        cursor-pointer hover:bg-bg-elevated dark:hover:bg-gray-600 ${className || ''}`}>
            {children}
            {text}
        </button>
    )
}