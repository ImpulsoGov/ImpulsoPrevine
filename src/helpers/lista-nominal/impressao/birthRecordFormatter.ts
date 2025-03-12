export const birthRecordFormatter = ({ value }: Record<string,string>) => {
    if (value.toString() === '1') return "Sim";
    if (value.toString() === '2') return "Não";
  };