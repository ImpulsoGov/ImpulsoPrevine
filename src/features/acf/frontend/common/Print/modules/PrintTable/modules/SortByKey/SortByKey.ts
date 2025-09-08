import type { AcfItem } from "@/features/acf/shared/schema";

type SortByKeyProps<TAcfItem extends AcfItem> = {
    a: TAcfItem | null;
    b: TAcfItem | null;
    key: keyof TAcfItem;
    order: "asc" | "desc";
};

export const SortByKey = <TAcfItem extends AcfItem>({
    a,
    b,
    key,
    order,
}: SortByKeyProps<TAcfItem>): number => {
    const ascFactor = order === "asc" ? 1 : -1;
    const valA = a?.[key];
    const valB = b?.[key];
    if (valA == null || valB == null) {
        if (valA == null && valB == null) return 0;
        // asc: nulls last → a null vem depois (+1); b null vem antes (-1)
        // desc: nulls first → a null vem antes (-1); b null vem depois (+1)
        const isAsc = order === "asc";
        return valA == null ? (isAsc ? 1 : -1) : isAsc ? -1 : 1;
    }
    if (typeof valA === "string" && typeof valB === "string") {
        return valA.localeCompare(valB) * ascFactor;
    }
    if (typeof valA === "number" && typeof valB === "number") {
        return (valA - valB) * ascFactor;
    }
    if (valA instanceof Date && valB instanceof Date) {
        const dateA = new Date(valA);
        const dateB = new Date(valB);
        if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
            return (dateA.getTime() - dateB.getTime()) * ascFactor;
        }
    }
    return 0;
};
