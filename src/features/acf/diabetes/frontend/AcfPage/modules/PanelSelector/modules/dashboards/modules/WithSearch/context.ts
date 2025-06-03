"use client";
import { createContext } from "react";

export type SearchModel = {
    searchString: string;
};

export const SearchContext = createContext<SearchModel>({
    searchString: "",
});
