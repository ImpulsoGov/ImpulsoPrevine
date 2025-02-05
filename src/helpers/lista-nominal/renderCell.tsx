import { TableTag } from "@/componentes/mounted/TableTag";

export type IconDetails = {
  src: string;
  alt: string;
};
export type TagIconDetailsMap = Record<string, IconDetails>;

export const renderDateTagCell = (
  value: string | null,
  iconDetailsMap: TagIconDetailsMap
) => (
  <>
    {value ?? (
      <TableTag
        theme="pending"
        text="Não realizada"
        icon={iconDetailsMap["pending"]}
      />
    )}
  </>
);

export const renderStatusTagCell = (
  value: string,
  iconDetailsMap: TagIconDetailsMap
) => {
  const theme = value === "Em dia" ? "success" : "warning";
  return (
    <TableTag
      theme={theme}
      text={value}
      icon={iconDetailsMap[theme]}
    />
  );
};
