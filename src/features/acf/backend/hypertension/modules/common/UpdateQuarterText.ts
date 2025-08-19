import { getCurrentQuadrimester } from "@/features/acf/shared/GetCurrentQuadrimester";

export const updateQuarterText = <TText, TCode extends number>(
    codeToText: Record<TCode, TText>
): Record<TCode, TText> => {
    const currentQuadrimester = getCurrentQuadrimester();
    const text = `Vence dentro do Q${currentQuadrimester.toString()}` as TText;

    return {
        ...codeToText,
        30: text,
    };
};
