function CheckIcon() {
  return (
    <svg
      className="mt-1 h-4 w-4 shrink-0 text-gold"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 10l4 4 8-8" />
    </svg>
  );
}

export default function IncludesList({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-gray-400">
          <CheckIcon />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
