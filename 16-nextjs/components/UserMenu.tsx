'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { UserAvatar, useUser } from "@stackframe/stack";
import { GearSixIcon, SignOutIcon } from "@phosphor-icons/react";

export default function UserMenu() {
  const user = useUser();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setOpen(false);

    if (user) {
      await user.signOut();
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`flex max-w-[13.5rem] items-center gap-2 rounded-full border px-1.5 py-1.5 transition-all duration-300 sm:max-w-none sm:gap-3 ${
          open
            ? "border-cyan-300/25 bg-slate-900 shadow-[0_10px_30px_rgba(34,211,238,0.08)]"
            : "border-slate-800 bg-slate-900 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-900"
        }`}
      >
        <UserAvatar
          size={40}
          user={{
            displayName: user?.displayName ?? null,
            primaryEmail: user?.primaryEmail ?? null,
            profileImageUrl: user?.profileImageUrl ?? null,
          }}
        />
        <div className="hidden min-w-0 pr-2 text-left sm:block">
          <p className="max-w-36 truncate text-sm font-medium text-white/90">
            {user?.displayName || "User"}
          </p>
          <p className="max-w-36 truncate text-xs text-white/45">
            {user?.primaryEmail || "Signed in"}
          </p>
        </div>
      </button>

      {open ? (
        <div className="animate-menu-fade absolute right-0 top-[calc(100%+0.9rem)] z-50 w-[min(20rem,calc(100vw-1.5rem))] rounded-[1.75rem] border border-slate-800 bg-slate-950 p-3 shadow-[0_24px_60px_rgba(2,6,23,0.45)] sm:w-80">
          <div className="mb-3 flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 px-3 py-3">
            <UserAvatar
              size={44}
              user={{
                displayName: user?.displayName ?? null,
                primaryEmail: user?.primaryEmail ?? null,
                profileImageUrl: user?.profileImageUrl ?? null,
              }}
            />
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-white">
                {user?.displayName || "User"}
              </p>
              <p className="truncate text-sm text-white/60">
                {user?.primaryEmail || ""}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-white/86 transition-all duration-300 hover:bg-slate-900"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-white/70 transition-all duration-300 group-hover:bg-cyan-300/10 group-hover:text-cyan-100">
                <GearSixIcon size={18} weight="duotone" />
              </span>
              <span>Account settings</span>
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-white/86 transition-all duration-300 hover:bg-slate-900"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-white/70 transition-all duration-300 group-hover:bg-rose-400/10 group-hover:text-rose-200">
                <SignOutIcon size={18} weight="duotone" />
              </span>
              <span>Sign out</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
