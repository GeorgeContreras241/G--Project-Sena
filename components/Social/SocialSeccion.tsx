import GitHub from "../ui/icons/GitHub"
import Linkedin from "../ui/icons/LinKedin"
import { ThemeToggle } from "@/components/ui/themeMode/ThemeToogle"

const SeccionSocial = ({className}: {className?: string}) => {
    return (
        <footer className={className}>
            <div className="flex flex-row items-center justify-center gap-2">
                <a href="https://github.com/" target="_blank" title="Github" 
                className="cursor-pointer h-10 w-10 hover:scale-110 transition-all">
                    <GitHub />
                </a>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
                <a href="https://linkedin.com/" target="_blank" title="Linkedin" 
                className="cursor-pointer w-10 h-10 hover:scale-110 transition-all">
                    <Linkedin/>
                </a>
            </div>
            <div className="flex flex-row items-center justify-center gap-2 h-10 w-10">
                <ThemeToggle  className="h-10 w-10"/>
            </div>
        </footer>
    )
}
export default SeccionSocial