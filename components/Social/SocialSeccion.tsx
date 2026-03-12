import GitHub from "../ui/icons/GitHub"
import Linkedin from "../ui/icons/LinKedin"

const SeccionSocial = ({className}: {className?: string}) => {
    return (
        <footer className={className}>
            <div className="flex flex-row items-center justify-center gap-2">
                <a href="https://github.com/" target="_blank" title="Github" 
                className="cursor-pointer h-12 w-12 hover:scale-110 transition-all">
                    <GitHub />
                </a>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
                <a href="https://linkedin.com/" target="_blank" title="Linkedin" 
                className="cursor-pointer w-12 h-12 hover:scale-110 transition-all">
                    <Linkedin/>
                </a>
            </div>
        </footer>
    )
}
export default SeccionSocial