import type React from "react";
type Props = {
    searchParams: Promise<{
        [key: string]: string | undefined;
    }>;
};
export const SearchPlusPage: React.FC<Props> = ({ _ }: Props) => {
    return <div>some div</div>;
};
