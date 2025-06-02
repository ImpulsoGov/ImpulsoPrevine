import { ListToolBar } from "@impulsogov/design-system";
import { LastUpdatedCard } from "./modules/LastUpdatedCard";
import { SearchBar } from "./modules/SearchBar";
// import { PrintButton } from "./modules/PrintButton";

export const ToolBar: React.FC = () => {
    return (
        <ListToolBar>
            <>
                <LastUpdatedCard />
                <SearchBar />
                {/* <PrintButton /> */}
            </>
        </ListToolBar>
    );
};
