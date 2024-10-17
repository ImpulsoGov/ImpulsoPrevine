const datefiltrosGestantes = [
    "gestacao_data_dpp",
    "consulta_prenatal_ultima_data",
]
const rotulosfiltrosGestantes = [
    "NOMES DE A-Z",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z",
    "DPP MAIS PRÓXIMA",
    "IG ATUAL MAIOR",
    "MAIOR Nº TOTAL DE CONSULTAS",
    "DATA MAIS RECENTE DA ÚLTIMA CONSULTA"
]
const IDFiltrosGestantes = {
    "NOMES DE A-Z" : "cidadao_nome",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z" : "acs_nome",
    "DPP MAIS PRÓXIMA" : "gestacao_data_dpp",
    "IG ATUAL MAIOR" : "gestacao_idade_gestacional_atual",
    "MAIOR Nº TOTAL DE CONSULTAS" : "consultas_pre_natal_validas",
    "DATA MAIS RECENTE DA ÚLTIMA CONSULTA" : "consulta_prenatal_ultima_data"
}   
const IDFiltrosOrdenacaoGestantes = {
    "cidadao_nome" : "asc",
    "acs_nome" : "asc",
    "gestacao_data_dpp" : "asc",
    "gestacao_idade_gestacional_atual" : "desc",
    "consultas_pre_natal_validas" : "desc",
    "consulta_prenatal_ultima_data" : "desc"
}
const IntFiltrosGestantesEquipe = [
    "gestacao_idade_gestacional_atual",
    "consultas_pre_natal_validas"
]

export {
    datefiltrosGestantes,
    rotulosfiltrosGestantes,
    IDFiltrosGestantes,
    IDFiltrosOrdenacaoGestantes,
    IntFiltrosGestantesEquipe
}