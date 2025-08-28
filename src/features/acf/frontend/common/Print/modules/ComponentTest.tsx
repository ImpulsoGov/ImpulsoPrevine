import type { CustomPrintState } from "../../WithCustomPrint/context";

export type ComponentTestProps = CustomPrintState & {
    ref: React.Ref<HTMLDivElement>;
};

export const ComponentTest: React.FC<ComponentTestProps> = ({
    grouping,
    splitGroupPerPage,
    order,
    ref,
}) => (
    <div ref={ref} style={{ display: "none" }}>
        <h1>Aqui vai ter o conteudo da impressão </h1>
        <p>Agrupar por equipe ? {grouping ? "Sim" : "Não"}</p>
        <p>Dividir por página ? {splitGroupPerPage ? "Sim" : "Não"}</p>
        <p>Ordenar ? {order ? "Sim" : "Não"}</p>
    </div>
);
