import { searchPlus, searchPlusAB } from "@/features/common/shared/flags";
import { SearchPlus } from "@/features/SearchPlus/frontend";
import { notFound } from "next/navigation";

const SearchPlusPage: React.FC = async () => {
    const isSearchPlusEnabled = await searchPlus();
    const isSearchPlusABEnabled = await searchPlusAB();
    if (!isSearchPlusEnabled && !isSearchPlusABEnabled) {
        return notFound();
    }

    return <SearchPlus isSearchPlusABEnabled={isSearchPlusABEnabled} />;
};

export default SearchPlusPage;
