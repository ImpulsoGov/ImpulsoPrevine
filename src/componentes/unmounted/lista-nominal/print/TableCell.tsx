import { cpfOrBirthDayFormatter } from "@helpers/lista-nominal/impressao/cpfFormartter";
import type { ExtendedGridColDef } from "./UnitTable"; 
import { PrazoStyle } from "@componentes/unmounted/lista-nominal/print/aux/PrazoStyle";
import { Selecionar_status_usuario_descricao } from "@componentes/unmounted/lista-nominal/print/aux/Selecionar_status_usuario_descricao";
import { StatusDataConsulta } from "@componentes/unmounted/lista-nominal/print/aux/StatusDataConsulta";
import { CpfEIdentificacaoCondicao } from "@componentes/unmounted/lista-nominal/print/aux/CpfEIdentificacaoCondicao";
import type { DataItem } from "@/utils/FilterData";
import type { JSX } from "react";

const paddingCalc = (verticalDivider: number[], index: number) => 
    [...verticalDivider.map(item=>item+1),0].includes(index) ? "4px 4px 4px 12px" : "4px"

export type TableCellProps = {
    item: DataItem,
    columns: ExtendedGridColDef[],
    columnsWidth: Record<string, string>,
    verticalDivider: number[],
    layoutOrientation: "landscape" | "portrait",
    auxiliaryLists?: Record<string, Record<string,string>>
}

export type TableCellContentProps = {
    coluna: ExtendedGridColDef,
    layoutOrientation: "landscape" | "portrait",
    item: DataItem,
    auxiliaryLists?: Record<string, Record<string,string>>
}

const TableCellContent = ({
    coluna: column,
    layoutOrientation,
    item, 
    auxiliaryLists
}: TableCellContentProps) => {
    const renderField: Record<string,JSX.Element> = {
        "id_status_usuario": <Selecionar_status_usuario_descricao orientacao={layoutOrientation} value={item[column.field]} status_usuario_descricao={auxiliaryLists?.status_usuario_descricao} />,
        "prazo_proxima_afericao_pa": <PrazoStyle orientacao={layoutOrientation} value={item[column.field]} />,
        "prazo_proxima_consulta": <PrazoStyle orientacao={layoutOrientation} value={item[column.field]} />,
        "dt_consulta_mais_recente": <StatusDataConsulta orientacao={layoutOrientation} value={item[column.field]} />,
        "dt_afericao_pressao_mais_recente": <StatusDataConsulta orientacao={layoutOrientation} value={item[column.field]} />,
        "cidadao_cpf_dt_nascimento": <>{cpfOrBirthDayFormatter({ value: item[column.field] as unknown as string })}</>,
        "cpf_e_identificacao_condicao": <CpfEIdentificacaoCondicao value={item[column.field]} />

    }
    return <>
        {
            Object.keys(renderField).map((field) => column.field === field && renderField[field])
        }
        {
            Object.keys(renderField).map((field) => column.field !== field)
        }
    </>
}
export const TableCell = ({
    item,
    columns,
    columnsWidth,
    verticalDivider,
    layoutOrientation,
    auxiliaryLists
}: TableCellProps)=> columns.map((coluna,index) => (
    <td 
        key={`${item.id}-${coluna}-${index}`}
        style={{
            justifyContent : "center",
            alignItems : "center",
            textAlign: "left",
            width: columnsWidth[coluna.field],
            padding : paddingCalc(verticalDivider, index),
            borderRight: verticalDivider.includes(index) ? "solid 1px #757574" : "",
            boxSizing : "border-box",
            lineHeight : "140%",
            minHeight : "24px",
            wordBreak: coluna.wordBreak ? "break-word" : "normal",
            breakInside : "avoid"
        }}
    >
        {TableCellContent({coluna,layoutOrientation,item, auxiliaryLists})}
      </td>
  ))
