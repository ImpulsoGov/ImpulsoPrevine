"use client";
import { createContext } from "react";
import { type Dispatch, type SetStateAction } from "react";

export type SearchModel = {
    search: string;
    onSearchChange: Dispatch<SetStateAction<string>>;
};

export const SearchContext = createContext<SearchModel>({
    search: "",
    onSearchChange: () => {},
});
