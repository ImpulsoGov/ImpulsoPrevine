"use client";
import type React from "react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { SearchContext } from "./context";

export type { SearchModel } from "./context";
export { SearchContext };

type Props = {
    SearchComponent: React.FC<{
        onSearchTriggered: Dispatch<SetStateAction<string>>;
    }>;
};

type WithSearchProps = React.PropsWithChildren<Props>;

export const WithSearch: React.FC<WithSearchProps> = ({
    SearchComponent,
    children,
}) => {
    const [search, setSearch] = useState<string>("");

    return (
        <>
            <SearchComponent onSearchTriggered={setSearch} />
            <SearchContext.Provider
                value={{
                    searchString: search,
                }}
            >
                {children}
            </SearchContext.Provider>
        </>
    );
};
