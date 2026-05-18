export const Target = ({text}: {text: string}) => {
    return (
        <article className="border border-white/20 dark:border-white/10 bg-white/5 dark:bg-white/5 text-black/90 dark:text-white/80 
        rounded-full px-3 py-1.5 text-[0.7rem] md:text-xs md:px-4 md:py-2
        cursor-pointer hover:bg-white/10 dark:hover:bg-white/10 hover:border-white/40 dark:hover:border-white/20 
        hover:scale-105 transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md">
            {text}
        </article>
    );
};