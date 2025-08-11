import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import { sessionMiddleware } from "@/lib/session";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

router
  .use(async (req, event, next) => {
    await new Promise((resolve) => sessionMiddleware(req as any, {} as any, resolve));
    await next();
  })
  .get((req: any) => {
    req.logout(() => {
      req.session.destroy(() => {});
    });
    return NextResponse.json({ message: "Logged out" });
  });

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
