export function FaqList({ items }: { items: [string, string][] }) {
  return (
    <div className="border-t border-ink">
      {items.map(([q, a]) => (
        <details key={q} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-xl font-bold leading-snug [&::-webkit-details-marker]:hidden">
            {q}
            <span
              aria-hidden="true"
              className="relative h-6 w-6 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-0.5 before:w-full before:bg-ink after:absolute after:left-1/2 after:top-0 after:h-full after:w-0.5 after:bg-ink after:transition-transform group-open:after:scale-y-0"
            />
          </summary>
          <p className="max-w-2xl pb-6 text-ink-soft">{a}</p>
        </details>
      ))}
    </div>
  );
}
