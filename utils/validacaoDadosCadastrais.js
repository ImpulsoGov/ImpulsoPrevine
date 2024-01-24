import { cpf } from 'cpf-cnpj-validator';
import validator from 'validator';

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
