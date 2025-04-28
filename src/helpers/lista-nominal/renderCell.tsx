import { TableTag } from "@/componentes/mounted/TableTag";
import { iconDetailsMap } from "@/features/acf/modules/AcfDashboardPage/modules/PanelSelector/modules/dashboards/modules/table/modules/diabetes/iconDetailsMap";

export type IconDetails = {
    src: string;
    alt: string;
};
export type TagIconDetailsMap = Record<string, IconDetails>;
// Atenção: Não testar componentes sem antes mockar a chamada das seguintes funções:
// Problema causado pelo uso do MessageChannel em um ambiente que não o suporta: node/jest/jsdom
export const RenderDateTagCell = () => (
    <TableTag
        theme="pending"
        text="Não realizada"
        icon={iconDetailsMap.pending}
    />
);

export const RenderStatusTagCell = ({
    value,
}:{
    value: string;
}) => {
    const theme = value === "Em dia" ? "success" : "warning";
    return (<TableTag theme={theme} text={value} icon={iconDetailsMap[theme]} />);
};
