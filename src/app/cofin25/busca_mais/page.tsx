import * as flags from "@/features/common/shared/flags";
import { SearchPlus } from "@/features/SearchPlus/frontend";
import { notFound } from "next/navigation";

const SearchPlusPage: React.FC = async () => {
    const isSearchPlusEnabled = await flags.searchPlus();
    const isSearchPlusABEnabled = await flags.searchPlusAB();
    const isSearchPlusNewGoodPracticeEnabled =
        await flags.searchPlusNewGoodPractice();
    if (!isSearchPlusEnabled && !isSearchPlusABEnabled) {
        return notFound();
    }

    return (
        <SearchPlus
            isSearchPlusABEnabled={isSearchPlusABEnabled}
            isSearchPlusNewGoodPracticeEnabled={
                isSearchPlusNewGoodPracticeEnabled
            }
        />
    );
};

export default SearchPlusPage;
