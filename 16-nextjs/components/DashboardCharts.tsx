"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type StatCard = {
  label: string;
  value: string;
  help: string;
};

type GenreDatum = {
  name: string;
  value: number;
};

type ConsoleDatum = {
  name: string;
  games: number;
  releaseYear: number;
};

type TimelineDatum = {
  year: string;
  games: number;
};

type DashboardChartsProps = {
  userName: string;
  stats: StatCard[];
  genreData: GenreDatum[];
  consoleData: ConsoleDatum[];
  releaseTimeline: TimelineDatum[];
};

const CHART_COLORS = ["#22c55e", "#38bdf8", "#f59e0b", "#f43f5e", "#a78bfa", "#14b8a6"];
const CONSOLE_CHART_COLORS: Record<string, string> = {
  "playstation 5": "#60a5fa",
  "xbox series x": "#34d399",
  "nintendo switch oled model": "#fb7185",
  "nintendo switch 2": "#f87171",
  "steam deck oled": "#cbd5e1",
};

function getConsoleChartColor(consoleName: string) {
  return CONSOLE_CHART_COLORS[consoleName.trim().toLowerCase()] ?? "#84cc16";
}

export default function DashboardCharts({
  userName,
  stats,
  genreData,
  consoleData,
  releaseTimeline,
}: DashboardChartsProps) {
  const [consoleLimit, setConsoleLimit] = useState<3 | 5 | 8>(5);
  const [genreView, setGenreView] = useState<"pie" | "bar">("pie");

  const visibleConsoles = consoleData.slice(0, consoleLimit);

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-6 py-8 shadow-2xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200/55">
              Welcome back
            </p>
            <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">
              {userName}, your gaming hub is ready.
            </h1>
            <p className="max-w-xl text-sm text-white/65 md:text-base">
              Track releases, review consoles, and keep your library moving with a cleaner
              control center for every session.
            </p>
          </div>

          <div className="min-w-0 text-left lg:text-right">
            <span
              className="text-rotate text-4xl font-black tracking-tight text-cyan-100 sm:text-5xl md:text-6xl"
              style={{ ["--duration" as string]: "12s" }}
            >
              <span className="justify-items-start lg:justify-items-end">
                <span>PLAY MORE</span>
                <span>TRACK RELEASES</span>
                <span>BUILD LIBRARIES</span>
                <span>COMPARE CONSOLES</span>
                <span>MASTER BACKLOGS</span>
                <span>LEVEL UP</span>
              </span>
            </span>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-3xl border border-white/10 bg-base-200/80 p-5 shadow-xl backdrop-blur"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-white/50">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{stat.value}</p>
            <p className="mt-2 text-sm text-white/60">{stat.help}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <article className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-5 shadow-2xl">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-white">Release timeline</h2>
              <p className="text-sm text-white/60">
                Evolution of your catalog by release year
              </p>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={releaseTimeline}>
                <defs>
                  <linearGradient id="releaseFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="year" stroke="#cbd5e1" tickLine={false} axisLine={false} />
                <YAxis allowDecimals={false} stroke="#cbd5e1" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#020617",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "16px",
                    color: "#fff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="games"
                  stroke="#38bdf8"
                  strokeWidth={3}
                  fill="url(#releaseFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-3xl border border-white/10 bg-base-200/80 p-5 shadow-xl">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-white">Genre distribution</h2>
              <p className="text-sm text-white/60">Switch between chart types</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setGenreView("pie")}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  genreView === "pie"
                    ? "bg-cyan-400 text-slate-950"
                    : "bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                Pie
              </button>
              <button
                type="button"
                onClick={() => setGenreView("bar")}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  genreView === "bar"
                    ? "bg-cyan-400 text-slate-950"
                    : "bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                Bar
              </button>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {genreView === "pie" ? (
                <PieChart>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "16px",
                      color: "#fff",
                    }}
                  />
                  <Pie
                    data={genreData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    innerRadius={52}
                    paddingAngle={3}
                  >
                    {genreData.map((entry, index) => (
                      <Cell
                        key={`${entry.name}-${index}`}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              ) : (
                <BarChart data={genreData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="name" stroke="#cbd5e1" tickLine={false} axisLine={false} />
                  <YAxis allowDecimals={false} stroke="#cbd5e1" tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "16px",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                    {genreData.map((entry, index) => (
                      <Cell
                        key={`${entry.name}-${index}`}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-white/10 bg-base-200/80 p-5 shadow-xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-white">Games per console</h2>
            <p className="text-sm text-white/60">
              Interactive ranking of your most populated platforms
            </p>
          </div>
          <div className="flex gap-2">
            {[3, 5, 8].map((limit) => (
              <button
                key={limit}
                type="button"
                onClick={() => setConsoleLimit(limit as 3 | 5 | 8)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  consoleLimit === limit
                    ? "bg-lime-400 text-slate-950"
                    : "bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                Top {limit}
              </button>
            ))}
          </div>
        </div>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={visibleConsoles} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis type="number" allowDecimals={false} stroke="#cbd5e1" tickLine={false} axisLine={false} />
              <YAxis
                type="category"
                dataKey="name"
                width={110}
                stroke="#cbd5e1"
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "16px",
                  color: "#fff",
                }}
                labelStyle={{ color: "#f8fafc" }}
                itemStyle={{ color: "#cbd5e1" }}
              />
              <Bar dataKey="games" radius={[0, 12, 12, 0]}>
                {visibleConsoles.map((consoleItem) => (
                  <Cell
                    key={consoleItem.name}
                    fill={getConsoleChartColor(consoleItem.name)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
