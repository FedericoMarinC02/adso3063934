export default function DeleteIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M10 11v6m4-6v6M5 7l1 12a1 1 0 0 0 1 .9h10a1 1 0 0 0 1-.9L19 7m-6-3v3m-2-3h4" />
    </svg>
  );
}
