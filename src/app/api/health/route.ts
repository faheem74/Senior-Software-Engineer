import { ok } from "@/lib/api";
import { isMongoConfigured } from "@/lib/db";
import { isEmailConfigured } from "@/lib/email";
import { isAiConfigured } from "@/lib/ai";

export async function GET() {
  return ok({
    status: "ok",
    timestamp: new Date().toISOString(),
    services: {
      mongodb: isMongoConfigured() ? "configured" : "seed-fallback",
      email: isEmailConfigured() ? "configured" : "disabled",
      ai: isAiConfigured() ? "configured" : "faq-fallback",
    },
  });
}
