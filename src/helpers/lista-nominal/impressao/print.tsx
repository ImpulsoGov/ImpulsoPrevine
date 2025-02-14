import { PrintTable, type PrintTableProps } from '@/componentes/unmounted/lista-nominal/print/PrintTable';
import { RenderPrint } from './RenderPrint';

const PRINT_ESCALE = '1';

export type PrintProps = {
    props: PrintTableProps
}

export const print = (props: PrintTableProps) => {
    const PrintTableMounted = <PrintTable {...props} key="print-table-child"/>
    RenderPrint(PRINT_ESCALE, PrintTableMounted)
}