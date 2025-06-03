"use client";
import type React from "react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { SearchContext } from "./context";

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
                    search: search,
                    onSearchChange: setSearch,
                }}
            >
                {children}
            </SearchContext.Provider>
        </>
    );
};
