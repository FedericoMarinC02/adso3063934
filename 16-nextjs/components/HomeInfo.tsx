
"use client";

import AuthEntryLink from "@/components/AuthEntryLink";
import { SignIn as SignInIcon, UserPlus } from "@phosphor-icons/react";

export default function HomeInfo() {
  return (
    <div
      className="hero min-h-screen bg-[url('/imgs/bg-home.png')] bg-cover bg-center"
      style={{ backgroundImage: "url('/imgs/bg-home.png')" }}>
      <div className="hero-overlay bg-black/60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-xl">
          <img src="/imgs/logo.png" alt="Logo" className="mx-auto mb-2 h-50 w-auto mix-blend-multiply drop-shadow-lg"/>
          <p className="text-lg leading-relaxed">
            <strong>GameNext.js</strong> is a modern platform to manage and organize videogames. Built with
            Next.js, it uses Prisma, Neon database, and Stack Auth to provide secure authentication, fast
            performance, and scalable data management.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <AuthEntryLink
              href="/handler/sign-in"
              className="btn btn-outline btn-primary"
              markLoginIntent
            >
              <SignInIcon size={32} />
              Sign In
            </AuthEntryLink>

            <AuthEntryLink href="/handler/sign-up" className="btn btn-outline btn-primary">
              <UserPlus size={32} />
              Sign Up
            </AuthEntryLink>
          </div>
        </div>
      </div>
    </div>
  );
}