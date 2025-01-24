import type { Session } from 'next-auth';
import * as Sentry from "@sentry/nextjs";

export const userSetterSentry = (
  session: Session | null
) => {
  if (session?.user) {
    Sentry.setUser({
      id: session.user.id,
      username: session.user.nome,
    });
  } else {
    Sentry.setUser(null);
  }
};