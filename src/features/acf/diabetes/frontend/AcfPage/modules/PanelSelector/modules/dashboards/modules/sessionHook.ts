import type { Session } from "next-auth";

export const sessionHook = async (
    user: Session["user"] | undefined,
    setUser: React.Dispatch<React.SetStateAction<Session["user"] | undefined>>
) => {
    setUser(user);
};
