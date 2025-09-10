import type { AcfItem } from "@/features/acf/shared/schema";

type SortByKeyProps<TAcfItem extends AcfItem> = {
    a: TAcfItem | null;
    b: TAcfItem | null;
    key: keyof TAcfItem;
    order: "asc" | "desc";
};

// Função auxiliar para verificar se um valor é "ordenável"
const isSortable = (value: unknown): boolean => {
    return (
        typeof value === "string" ||
        typeof value === "number" ||
        (value instanceof Date && !isNaN(value.getTime()))
    );
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

    const isSortableA = isSortable(valA);
    const isSortableB = isSortable(valB);

    // Se ambos os valores não são "ordenáveis" (incluindo null), eles são iguais
    if (!isSortableA && !isSortableB) {
        return 0;
    }

    // Se um é ordenável e o outro não, o "não-ordenável" vai para o final
    if (!isSortableA) return 1;
    if (!isSortableB) return -1;

    // A partir daqui, sabemos que ambos os valores são ordenáveis
    if (typeof valA === "string" && typeof valB === "string") {
        return valA.localeCompare(valB) * ascFactor;
    }
    if (typeof valA === "number" && typeof valB === "number") {
        return (valA - valB) * ascFactor;
    }
    if (valA instanceof Date && valB instanceof Date) {
        return (valA.getTime() - valB.getTime()) * ascFactor;
    }

    // Caso de fallback (nunca deve acontecer se a lógica estiver correta)
    return 0;
};
