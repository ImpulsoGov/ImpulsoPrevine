import { ErrorPage } from "./ErrorPage";
import { SessionGuard } from "@/common/components/SessionGuard";
import { AllowProfileWrapper } from "./AllowProfileWrapper";

export const AcfDashboardPage = async ({
    searchParams,
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {
    return <SessionGuard error={<ErrorPage />} Children={AllowProfileWrapper} searchParams={searchParams}/>
};
