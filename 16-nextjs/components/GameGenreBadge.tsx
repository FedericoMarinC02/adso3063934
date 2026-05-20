import { getGenreBadgeClassName } from "@/src/lib/game-badges";

export default function GameGenreBadge({
  genre,
  className = "",
}: {
  genre: string;
  className?: string;
}) {
  return (
    <span
      className={`badge border px-3 py-2 font-medium ${getGenreBadgeClassName(genre)} ${className}`.trim()}
    >
      {genre}
    </span>
  );
}
