import { StackHandler } from "@stackframe/stack";
import BackHomeButton from "@/components/BackHomeButton";
import { getStackServerApp } from "@/stack/server";

type StackRouteProps = {
  params: Promise<{ stack?: string[] }> | { stack?: string[] };
  searchParams: Promise<Record<string, string>> | Record<string, string>;
};

export default function StackRouteHandler(props: StackRouteProps) {
  const stackServerApp = getStackServerApp();

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[url('/imgs/bg-home.png')] bg-cover bg-center"
      style={{ backgroundImage: "url('/imgs/bg-home.png')" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-black/60" />
      <div className="relative z-[1] flex min-h-screen w-full flex-1 items-center justify-center px-4 py-10 text-neutral-content sm:px-6">
        <div className="stack-auth-card flex w-full max-w-[22rem] flex-col gap-6 rounded-2xl border border-white/10 bg-black/45 p-5 shadow-2xl backdrop-blur-md sm:max-w-sm sm:p-6">
          {stackServerApp ? (
            <StackHandler
              app={stackServerApp}
              routeProps={props}
              fullPage={false}
            />
          ) : (
            <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
              Missing Stack Auth server configuration. Add
              {" "}
              <code>STACK_SECRET_SERVER_KEY</code>
              {" "}
              in Vercel before using this page.
            </div>
          )}
          <div className="border-t border-white/10 pt-2">
            <BackHomeButton />
          </div>
        </div>
      </div>
    </div>
  );
}
