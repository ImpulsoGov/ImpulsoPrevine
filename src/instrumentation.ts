import * as Sentry from "@sentry/nextjs";
import { registerOTel } from "@vercel/otel";
export async function register() {
    registerOTel({ serviceName: "impulso-previne" });
    if (process.env.NEXT_RUNTIME === "nodejs") {
        await import("../sentry.server.config");
    }

    if (process.env.NEXT_RUNTIME === "edge") {
        await import("../sentry.edge.config");
    }
}

export const onRequestError = Sentry.captureRequestError;
