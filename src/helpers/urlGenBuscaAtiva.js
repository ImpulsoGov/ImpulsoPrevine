const genParamEquipe = (token, municipioUf, equipe, faixaEtaria) => {
    const params = {
        token: token,
        municipio_uf: municipioUf,
        equipe: equipe,
        faixa_etaria: faixaEtaria,
    };
    var encodedParams = encodeURIComponent(JSON.stringify(params));
    return encodedParams;
};

const urlGenBuscaAtivaEquipe = (
    dataStudio,
    token,
    municipioUf,
    equipe,
    cargo,
    faixaEtaria,
) => {
    if (cargo == "Coordenação de Equipe" || cargo == "Impulser") {
        const baseURL = dataStudio;
        const param = genParamEquipe(token, municipioUf, equipe, faixaEtaria);
        const link = baseURL + param;
        return link;
    } else {
        return "";
    }
};

const genParamCoordenacaoAPS = (token, municipioUf, faixaEtaria) => {
    const params = {
        token: token,
        municipio_uf: municipioUf,
        faixa_etaria: faixaEtaria,
    };
    var encodedParams = encodeURIComponent(JSON.stringify(params));
    return encodedParams;
};

const urlGenBuscaAtivaCoordenacaoAPS = (
    dataStudio,
    token,
    municipioUf,
    cargo,
    faixaEtaria,
) => {
    if (cargo == "Coordenação APS" || cargo == "Impulser") {
        const baseURL = dataStudio;
        const param = genParamCoordenacaoAPS(token, municipioUf, faixaEtaria);
        const link = baseURL + param;
        return link;
    } else {
        return "";
    }
};

const genParamCoordenacaoAPSGraficos = (token, municipioUf) => {
    const params = {
        token: token,
        municipio_uf: municipioUf,
    };
    var encodedParams = encodeURIComponent(JSON.stringify(params));
    return encodedParams;
};

const urlGenBuscaAtivaCoordenacaoAPSGraficos = (
    dataStudio,
    token,
    municipioUf,
    cargo,
) => {
    if (cargo == "Coordenação APS" || cargo == "Impulser") {
        const baseURL = dataStudio;
        const param = genParamCoordenacaoAPSGraficos(token, municipioUf);
        const link = baseURL + param;
        return link;
    } else {
        return "";
    }
};

export {
    urlGenBuscaAtivaCoordenacaoAPS,
    urlGenBuscaAtivaEquipe,
    urlGenBuscaAtivaCoordenacaoAPSGraficos,
};
