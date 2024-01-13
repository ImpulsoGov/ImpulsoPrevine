import { wrapApiHandlerWithSentry } from "@sentry/nextjs";
// A faulty API route to test Sentry's error monitoring
function handler(_req, res) {
  throw new Error("Sentry Example API Route Error");
  res.status(200).json({ name: "John Doe" });
}

export default wrapApiHandlerWithSentry(handler, "/sentry-example-api");
