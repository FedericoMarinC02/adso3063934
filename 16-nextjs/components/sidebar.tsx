"use client";
import Link from "next/link";
import UserMenu from "@/components/UserMenu";
import {
    CirclesFourIcon,
    DesktopTowerIcon,
    GameControllerIcon,
    ListIcon,
    SlidersHorizontalIcon,
} from "@phosphor-icons/react";

export default function SideBar({
    currentPath = "/dashboard",
    children,
}: {
    currentPath: string;
    children: React.ReactNode;
}) {
    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: CirclesFourIcon },
        { name: "Games", href: "/games", icon: GameControllerIcon },
        { name: "Consoles", href: "/consoles", icon: DesktopTowerIcon },
        { name: "Settings", href: "/settings", icon: SlidersHorizontalIcon },
    ];
    return (
        <div className="drawer lg:drawer-open min-h-screen">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content min-h-screen">
                <nav className="navbar sticky top-0 z-40 mt-2 min-h-[4.25rem] w-full rounded-b-[1.5rem] border border-slate-800 bg-slate-950 px-2 shadow-[0_18px_48px_rgba(2,6,23,0.28)] sm:mt-3 sm:min-h-[4.75rem] sm:px-3 lg:mt-0 lg:rounded-none lg:border-x-0 lg:border-t-0">
                    <label
                        htmlFor="my-drawer-4"
                        aria-label="open sidebar"
                        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-cyan-100 lg:hidden"
                    >
                        <ListIcon className="size-5" weight="duotone" />
                    </label>
                    <div className="flex min-w-0 items-center gap-2 px-2 sm:gap-3 sm:px-4">
                        <div className="flex size-10 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/10 text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:size-11">
                            <GameControllerIcon size={22} weight="duotone" />
                        </div>
                        <div className="min-w-0 leading-tight">
                            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/35 sm:text-[0.68rem] sm:tracking-[0.28em]">
                                Control Center
                            </p>
                            <p className="truncate text-xs font-medium text-white/90 sm:text-sm">
                                GameNext.js
                            </p>
                        </div>
                    </div>
                    <div className="ms-auto shrink-0">
                        <UserMenu />
                    </div>
                </nav>
                <div className="p-3 pt-5 sm:p-4 sm:pt-6">{children}</div>
            </div>

            <div className="drawer-side z-[60] is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start border-r border-slate-800 bg-slate-950 px-3 py-4 shadow-[24px_0_60px_rgba(2,6,23,0.24)] transition-all duration-300 is-drawer-close:w-20 is-drawer-open:w-72">
                    <div className="mb-5 flex w-full items-center rounded-[1.5rem] border border-slate-800 bg-slate-900 px-3 py-3 is-drawer-close:min-h-0 is-drawer-close:justify-center is-drawer-close:border-transparent is-drawer-close:bg-transparent is-drawer-close:px-0 is-drawer-close:py-0">
                        <div className="min-w-0 is-drawer-close:hidden">
                            <p className="truncate text-sm font-semibold text-white/90">GameNext.js</p>
                            <p className="truncate text-xs uppercase tracking-[0.24em] text-white/35">Library panel</p>
                        </div>
                    </div>
                    <div className="menu flex w-full grow flex-col items-center gap-3 space-y-0 is-drawer-open:items-stretch">
                        {navigation.map((item, key) => {
                            const IconComponent = item.icon;
                            const isActive = currentPath === item.href;
                            return (
                                <Link
                                    href={item.href}
                                    key={key}
                                    title={item.name}
                                    aria-label={item.name}
                                    className={`sidebar-tooltip group relative flex w-full items-center gap-x-3 overflow-visible rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-300 is-drawer-close:h-14 is-drawer-close:w-14 is-drawer-close:justify-center is-drawer-close:px-0 is-drawer-close:py-0 ${isActive
                                        ? "border border-cyan-300/20 bg-cyan-300/10 text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                                        : "border border-transparent text-white/72 hover:-translate-y-0.5 hover:border-white/10 hover:bg-white/[0.045] hover:text-white"
                                        }`}
                                >
                                    <span className={`absolute inset-y-2 left-0 w-1 rounded-full transition-all duration-300 is-drawer-close:hidden ${isActive ? "bg-cyan-200/80 opacity-100" : "opacity-0 group-hover:opacity-60"}`} />
                                    <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${isActive ? "bg-white/[0.06] text-cyan-100" : "bg-white/[0.03] text-white/60 group-hover:bg-white/[0.06] group-hover:text-white/90"}`}>
                                        <IconComponent className="size-5" weight={isActive ? "duotone" : "regular"} />
                                    </span>
                                    <span className="is-drawer-close:hidden">{item.name}</span>
                                    <span className="sidebar-tooltip-bubble pointer-events-none absolute left-[calc(100%+0.9rem)] top-1/2 z-[80] hidden -translate-y-1/2 -translate-x-2 rounded-2xl border border-cyan-300/15 bg-slate-950/92 px-3 py-2 text-xs font-semibold tracking-[0.18em] whitespace-nowrap uppercase text-cyan-50 opacity-0 shadow-[0_18px_50px_rgba(2,6,23,0.42)] backdrop-blur-xl transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100 is-drawer-open:hidden lg:block">
                                        {item.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
