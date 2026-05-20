import "server-only";

import { StackServerApp } from "@stackframe/stack";
import { stackOptions } from "./shared";

let app: StackServerApp | null | undefined;

export function getStackServerApp() {
  if (app !== undefined) {
    return app;
  }

  if (!process.env.STACK_SECRET_SERVER_KEY) {
    console.error(
      "Missing STACK_SECRET_SERVER_KEY. Configure it in Vercel project environment variables.",
    );
    app = null;
    return app;
  }

  app = new StackServerApp(stackOptions);
  return app;
}
