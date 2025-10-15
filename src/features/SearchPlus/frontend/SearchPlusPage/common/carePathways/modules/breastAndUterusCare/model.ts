//Esse tipo esta em portugues para ficar igual ao cabeçalho do CSV
export type BreastAndUterusCareCsvRow = {
    Nome: string;
    Idade: string;
    CPF: string;
    CNS: string;
    "Telefone celular": string;
    "Telefone residencial": string;
    "Telefone de contato": string;
    Microárea: string;
};

export type BreastAndUterusCareItem = {
    patientName: string;
    patientAge: string;
    patientCpf: string;
    patientCns: string;
    patientPhoneNumber: string;
    microAreaName: string;
};
