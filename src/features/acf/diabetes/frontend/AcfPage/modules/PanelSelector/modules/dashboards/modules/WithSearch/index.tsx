"use client";
import type React from "react";
import { useState } from "react";
import { SearchContext } from "./context";

type WithSearchProps = React.PropsWithChildren;

export const WithSearch: React.FC<WithSearchProps> = ({ children }) => {
    const [search, setSearch] = useState<string>("");

    return (
        <SearchContext.Provider
            value={{
                search: search,
                onSearchChange: setSearch,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};
