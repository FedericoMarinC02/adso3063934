import "server-only";

import { getStackServerApp } from "@/stack/server";

export async function getCurrentUser() {
  try {
    const stackServerApp = getStackServerApp();

    if (!stackServerApp) {
      return null;
    }

    return await stackServerApp.getUser();
  } catch (error) {
    console.error("Stack Auth getUser error:", error);
    return null;
  }
}
