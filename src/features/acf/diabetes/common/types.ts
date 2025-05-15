export type AcfDashboardType = "HIPERTENSAO" | "DIABETES";    

// TODO: decidir se manteremos tipos genéricos ou específicos (ideia: usar generic types do TS)
export type ValidValue = string | number | boolean | Date | null | undefined;
export interface DataItem extends Record<string, ValidValue> {}
export type AcfDashboardDataItemType = Record<string, ValidValue>

export type AcfDashboardDataType = {
  data: DataItem[];
  totalRows: number;
};