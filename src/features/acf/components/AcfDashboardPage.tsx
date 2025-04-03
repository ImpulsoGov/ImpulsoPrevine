import { ErrorPage } from "./ErrorPage";
import { SessionGuard } from "@/common/components/SessionGuard";
import { AllowProfileWrapper } from "./AllowProfileWrapper";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";

export const AcfDashboardPage = async ({
    searchParams,
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {
    const session = (await getServerSession(nextAuthOptions)) as Session;
    return <SessionGuard error={<ErrorPage />} session={session}>
        <AllowProfileWrapper session={session} searchParams={searchParams} />
    </SessionGuard>;
};
