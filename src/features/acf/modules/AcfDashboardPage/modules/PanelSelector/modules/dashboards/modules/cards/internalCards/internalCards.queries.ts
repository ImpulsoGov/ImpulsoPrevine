import { prisma } from "@prisma/prismaClient"

export type MunicipalitySusIdAndTeamIne = {
  municipio_id_sus: string;
  equipe_ine_cadastro: string;
}

export const totalPatientsWithDiabetes = async (municipalitySusIdAndTeamIne: MunicipalitySusIdAndTeamIne) => {
  return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count({
      where: {
          ...municipalitySusIdAndTeamIne,
      },
  })
}

export const totalPatientsWithExamsAndAppointment = async (municipalitySusIdAndTeamIne: MunicipalitySusIdAndTeamIne) => {
  return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count({
      where: {
          ...municipalitySusIdAndTeamIne,
          prazo_proxima_consulta: "Em dia",
          prazo_proxima_solicitacao_hemoglobina: "Em dia"
      },
  })
}

export const totalPatientsSelfDiagnosed = async (municipalitySusIdAndTeamIne: MunicipalitySusIdAndTeamIne) => {
  return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count({
      where: {
          ...municipalitySusIdAndTeamIne,
          identificacao_condicao_diabetes: "Autorreferida"
      },
  })
}

export const totalPatientsWithClinicalDiagnosis = async (municipalitySusIdAndTeamIne: MunicipalitySusIdAndTeamIne) => {
  return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count({
      where: {
          ...municipalitySusIdAndTeamIne,
          identificacao_condicao_diabetes: "Diagnóstico Clínico"
      },
  })
}