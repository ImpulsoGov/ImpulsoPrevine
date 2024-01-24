import { cpf } from 'cpf-cnpj-validator';
import validator from 'validator';

export const Tratamento = async (data, setDadosReq) => {
  if (data) {
    const TratarNome = nome => nome.split(' ').map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()).join(' ').trim();
    const TratarINE = equipe => equipe.toString().replace(/[^0-9]/g, '').padStart(10, '0');
    const TratarMail = mail => mail.replaceAll(' ', '');
    const TratarCPF = cpf => cpf.toString().replace(/[^0-9]/g, '');
    const TratarTelefone = num => num.toString().replace(/[^0-9]/g, '');
    const dadosTratados = data.map(usuario => {
      return {
        'nome': TratarNome(usuario.nome),
        'equipe': TratarINE(usuario.equipe),
        'mail': TratarMail(usuario.mail),
        'cpf': TratarCPF(usuario.cpf),
        'telefone': TratarTelefone(usuario.telefone),
        'cargo': usuario.cargo,
        'municipio_uf': usuario.municipio_uf,
        'perfil': usuario.perfil,
        'whatsapp': usuario.whatsapp
      };
    });
    setDadosReq(dadosTratados);
    return dadosTratados;
  }

};

export const Validacao = async data => {
  const ValidarExistencia = input => input !== null || input !== undefined;
  const ValidarNome = nome => /^[A-ZÀ-ÿ'][a-zÀ-ÿ´^~']*( [A-ZÀ-ÿ'][a-zÀ-ÿ´^~']*)*$/.test(nome) && ValidarExistencia(nome);
  const ValidarINE = INE => /^\d{10}$/.test(INE) && ValidarExistencia(INE);
  const ValidarMail = mail => validator.isEmail(mail) && ValidarExistencia(mail);
  const ValidarCPF = CPF => cpf.isValid(CPF) && ValidarExistencia(CPF);
  const ValidarTelefone = numero => /^\d{11}$/.test(numero) && ValidarExistencia(numero);
  const ValidarWP = wp => (wp == '1' || wp == '0') && ValidarExistencia(wp);
  const validacoes = [];
  const validacao = true;
  data.forEach(usuario => {
    const usuario_validacoes = {
      usuario: usuario.nome,
      nome: true,
      equipe: true,
      mail: true,
      cpf: true,
      telefone: true,
      municipio_uf: true,
      cargo: true,
      whatsapp: true,
      perfil: true
    };
    const validadores = {
      nome: ValidarNome,
      equipe: ValidarINE,
      mail: ValidarMail,
      cpf: ValidarCPF,
      telefone: ValidarTelefone,
      cargo: ValidarExistencia,
      municipio_uf: ValidarExistencia,
      whatsapp: ValidarWP,
      perfil: ValidarExistencia,
    };
    Object.keys(usuario).forEach(chave => {
      if (!validadores[chave](usuario[chave])) {
        usuario_validacoes[chave] = false;
        validacao = false;
      }
    });
    validacoes.push(usuario_validacoes);
  });
  return { 'validacao': validacao, data: validacoes };
};
