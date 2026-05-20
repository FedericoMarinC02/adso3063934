import { getConsoleBadgeClassName } from "@/src/lib/game-badges";

export default function GameConsoleBadge({
  consoleName,
  className = "",
}: {
  consoleName: string;
  className?: string;
}) {
  return (
    <span
      className={`badge border px-3 py-2 font-medium ${getConsoleBadgeClassName(consoleName)} ${className}`.trim()}
    >
      {consoleName}
    </span>
  );
}
