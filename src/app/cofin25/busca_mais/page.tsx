import { searchPlus } from "@/features/common/shared/flags";
import { SearchPlus } from "@/features/SearchPlus/frontend";
import { notFound } from "next/navigation";

const SearchPlusPage: React.FC = async () => {
    const isSearchPlusEnabled = await searchPlus();

    if (!isSearchPlusEnabled) {
        return notFound();
    }

    return <SearchPlus />;
};

export default SearchPlusPage;
