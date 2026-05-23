export const Target = ({ text }: { text: string }) => {
    return (
        <article className="group relative inline-flex items-center justify-center px-3 py-2 text-[0.65rem] font-semibold tracking-[0.25em] 
        text-black dark:text-white transition duration-300 outline-none hover:text-blue-900 dark:hover:text-blue-400 focus-visible:text-blue-900 
        dark:focus-visible:text-blue-400 sm:px-4 sm:text-xs cursor-pointer">
            {text}
            <span className="pointer-events-none absolute inset-x-3 -bottom-px h-px origin-center scale-x-0 bg-blue-900 dark:bg-blue-400 
            transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 sm:inset-x-4 text-center"></span>
        </article>
    );
};