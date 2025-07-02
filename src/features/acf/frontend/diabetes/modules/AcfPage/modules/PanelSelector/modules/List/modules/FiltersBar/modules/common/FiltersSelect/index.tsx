import type { AppliedFiltersCoaps } from "../../../../DataTable/modules/CoapsDataTable/model";
import type {
    SelectConfig,
    HtmlSelectOption,
} from "../../CoapsFiltersBar/logic";
import { useMemo, type Dispatch, type SetStateAction } from "react";
import {
    AutoCompleteMultiSelect,
    AutoCompleteSingleSelect,
} from "./modules/AutoComplete";

export type FiltersSelectProps = {
    selectConfigs: Array<SelectConfig>;
    selectedValues: AppliedFiltersCoaps;
    setSelectedValues: Dispatch<SetStateAction<AppliedFiltersCoaps>>;
};

const getSelectedOptions = (
    filter: keyof AppliedFiltersCoaps,
    selectConfigs: Array<SelectConfig>,
    selectedValues: AppliedFiltersCoaps
): Array<HtmlSelectOption> => {
    const selected = selectedValues[filter];
    const config = selectConfigs.find((s) => s.id === filter);
    if (!config) return [];
    if (Array.isArray(selected)) {
        return config.options.filter((opt) =>
            (selected as Array<string>).includes(opt.value)
        );
    } else {
        return config.options.filter((opt) => opt.value === selected);
    }
};

export const FiltersSelect: React.FC<FiltersSelectProps> = ({
    selectConfigs,
    selectedValues,
    setSelectedValues,
}) => {
    const valueMemo = useMemo(() => {
        const filters = {
            communityHealthWorker: getSelectedOptions(
                "communityHealthWorker",
                selectConfigs,
                selectedValues
            ),
            conditionIdentifiedBy: getSelectedOptions(
                "conditionIdentifiedBy",
                selectConfigs,
                selectedValues
            ),
            patientAgeRange: getSelectedOptions(
                "patientAgeRange",
                selectConfigs,
                selectedValues
            ),
            patientStatus: getSelectedOptions(
                "patientStatus",
                selectConfigs,
                selectedValues
            ),
            careTeamName: getSelectedOptions(
                "careTeamName",
                selectConfigs,
                selectedValues
            ),
        } as Record<keyof AppliedFiltersCoaps, Array<HtmlSelectOption>>;

        return filters;
    }, [selectedValues, selectConfigs]);

    return selectConfigs.map((select: SelectConfig) =>
        select.isMultiSelect ? (
            <AutoCompleteMultiSelect
                valueMemo={valueMemo}
                select={select}
                setSelectedValues={setSelectedValues}
                selectedValues={selectedValues}
            />
        ) : (
            <AutoCompleteSingleSelect
                valueMemo={valueMemo}
                select={select}
                setSelectedValues={setSelectedValues}
                selectedValues={selectedValues}
            />
        )
    );
};
