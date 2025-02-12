import { PrintTable } from '@/componentes/unmounted/lista-nominal/print/PrintTable';
import { RenderPrint } from './RenderPrint';

const PRINT_ESCALE = '1';

export const print = (props) => {
    const PrintTableMounted = <PrintTable {...props} />
    RenderPrint(PRINT_ESCALE,PrintTableMounted)
}