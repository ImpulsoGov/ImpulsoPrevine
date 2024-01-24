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
