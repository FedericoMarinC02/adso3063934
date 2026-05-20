"use client";

import Link from "next/link";
import { ArrowCircleLeft } from "@phosphor-icons/react";

export default function BackHomeButton() {
  return (
    <Link href="/" className="btn btn-outline btn-primary gap-2">
      <ArrowCircleLeft size={32} />
      Go to Welcome
    </Link>
  );
}
