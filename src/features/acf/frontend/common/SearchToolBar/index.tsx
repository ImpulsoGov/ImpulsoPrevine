"use client";
import { ListToolBar } from "@impulsogov/design-system";
import { useContext, type Dispatch, type SetStateAction } from "react";
// import { LastUpdatedCard } from "./modules/LastUpdatedCard";
import { SearchBar } from "./modules/SearchBar";
import { PrintButton } from "./modules/PrintButton";
import { WithPrintModalContext } from "../WithPrintModal";
import {
    FiltersContext,
    type FiltersContextType,
} from "../WithFilters/context";
import type { AppliedFilters } from "../WithFilters";
import type { PropTriggerPrintWithoutModal } from "../Print/modules/PrintTable/model";

type Props = {
    onSearchTriggered: Dispatch<SetStateAction<string>>;
    isPrintEnabled?: boolean;
    propTriggerPrintWithoutModal: PropTriggerPrintWithoutModal;
    setShouldRenderPrintTable: Dispatch<SetStateAction<boolean>>;
};

const showBackdoorGuide = (): void => {
    if (typeof window.userGuiding !== "undefined") {
        window.userGuiding.previewGuide(150481);
    }
};

export const SearchToolBar: React.FC<Props> = ({
    onSearchTriggered,
    isPrintEnabled,
    propTriggerPrintWithoutModal,
    setShouldRenderPrintTable,
}) => {
    const { setIsPrintModalVisible } = useContext(WithPrintModalContext);
    const { selectedValues } = useContext(
        FiltersContext
    ) as FiltersContextType<AppliedFilters>;
    const triggerPrint = (): void => {
        const shouldOpenModalToPrint =
            selectedValues?.[
                propTriggerPrintWithoutModal as keyof AppliedFilters
            ].length === 1;

        if (shouldOpenModalToPrint) {
            setShouldRenderPrintTable(true);
        } else {
            setIsPrintModalVisible(true);
        }
    };
    return (
        <ListToolBar>
            <>
                {/* <LastUpdatedCard /> */}
                <SearchBar onSearchTriggered={onSearchTriggered} />
                <PrintButton
                    print={isPrintEnabled ? triggerPrint : showBackdoorGuide}
                />
            </>
        </ListToolBar>
    );
};
