import { formatarCPFOuDataNascimento, formatarDataNascimento } from "../helpers/formatarCPF";
import { formatarRegistroDeParto } from "../helpers/formatarRegistroDeParto";
import { DatasDoses } from "./auxiliares/DatasDoses";
import { PrazoStyle } from "./auxiliares/PrazoStyle";
import { Selecionar_status_usuario_descricao } from "./auxiliares/Selecionar_status_usuario_descricao";
import { StatusAtendimentoOdontologico } from "./auxiliares/StatusAtendimentoOdontologico";
import { StatusDataConsulta } from "./auxiliares/StatusDataConsulta";
import { StatusDDP } from "./auxiliares/StatusDDP";
import { StatusExameSifilisHIV } from "./auxiliares/StatusExameSifilisHIV";
import { StatusIdadeGestacional } from "./auxiliares/StatusIdadeGestacional";
import { StatusTotalConsultasValidas } from "./auxiliares/StatusTotalConsultasValidas";
import { CpfEIdentificacaoCondicao } from "./auxiliares/CpfEIdentificacaoCondicao";
import { StatusEsquemaPolio } from "./auxiliares/StatusEsquemaPolio";
import { StatusEsquemaPenta } from "./auxiliares/StatusEsquemaPenta";

export const TabelaUnitaria = ({ 
  data, 
  colunas, 
  listas_auxiliares, 
  fontFamily = "sans-serif", 
  divisorVertical , 
  larguraColunas, 
  orientacao,
}) => {
  return (
      <div 
        data-testid="TabelaUnitaria"
        className={orientacao=="paisagem" ? "paisagem" : "retrato"}
        style={{display : orientacao=="paisagem" ? "block" : "none"}}
      >
        <table style={{
          borderCollapse: "collapse",
          color:  "#1F1F1F",
          textAlign: "center",
          fontSize: "10px",
          fontFamily: `${fontFamily}, sans-serif`,
          letterSpacing: "-0.12px",
          textTransform: "uppercase",
          width : "fit-content",
          marginBottom: "10px",
        }}>
          <thead>
            <tr 
              className="largura"
              style={{
                  backgroundColor: "#E7E7E7",
                  marginTop : "82px",
                  borderBottom : "solid 1px #757574"
              }}>
              {colunas.map((coluna,index) => (
                <th style={{
                  padding : [...divisorVertical.map(item=>item+1),0].includes(index) ? "5px 5px 5px 12px" : "5px",
                  width: larguraColunas[coluna.field],
                  borderTopLeftRadius: index!=0 ? "0" : "8px",
                  borderTopRightRadius: index!=(colunas.length-1) ? "0" : "8px",
                  borderBottomLeftRadius: index!=0 ? "0" : "8px",
                  borderBottomRightRadius: index!=(colunas.length-1) ? "0" : "8px",
                  borderRight : divisorVertical.includes(index) ? "solid 1px #757574" : "",
                  textAlign: "left",
                  boxSizing : "border-box"
                }} key={coluna.headerName+index}>
                  {coluna.headerComplement && (
                    <div style={{
                      marginBottom: "6px",
                      visibility: coluna.visibleHeaderComplement ? "visible" : "hidden",
                    }}>
                      {coluna.headerComplement}
                    </div>
                  )}

                  <div>{coluna.headerName}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item,index) => (
              <tr 
                data-testid="LinhaTabelaUnitaria"
                key={index}
                style={{
                    borderBottom: "solid 1px #757574",
                }}
              >
                {colunas.map((coluna,index) => (
                  <td 
                      key={`${item.id}-${coluna}-${index}`}
                      style={{
                          justifyContent : "center",
                          alignItems : "center",
                          textAlign: "left",
                          width: larguraColunas[coluna.field],
                          padding : [...divisorVertical.map(item=>item+1),0].includes(index) ? "4px 4px 4px 12px" : "4px",
                          borderRight: divisorVertical.includes(index) ? "solid 1px #757574" : "",
                          boxSizing : "border-box",
                          lineHeight : "140%",
                          minHeight : "24px",
                          wordBreak: coluna.wordBreak ? "break-word" : "normal",
                          breakInside : "avoid"
                      }}
                  >
                    {
                      coluna.field=="id_status_usuario" && <Selecionar_status_usuario_descricao orientacao={orientacao} value={item[coluna.field]} status_usuario_descricao={listas_auxiliares.status_usuario_descricao} />
                    }
                    {
                      coluna.field=="prazo_proxima_coleta"  && <PrazoStyle width="75%" orientacao={orientacao} value={item[coluna.field]} />
                    }
                    {
                      coluna.field=="prazo_proxima_afericao_pa"  && <PrazoStyle orientacao={orientacao} value={item[coluna.field]} />
                    }
                    {
                      coluna.field=="prazo_proxima_consulta"  && <PrazoStyle orientacao={orientacao} value={item[coluna.field]} />
                    }
                    {
                      coluna.field=="prazo_proxima_solicitacao_hemoglobina"  && <PrazoStyle orientacao={orientacao} value={item[coluna.field]} />
                    }
                    {
                      coluna.field === "gestacao_idade_gestacional_primeiro_atendimento" && <StatusIdadeGestacional orientacao={orientacao} value={item[coluna.field]} />
                    }
                    {
                      coluna.field === "gestacao_idade_gestacional_atual" && <StatusIdadeGestacional orientacao={orientacao} value={item.gestacao_idade_gestacional_primeiro_atendimento} />
                    }
                    {
                      coluna.field === "consultas_pre_natal_validas" && <StatusTotalConsultasValidas orientacao={orientacao} values={{
                        gestacao_idade_gestacional_primeiro_atendimento: item.gestacao_idade_gestacional_primeiro_atendimento,
                        consultas_pre_natal_validas: item[coluna.field],
                      }} />
                    }
                    {
                      coluna.field === "dt_consulta_mais_recente" && <StatusDataConsulta orientacao={orientacao} value={item[coluna.field]} />
                    }
                    {
                      coluna.field === "dt_afericao_pressao_mais_recente" && <StatusDataConsulta orientacao={orientacao} value={item[coluna.field]} />
                    }
                    {
                      coluna.field === "dt_solicitacao_hemoglobina_glicada_mais_recente" && <StatusDataConsulta orientacao={orientacao} value={item[coluna.field]} />
                    }
                    {
                      coluna.field === "gestacao_data_dpp" && <StatusDDP orientacao={orientacao} value={item[coluna.field]} />
                    }
                    {
                      coluna.field === "id_exame_hiv_sifilis" && <StatusExameSifilisHIV orientacao={orientacao}
                        value={item[coluna.field]}
                        identificacao_exame_hiv_sifilis={listas_auxiliares.identificacao_exame_sifilis_hiv}
                      />
                    }
                    {
                      coluna.field === "id_atendimento_odontologico" && <StatusAtendimentoOdontologico orientacao={orientacao}
                        value={item[coluna.field]}
                        identificacao_atendimento_odontologico={listas_auxiliares.identificacao_atendimento_odontologico}
                      />
                    }
                    {
                      coluna.field === "datas_doses_penta" && <DatasDoses orientacao={orientacao} value={item[coluna.field]} />
                    }
                    {
                      coluna.field === "datas_doses_polio" && <DatasDoses orientacao={orientacao} value={item[coluna.field]} />
                    }
                    {
                      coluna.field === "id_status_polio" && <StatusEsquemaPolio orientacao={orientacao} value={item[coluna.field]} />
                    }
                    {
                      coluna.field === "id_status_penta" && <StatusEsquemaPenta orientacao={orientacao} value={item[coluna.field]} />
                    }
                    {
                      coluna.field === "id_registro_parto" && formatarRegistroDeParto({ value: item[coluna.field] })
                    }
                    {
                      coluna.field === "cidadao_cpf_dt_nascimento" && formatarCPFOuDataNascimento({ value: item[coluna.field] })
                    }
                    {
                      coluna.field === "consulta_prenatal_ultima_data" && formatarDataNascimento(item[coluna.field])
                    }
                    {
                      coluna.field === "cpf_e_identificacao_condicao" && <CpfEIdentificacaoCondicao value={item[coluna.field]} />
                    }
                    {
                      coluna.field!="id_status_usuario"
                      && coluna.field!="prazo_proxima_coleta"
                      && coluna.field!="prazo_proxima_afericao_pa"
                      && coluna.field!="prazo_proxima_consulta"
                      && coluna.field!="prazo_proxima_solicitacao_hemoglobina"
                      && coluna.field!="gestacao_idade_gestacional_primeiro_atendimento"
                      && coluna.field!="consultas_pre_natal_validas"
                      && coluna.field!="dt_consulta_mais_recente"
                      && coluna.field!="dt_afericao_pressao_mais_recente"
                      && coluna.field!="dt_solicitacao_hemoglobina_glicada_mais_recente"
                      && coluna.field!="gestacao_data_dpp"
                      && coluna.field!="id_exame_hiv_sifilis"
                      && coluna.field!="id_atendimento_odontologico"
                      && coluna.field!="datas_doses_penta"
                      && coluna.field!="datas_doses_polio"
                      && coluna.field!="id_status_polio"
                      && coluna.field!="id_status_penta"
                      && coluna.field!="id_registro_parto"
                      && coluna.field!="gestacao_idade_gestacional_atual"
                      && coluna.field!="cidadao_cpf_dt_nascimento"
                      && coluna.field!="consulta_prenatal_ultima_data"
                      && coluna.field!="cpf_e_identificacao_condicao"
                      && item[coluna.field]
                    }
                    </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };