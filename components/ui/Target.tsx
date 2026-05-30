export const Target = ({ text }: { text: string }) => {
  return (
    <article
      className="group relative flex min-h-[2.75rem] items-center justify-center rounded-lg border px-2 py-2 text-center transition duration-300
      border-zinc-700/80 bg-zinc-900/40 hover:border-vault-amber/35 bg-vault-amber/5 sm:min-h-[3rem] sm:px-3"
    >
      <span className="text-[0.58rem] font-medium leading-tight tracking-wide transition-colors duration-300 group-hover:text-vault-amber-dim text-zinc-300 group-hover:text-vault-amber sm:text-[0.65rem]">
        {text}
      </span>
      <span
        className="pointer-events-none absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-vault-amber transition-all duration-300 group-hover:w-[70%]"
        aria-hidden="true"
      />
    </article>
  );
};
