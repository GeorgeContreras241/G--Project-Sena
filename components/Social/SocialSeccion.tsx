import GitHub from "../ui/icons/GitHub";
import Linkedin from "../ui/icons/LinKedin";
import { ThemeToggle } from "@/components/ui/themeMode/ThemeToogle";

type SeccionSocialProps = {
  className?: string;
};

const SeccionSocial = ({ className }: SeccionSocialProps) => {
  return (
    <footer
      className={
        className ??
        "vault-panel flex w-full items-center justify-between gap-4 rounded-2xl px-4 py-3 md:px-6"
      }
      aria-label="Enlaces y preferencias"
    >
      <p className="hidden text-[0.65rem] font-medium tracking-widest text-zinc-500 uppercase sm:block dark:text-zinc-500">
        ClaveVault · local first
      </p>

      <div className="flex w-full items-center justify-center gap-1 sm:ml-auto sm:w-auto sm:justify-end">
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          className="group flex h-11 w-11 items-center justify-center rounded-xl border border-transparent text-zinc-600 transition-all duration-300 hover:border-vault-amber/30 hover:bg-vault-amber/10 hover:text-vault-amber dark:text-zinc-400"
        >
          <span className="sr-only">GitHub</span>
          <GitHub />
        </a>
        <a
          href="https://linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
          className="group flex h-11 w-11 items-center justify-center rounded-xl border border-transparent text-zinc-600 transition-all duration-300 hover:border-vault-amber/30 hover:bg-vault-amber/10 hover:text-vault-amber dark:text-zinc-400"
        >
          <span className="sr-only">LinkedIn</span>
          <Linkedin />
        </a>
        <div className="ml-1 flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-300/60 dark:border-zinc-700/80">
          <ThemeToggle className="h-8 w-8 text-zinc-700 dark:text-zinc-300" />
        </div>
      </div>
    </footer>
  );
};

export default SeccionSocial;
