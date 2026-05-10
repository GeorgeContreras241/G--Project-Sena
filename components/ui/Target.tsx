export const Target = ({text}: {text: string}) => {
    return (
        <article className="border border-black dark:border-gray-700 bg-neutral-900 dark:bg-gray-800 text-white rounded-lg py-2 
        text-[0.85rem] md:text-sm md:px-4 md:py-5
        cursor-pointer hover:bg-neutral-800 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-200">
            {text}
        </article>
    );
};