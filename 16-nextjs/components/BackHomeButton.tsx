"use client";

import Link from "next/link";
import { ArrowCircleLeft } from "@phosphor-icons/react";

export default function BackHomeButton() {
  return (
    <Link
      href="/"
      className="btn btn-outline btn-primary w-full gap-2 sm:btn-lg"
    >
      <ArrowCircleLeft className="shrink-0" size={28} />
      Back Home
    </Link>
  );
}
