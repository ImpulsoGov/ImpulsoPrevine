export const MENSAGENS_DE_ERRO = {
    nomeVazio: 'O campo "Nome" não pode ser vazio',
    municipioVazio: "Escolha um dos municípios válidos",
    emailVazio: 'O campo "E-mail" não pode ser vazio',
    cpfVazio: 'O campo "CPF" não pode ser vazio',
    cargoVazio: 'O campo "Cargo" não pode ser vazio',
    telefoneVazio: 'O campo "Telefone" não pode ser vazio',
    equipeVazio: 'O campo "Equipe" não pode ser vazio',
    autorizacoesVazias: "Selecione ao menos uma autorização",
};

export const CARGOS = [
    { id: "Coordenação APS", descricao: "Coordenação APS" },
    { id: "Coordenação de Equipe", descricao: "Coordenação de Equipe" },
    { id: "Secretária (o) de Saúde", descricao: "Secretária (o) de Saúde" },
    {
        id: "Agente Comunitário de Saúde",
        descricao: "Agente Comunitário de Saúde",
    },
    { id: "Enfermeira (o)", descricao: "Enfermeira (o)" },
    { id: "Técnica (o) de Enfermagem", descricao: "Técnica (o) de Enfermagem" },
    { id: "Médica (o)", descricao: "Médica (o)" },
    { id: "Profissional de TI", descricao: "Profissional de TI" },
    { id: "Impulser", descricao: "Impulser" },
    { id: "Apoiador (a)", descricao: "Apoiador (a)" },
    {
        id: "Coordenador (a) de Vigilância Epidemiológica",
        descricao: "Coordenador (a) de Vigilância Epidemiológica",
    },
];

export const ESTADOS_PERFIL_ATIVO = {
    Sim: true,
    Não: false,
    "Primeiro acesso pendente": null,
};
