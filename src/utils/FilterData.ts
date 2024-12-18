interface Filters {
    [key: string]: string | string[];
}

export interface DataItem {
    [key: string]: string | number | boolean | Date;
}

export const filterData = (dataArray: DataItem[], filters: Filters): DataItem[] => {
    return dataArray.filter(item => {
        return Object.keys(filters).every(key => {
            const filterValue = filters[key];
            if (Array.isArray(filterValue) && filterValue.length > 0) {
                return filterValue.includes(String(item[key]));
            } else if (typeof filterValue === "string" && filterValue !== "") {
                return item[key] === filterValue;
            }
            return true;
        });
    });
}
