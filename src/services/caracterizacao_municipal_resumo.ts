import axios from "axios";
import { API_URL_DADOS_PUBLICOS } from "@constants/API_URL";

interface descricoesType {
  municipio_tipologia : string,
  municipio_populacao_2020 : string,
  equipe_total :  string,
  cadastro_parametro : string,
  cadastros_equipes_validas : string,
  cadastros_equipes_validas_com_ponderacao : string,
}

const CaracterizacaoMunicipalResumo = async (municipio_uf : string) => {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: API_URL_DADOS_PUBLICOS + `impulsoprevine/caracterizacao_municipal/resumo?municipio_uf=${municipio_uf}`
  };
  const res = await axios(config)
    .then(function (response) {
      const responseCard = [] as any[]
      if (response?.data) Object?.keys(response.data[0]).forEach(chave => {
        const chaves = ['municipio_populacao_2020','municipio_tipologia','equipe_total','cadastro_parametro','cadastros_equipes_validas','cadastros_equipes_validas_com_ponderacao']
        const descricoes = {
          'municipio_tipologia' : 'Tipologia',
          'municipio_populacao_2020' : 'População IBGE (2020)',
          'equipe_total' : 'Nº total de equipes' ,
          'cadastro_parametro' : 'Parâmetro',
          'cadastros_equipes_validas' : 'Nº de cadastros das equipes válidas',
          'cadastros_equipes_validas_com_ponderacao' : 'Nº de cadastros vulneráveis das equipes válidas',
        } as descricoesType
        if (chave === 'municipio_tipologia') {
          const valor = response.data[0][chave];
          if (valor.startsWith('Intermediario')) {
            // Se o valor começar com "Intermediario", quebre a linha
            responseCard.push({ descricao: descricoes[chave], valor: valor.replace('Intermediario', 'Intermediario \n') });
          
          } else {
            responseCard.push({ descricao: descricoes[chave], valor });
          }
        } else if (chaves.includes(chave)) {
          responseCard.push({ descricao: descricoes[chave as keyof descricoesType], valor: response.data[0][chave].toLocaleString('pt-BR') });
        }
      })
      return responseCard;
    })
    .catch(function (error) {
      return error.response;
    });
  return res
}

export { CaracterizacaoMunicipalResumo }
