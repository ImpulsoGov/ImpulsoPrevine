"use client";
import { createContext, type Dispatch, type SetStateAction } from "react";

export type SearchModel = {
    search: string;
    onSearchChange: Dispatch<SetStateAction<string>>;
};

export const SearchContext = createContext<SearchModel>({
    search: "",
    onSearchChange: () => {},
});
