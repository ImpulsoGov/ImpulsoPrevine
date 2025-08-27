"use client";
import { ListToolBar } from "@impulsogov/design-system";
import { useContext, type Dispatch, type SetStateAction } from "react";
// import { LastUpdatedCard } from "./modules/LastUpdatedCard";
import { SearchBar } from "./modules/SearchBar";
import { PrintButton } from "./modules/PrintButton";
import { WithPrintModalContext } from "../WithPrintModal";

type Props = {
    onSearchTriggered: Dispatch<SetStateAction<string>>;
};

export const SearchToolBar: React.FC<Props> = ({ onSearchTriggered }) => {
    const { isPrintModalVisible, setIsPrintModalVisible } = useContext(
        WithPrintModalContext
    );
    return (
        <ListToolBar>
            <>
                {/* <LastUpdatedCard /> */}
                <SearchBar onSearchTriggered={onSearchTriggered} />
                <PrintButton
                    print={() => {
                        console.log(
                            setIsPrintModalVisible,
                            "Print button clicked",
                            isPrintModalVisible
                        );
                        setIsPrintModalVisible(true);
                    }}
                />
            </>
        </ListToolBar>
    );
};
