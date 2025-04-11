import type { DiabetesAcfDbItem } from "./print.model";

const data = [
    {
        "cidadao_cpf_dt_nascimento": "06385172614",
        "municipio_id_sus": "111111",
        "cidadao_nome": "cidadao_nome B",
        "identificacao_condicao_diabetes": "Diagnostico clínico",
        "dt_consulta_mais_recente": "22/09/2021",
        "prazo_proxima_consulta": "Até 30/Abril",
        "dt_solicitacao_hemoglobina_glicada_mais_recente": "22/02/2021",
        "prazo_proxima_solicitacao_hemoglobina_glicada": "Até 30/Abril",
        "acs_nome_cadastro": "ACS 2",
        "equipe_ine_cadastro": "0000098574",
        "equipe_nome_cadastro": "equipeA",
        "dt_registro_producao_mais_recente": "2023-10-01",
        "cidadao_idade": 15,
        "cidadao_faixa_etaria": "Menos de 17 anos",
        "status_usuario": "Apenas a consulta a fazer",
        "municipio_uf": "Demo - Monsenhor Tabosa - CE"
    },
    {
        "cidadao_cpf_dt_nascimento": "06385582614",
        "municipio_id_sus": "111111",
        "cidadao_nome": "cidadao_nome C",
        "identificacao_condicao_diabetes": "Diagnostico clínico",
        "dt_consulta_mais_recente": "22/09/2021",
        "prazo_proxima_consulta": "Até 30/Abril",
        "dt_solicitacao_hemoglobina_glicada_mais_recente": "22/02/2021",
        "prazo_proxima_solicitacao_hemoglobina_glicada": "Até 30/Abril",
        "acs_nome_cadastro": "ACS 3",
        "equipe_ine_cadastro": "1111111112",
        "equipe_nome_cadastro": "equipeB",
        "dt_registro_producao_mais_recente": "2023-10-01",
        "cidadao_idade": 16,
        "cidadao_faixa_etaria": "Menos de 17 anos",
        "status_usuario": "Apenas o exame a fazer",
        "municipio_uf": "Demo - Monsenhor Tabosa - CE"
    },
    {
        "cidadao_cpf_dt_nascimento": "06385122614",
        "municipio_id_sus": "111111",
        "cidadao_nome": "cidadao_nome D",
        "identificacao_condicao_diabetes": "Autorreferido",
        "dt_consulta_mais_recente": "22/09/2021",
        "prazo_proxima_consulta": "Até 30/Abril",
        "dt_solicitacao_hemoglobina_glicada_mais_recente": "22/02/2021",
        "prazo_proxima_solicitacao_hemoglobina_glicada": "Até 30/Abril",
        "acs_nome_cadastro": "ACS 4",
        "equipe_ine_cadastro": "0000098574",
        "equipe_nome_cadastro": "equipeC",
        "dt_registro_producao_mais_recente": "2023-10-01",
        "cidadao_idade": 20,
        "cidadao_faixa_etaria": "Entre 18 e 24 anos",
        "status_usuario": "Consulta e exame a fazer",
        "municipio_uf": "Demo - Monsenhor Tabosa - CE"
    },
    {
        "cidadao_cpf_dt_nascimento": "06385182604",
        "municipio_id_sus": "111111",
        "cidadao_nome": "cidadao_nome A",
        "identificacao_condicao_diabetes": "Autorreferido",
        "dt_consulta_mais_recente": "22/02/2021",
        "prazo_proxima_consulta": "Em dia",
        "dt_solicitacao_hemoglobina_glicada_mais_recente": "22/02/2021",
        "prazo_proxima_solicitacao_hemoglobina_glicada": "Em dia",
        "acs_nome_cadastro": "ACS 1",
        "equipe_ine_cadastro": "0000098574",
        "equipe_nome_cadastro": "equipeC",
        "dt_registro_producao_mais_recente": "2023-10-01",
        "cidadao_idade": 24,
        "cidadao_faixa_etaria": "Entre 18 e 24 anos",
        "status_usuario": "Consulta e exame em dia",
        "municipio_uf": "Demo - Monsenhor Tabosa - CE"
    },
    {
        "cidadao_cpf_dt_nascimento": "06185182614",
        "municipio_id_sus": "111111",
        "cidadao_nome": "cidadao_nome E",
        "identificacao_condicao_diabetes": "Autorreferido",
        "dt_consulta_mais_recente": "22/02/2021",
        "prazo_proxima_consulta": "Até 30/Abril",
        "dt_solicitacao_hemoglobina_glicada_mais_recente": "22/02/2021",
        "prazo_proxima_solicitacao_hemoglobina_glicada": "Até 30/Abril",
        "acs_nome_cadastro": "ACS 5",
        "equipe_ine_cadastro": "0000098574",
        "equipe_nome_cadastro": "equipeC",
        "dt_registro_producao_mais_recente": "2023-10-01",
        "cidadao_idade": 25,
        "cidadao_faixa_etaria": "Entre 25 e 34 anos",
        "status_usuario": "Apenas a consulta a fazer",
        "municipio_uf": "Demo - Monsenhor Tabosa - CE"
    },
    {
        "cidadao_cpf_dt_nascimento": "06185182614",
        "municipio_id_sus": "111111",
        "cidadao_nome": "cidadao_nome F",
        "identificacao_condicao_diabetes": "Autorreferido",
        "dt_consulta_mais_recente": "22/09/2021",
        "prazo_proxima_consulta": "Até 30/Abril",
        "dt_solicitacao_hemoglobina_glicada_mais_recente": "22/02/2021",
        "prazo_proxima_solicitacao_hemoglobina_glicada": "Até 30/Abril",
        "acs_nome_cadastro": "ACS 6",
        "equipe_ine_cadastro": "0000098574",
        "equipe_nome_cadastro": "equipeC",
        "dt_registro_producao_mais_recente": "2023-10-01",
        "cidadao_idade": 30,
        "cidadao_faixa_etaria": "Entre 25 e 34 anos",
        "status_usuario": "Apenas o exame a fazer",
        "municipio_uf": "Demo - Monsenhor Tabosa - CE"
    },
    {
        "cidadao_cpf_dt_nascimento": "06385182614",
        "municipio_id_sus": "111111",
        "cidadao_nome": "cidadao_nome G",
        "identificacao_condicao_diabetes": "Diagnostico clínico",
        "dt_consulta_mais_recente": "22/09/2021",
        "prazo_proxima_consulta": "Até 30/Abril",
        "dt_solicitacao_hemoglobina_glicada_mais_recente": "22/02/2021",
        "prazo_proxima_solicitacao_hemoglobina_glicada": "Até 30/Abril",
        "acs_nome_cadastro": "ACS 7",
        "equipe_ine_cadastro": "0000098574",
        "equipe_nome_cadastro": "equipeC",
        "dt_registro_producao_mais_recente": "2023-10-01",
        "cidadao_idade": 38,
        "cidadao_faixa_etaria": "Entre 35 e 44 anos",
        "status_usuario": "Consulta e exame a fazer",
        "municipio_uf": "Demo - Monsenhor Tabosa - CE"
    },
    {
        "cidadao_cpf_dt_nascimento": "06385182614",
        "municipio_id_sus": "111111",
        "cidadao_nome": "cidadao_nome H",
        "identificacao_condicao_diabetes": "Diagnostico clínico",
        "dt_consulta_mais_recente": "22/09/2021",
        "prazo_proxima_consulta": "Até 30/Abril",
        "dt_solicitacao_hemoglobina_glicada_mais_recente": "22/02/2021",
        "prazo_proxima_solicitacao_hemoglobina_glicada": "Até 30/Abril",
        "acs_nome_cadastro": "ACS 8",
        "equipe_ine_cadastro": "0000098574",
        "equipe_nome_cadastro": "equipeC",
        "dt_registro_producao_mais_recente": "2023-10-01",
        "cidadao_idade": 40,
        "cidadao_faixa_etaria": "Entre 35 e 44 anos",
        "status_usuario": "Consulta e exame em dia",
        "municipio_uf": "Demo - Monsenhor Tabosa - CE"
    },
    {
        "cidadao_cpf_dt_nascimento": "06885182619",
        "municipio_id_sus": "111111",
        "cidadao_nome": "cidadao_nome I",
        "identificacao_condicao_diabetes": "Diagnostico clínico",
        "dt_consulta_mais_recente": "22/09/2021",
        "prazo_proxima_consulta": "Até 30/Abril",
        "dt_solicitacao_hemoglobina_glicada_mais_recente": "22/02/2021",
        "prazo_proxima_solicitacao_hemoglobina_glicada": "Até 30/Abril",
        "acs_nome_cadastro": "ACS 9",
        "equipe_ine_cadastro": "0000098574",
        "equipe_nome_cadastro": "equipeC",
        "dt_registro_producao_mais_recente": "2023-10-01",
        "cidadao_idade": 45,
        "cidadao_faixa_etaria": "Entre 45 e 54 anos",
        "status_usuario": "Apenas a consulta a fazer",
        "municipio_uf": "Demo - Monsenhor Tabosa - CE"
    },
    {
        "cidadao_cpf_dt_nascimento": "04385182615",
        "municipio_id_sus": "111111",
        "cidadao_nome": "cidadao_nome J",
        "identificacao_condicao_diabetes": "Diagnostico clínico",
        "dt_consulta_mais_recente": "22/09/2021",
        "prazo_proxima_consulta": "Até 30/Abril",
        "dt_solicitacao_hemoglobina_glicada_mais_recente": "22/02/2021",
        "prazo_proxima_solicitacao_hemoglobina_glicada": "Até 30/Abril",
        "acs_nome_cadastro": "ACS 10",
        "equipe_ine_cadastro": "0000098574",
        "equipe_nome_cadastro": "equipeC",
        "dt_registro_producao_mais_recente": "2023-10-01",
        "cidadao_idade": 50,
        "cidadao_faixa_etaria": "Entre 45 e 54 anos",
        "status_usuario": "Apenas o exame a fazer",
        "municipio_uf": "Demo - Monsenhor Tabosa - CE"
    },
    {
        "cidadao_cpf_dt_nascimento": "16385182614",
        "municipio_id_sus": "111111",
        "cidadao_nome": "cidadao_nome K",
        "identificacao_condicao_diabetes": "Diagnostico clínico",
        "dt_consulta_mais_recente": "22/09/2021",
        "prazo_proxima_consulta": "Até 30/Abril",
        "dt_solicitacao_hemoglobina_glicada_mais_recente": "22/02/2021",
        "prazo_proxima_solicitacao_hemoglobina_glicada": "Até 30/Abril",
        "acs_nome_cadastro": "ACS 11",
        "equipe_ine_cadastro": "0000098574",
        "equipe_nome_cadastro": "equipeD",
        "dt_registro_producao_mais_recente": "2023-10-01",
        "cidadao_idade": 55,
        "cidadao_faixa_etaria": "Entre 55 e 65 anos",
        "status_usuario": "Consulta e exame a fazer",
        "municipio_uf": "Demo - Monsenhor Tabosa - CE"
    },
    {
        "cidadao_cpf_dt_nascimento": "06385182619",
        "municipio_id_sus": "111111",
        "cidadao_nome": "cidadao_nome L",
        "identificacao_condicao_diabetes": "Diagnostico clínico",
        "dt_consulta_mais_recente": "22/09/2021",
        "prazo_proxima_consulta": "Até 30/Abril",
        "dt_solicitacao_hemoglobina_glicada_mais_recente": "22/02/2021",
        "prazo_proxima_solicitacao_hemoglobina_glicada": "Até 30/Abril",
        "acs_nome_cadastro": "ACS 12",
        "equipe_ine_cadastro": "0000098574",
        "equipe_nome_cadastro": "equipeE",
        "dt_registro_producao_mais_recente": "2023-10-01",
        "cidadao_idade": 63,
        "cidadao_faixa_etaria": "Entre 55 e 65 anos",
        "status_usuario": "Consulta e exame em dia",
        "municipio_uf": "Demo - Monsenhor Tabosa - CE"
    },
    {
        "cidadao_cpf_dt_nascimento": "46385182614",
        "municipio_id_sus": "111111",
        "cidadao_nome": "cidadao_nome M",
        "identificacao_condicao_diabetes": "Diagnostico clínico",
        "dt_consulta_mais_recente": "22/09/2021",
        "prazo_proxima_consulta": "Até 30/Abril",
        "dt_solicitacao_hemoglobina_glicada_mais_recente": "22/02/2021",
        "prazo_proxima_solicitacao_hemoglobina_glicada": "Até 30/Abril",
        "acs_nome_cadastro": "ACS 13",
        "equipe_ine_cadastro": "0000098574",
        "equipe_nome_cadastro": "equipeE",
        "dt_registro_producao_mais_recente": "2023-10-01",
        "cidadao_idade": 66,
        "cidadao_faixa_etaria": "65 anos ou mais",
        "status_usuario": "Apenas a consulta a fazer",
        "municipio_uf": "Demo - Monsenhor Tabosa - CE"
    },
    {
        "cidadao_cpf_dt_nascimento": "56385182614",
        "municipio_id_sus": "111111",
        "cidadao_nome": "cidadao_nome N",
        "identificacao_condicao_diabetes": "Diagnostico clínico",
        "dt_consulta_mais_recente": "22/09/2021",
        "prazo_proxima_consulta": "Até 30/Abril",
        "dt_solicitacao_hemoglobina_glicada_mais_recente": "22/02/2021",
        "prazo_proxima_solicitacao_hemoglobina_glicada": "Até 30/Abril",
        "acs_nome_cadastro": "ACS 14",
        "equipe_ine_cadastro": "0000098574",
        "equipe_nome_cadastro": "equipeE",
        "dt_registro_producao_mais_recente": "2023-10-01",
        "cidadao_idade": 75,
        "cidadao_faixa_etaria": "65 anos ou mais",
        "status_usuario": "Apenas o exame a fazer",
        "municipio_uf": "Demo - Monsenhor Tabosa - CE"
    },
    {
        "cidadao_cpf_dt_nascimento": "12345678900",
        "municipio_id_sus": "111111",
        "cidadao_nome": "cidadao_nome O",
        "identificacao_condicao_diabetes": "Diagnostico clínico",
        "dt_consulta_mais_recente": "15/03/2023",
        "prazo_proxima_consulta": "Em dia",
        "dt_solicitacao_hemoglobina_glicada_mais_recente": "10/03/2023",
        "prazo_proxima_solicitacao_hemoglobina_glicada": "Em dia",
        "acs_nome_cadastro": "ACS 15",
        "equipe_ine_cadastro": "0000098574",
        "equipe_nome_cadastro": "equipeD",
        "dt_registro_producao_mais_recente": "2023-10-01",
        "cidadao_idade": 34,
        "cidadao_faixa_etaria": "Entre 25 e 34 anos",
        "status_usuario": "Consulta e exame a fazer",
        "municipio_uf": "Demo - Monsenhor Tabosa - CE"
    }
] as DiabetesAcfDbItem[]


//TODO: será substituido por query
export const diabetesAcfPrintDataForTeamRepository = async(
    municipalitySusID: string,
    TeamIne: string,
): Promise<DiabetesAcfDbItem[]>=>{
    return data.filter((item) => {
        item.municipio_id_sus === municipalitySusID &&
        item.equipe_ine_cadastro === TeamIne
    })
}