'use client'
import { ClearFilters } from '@impulsogov/design-system';
import { FilterBar } from '@impulsogov/design-system';
import type React from 'react';
import { createContext } from 'react';
import { clearFiltersArgs } from './modules/filters/clearFiltersArgs';
import { SelectDropdown } from '@impulsogov/design-system';
import { initialFiltersBuilder, type Filter } from './modules/filters/initialFilters';
import { useState } from 'react';
import type { FilterItem } from '@/services/lista-nominal/ListaNominal';
import { filtersBuilder } from './modules/filters/modules/diabetes/filtersBuilder';
import { useSearchParams } from 'next/navigation';
import type { DiabetesFilterItem } from './modules/filters/modules/diabetes/diabetes.model';

type TableWithFiltersProps = React.PropsWithChildren<{
    filterItem: DiabetesFilterItem
}>;


export const FiltersContext = createContext<FilterItem>({});

export const TableWithFilters = ({
    children,
    filterItem
}: TableWithFiltersProps) => {
    const searchParams = useSearchParams(); 
    const filters = filtersBuilder(filterItem);
    const initialFilters = initialFiltersBuilder(searchParams, filters);
    const [value, setValue] = useState<FilterItem>(initialFilters);

    const filtersSelect = filters.map((filter: Filter) => (
        <SelectDropdown
            key={filter.id}
            {...filter}
            value={value}
            setValue={setValue}
            options={filter.options}
            label={filter.label}
            multiSelect={filter.isMultiSelect}
            width={filter.width}
        />
    ));
    const clearButton = <ClearFilters data={value} setData={setValue} {...clearFiltersArgs} />

  return (
    <FiltersContext.Provider value={value}>
        <FilterBar filters={filtersSelect} clearButton={clearButton} />
        {children}
    </FiltersContext.Provider>
  )
}
