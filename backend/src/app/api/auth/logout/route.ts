import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { sessionMiddleware } from "@/lib/session";

export async function GET(req: any) {
  // Run session middleware at runtime
  await new Promise((resolve) => sessionMiddleware(req as any, {} as any, resolve));

  // Logout safely
  if (typeof req.logout === "function") {
    req.logout(() => {
      if (req.session) {
        req.session.destroy(() => {});
      }
    });
  }

  return NextResponse.json({ message: "Logged out" });
}
