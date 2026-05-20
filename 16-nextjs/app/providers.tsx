import { StackProvider, StackTheme, type StackServerApp } from "@stackframe/stack";
import { getStackServerApp } from "@/stack/server";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const stackServerApp = getStackServerApp() as StackServerApp<true> | null;

  if (!stackServerApp) {
    return <>{children}</>;
  }

  return (
    <StackProvider app={stackServerApp}>
      <StackTheme>{children}</StackTheme>
    </StackProvider>
  );
}
