"use client";
import type { Session } from "next-auth";

export const Auth = ({
	children,
	setStatus,
	session,
}: Readonly<{
	children: React.ReactNode;
	setStatus: any;
	session: Session | null;
}>) => {
	setStatus(session);
	if (!session) {
		return <div>Loading...</div>;
	}
	return children;
};
