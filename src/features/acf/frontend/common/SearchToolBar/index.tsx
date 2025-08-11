"use client";
import { ListToolBar } from "@impulsogov/design-system";
import type { Dispatch, SetStateAction } from "react";
// import { LastUpdatedCard } from "./modules/LastUpdatedCard";
import { SearchBar } from "./modules/SearchBar";
// import { PrintButton } from "./modules/PrintButton";

type Props = {
    onSearchTriggered: Dispatch<SetStateAction<string>>;
};

export const SearchToolBar: React.FC<Props> = ({ onSearchTriggered }) => {
    return (
        <ListToolBar>
            <>
                {/* <LastUpdatedCard /> */}
                <SearchBar onSearchTriggered={onSearchTriggered} />
                {/* <PrintButton /> */}
            </>
        </ListToolBar>
    );
};
