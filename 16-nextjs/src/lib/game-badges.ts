const genreColorMap: Record<string, string> = {
  racing: "border-amber-400/35 bg-amber-400/15 text-amber-100",
  "action-adventure": "border-red-400/35 bg-red-400/15 text-red-100",
  "action role-playing": "border-fuchsia-400/35 bg-fuchsia-400/15 text-fuchsia-100",
  "role-playing": "border-violet-400/35 bg-violet-400/15 text-violet-100",
  "first-person shooter": "border-orange-400/35 bg-orange-400/15 text-orange-100",
  "third-person shooter": "border-orange-400/35 bg-orange-400/15 text-orange-100",
  action: "border-rose-400/35 bg-rose-400/15 text-rose-100",
  platformer: "border-yellow-300/35 bg-yellow-300/15 text-yellow-100",
  simulation: "border-cyan-400/35 bg-cyan-400/15 text-cyan-100",
  sports: "border-lime-400/35 bg-lime-400/15 text-lime-100",
  fighting: "border-red-500/35 bg-red-500/15 text-red-100",
  survival: "border-stone-300/35 bg-stone-300/15 text-stone-100",
  "survival horror": "border-red-500/35 bg-red-500/15 text-red-100",
  roguelike: "border-indigo-400/35 bg-indigo-400/15 text-indigo-100",
  puzzle: "border-sky-300/35 bg-sky-300/15 text-sky-100",
  adventure: "border-teal-400/35 bg-teal-400/15 text-teal-100",
  photography: "border-pink-400/35 bg-pink-400/15 text-pink-100",
  fitness: "border-emerald-400/35 bg-emerald-400/15 text-emerald-100",
  party: "border-pink-400/35 bg-pink-400/15 text-pink-100",
  metroidvania: "border-indigo-400/35 bg-indigo-400/15 text-indigo-100",
  "real-time strategy": "border-blue-400/35 bg-blue-400/15 text-blue-100",
  "tactical role-playing": "border-purple-400/35 bg-purple-400/15 text-purple-100",
  "tactical strategy": "border-purple-400/35 bg-purple-400/15 text-purple-100",
  "rhythm action": "border-pink-500/35 bg-pink-500/15 text-pink-100",
  "rhythm adventure": "border-pink-500/35 bg-pink-500/15 text-pink-100",
  "first-person adventure": "border-teal-400/35 bg-teal-400/15 text-teal-100",
};

const consoleColorMap: Record<string, string> = {
  "playstation 5": "border-blue-400/35 bg-blue-400/15 text-blue-100",
  "xbox series x": "border-emerald-400/35 bg-emerald-400/15 text-emerald-100",
  "nintendo switch oled model": "border-rose-400/35 bg-rose-400/15 text-rose-100",
  "nintendo switch 2": "border-red-400/35 bg-red-400/15 text-red-100",
  "steam deck oled": "border-slate-300/35 bg-slate-300/15 text-slate-100",
};

const defaultBadgeColor = "border-white/15 bg-white/8 text-white/85";

export function getGenreBadgeClassName(genre: string) {
  return genreColorMap[genre.trim().toLowerCase()] ?? defaultBadgeColor;
}

export function getConsoleBadgeClassName(consoleName: string) {
  return consoleColorMap[consoleName.trim().toLowerCase()] ?? defaultBadgeColor;
}
