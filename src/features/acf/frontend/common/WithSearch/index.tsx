"use client";
import type React from "react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { SearchContext } from "./context";
import type { PropTriggerPrintWithoutModal } from "../Print/modules/PrintTable/model";

export type { SearchModel } from "./context";
export { SearchContext };

type Props = {
    SearchComponent: React.FC<{
        onSearchTriggered: Dispatch<SetStateAction<string>>;
        isPrintEnabled?: boolean;
        propTriggerPrintWithoutModal: PropTriggerPrintWithoutModal;
        setShouldRenderPrintTable: Dispatch<SetStateAction<boolean>>;
    }>;
    isPrintEnabled?: boolean;
    propTriggerPrintWithoutModal: PropTriggerPrintWithoutModal;
    setShouldRenderPrintTable: Dispatch<SetStateAction<boolean>>;
};

type WithSearchProps = React.PropsWithChildren<Props>;

export const WithSearch: React.FC<WithSearchProps> = ({
    SearchComponent,
    isPrintEnabled,
    propTriggerPrintWithoutModal,
    setShouldRenderPrintTable,
    children,
}) => {
    const [search, setSearch] = useState<string>("");

    return (
        <>
            <SearchComponent
                onSearchTriggered={setSearch}
                isPrintEnabled={isPrintEnabled}
                propTriggerPrintWithoutModal={propTriggerPrintWithoutModal}
                setShouldRenderPrintTable={setShouldRenderPrintTable}
            />
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
