export default function AlertWarningIcon() {
  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-amber-400/35 bg-amber-400/10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        className="h-10 w-10 text-amber-300"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v5m0 3h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
        />
      </svg>
    </div>
  );
}
