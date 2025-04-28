import { cpfFormatter } from "@/common/formatters/cpf";

describe('cpfFormatter', () => {
  it('formata corretamente um CPF com 11 dígitos', () => {
    expect(cpfFormatter('12345678909')).toBe('123.456.789-09');
  });
  it('retorna o valor inalterado se o formato não for de CPF', () => {
    expect(cpfFormatter('123')).toBe('123');
  });
});