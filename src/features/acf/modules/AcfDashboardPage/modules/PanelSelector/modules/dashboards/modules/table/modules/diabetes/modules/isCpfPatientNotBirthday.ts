//essa funcao esta considerando que o cpf é uma string de 11 digitos e não contem o caractere '-' para diferenciar da data de nascimento    

export const isCpfPatientNotBirthday = (possibleCpfString: string): boolean => /^(?!([0-9])\1{10})\d{11}$/.test(possibleCpfString) && !possibleCpfString.includes("-");
