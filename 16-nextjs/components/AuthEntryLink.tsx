'use client';

import Link from "next/link";
import { ReactNode } from "react";

interface AuthEntryLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
  markLoginIntent?: boolean;
}

export default function AuthEntryLink({
  href,
  className,
  children,
  markLoginIntent = false,
}: AuthEntryLinkProps) {
  const handleClick = () => {
    if (markLoginIntent) {
      sessionStorage.setItem("play-login-video", "1");
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
