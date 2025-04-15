import { birthdayFormatter, cpfFormatter, cpfOrBirthdayFormatter } from '@/features/acf/modules/AcfDashboardPage/modules/PanelSelector/modules/dashboards/modules/table/modules/diabetes/cpfOrBirthdayFormatter';

describe('cpfFormatter', () => {
  it('formata corretamente um CPF com 11 dígitos', () => {
    expect(cpfFormatter('12345678909')).toBe('123.456.789-09');
  });
  it('retorna o valor inalterado se o formato não for de CPF', () => {
    expect(cpfFormatter('123')).toBe('123'); // regex não bate
  });
});

describe('birthdayFormatter', () => {
  it('formata uma data com timestamp completo corretamente', () => {
    const date = '2023-01-18T00:00:00.000Z';
    expect(birthdayFormatter(date)).toBe('18/01/23');
  });
});

describe('cpfOrBirthdayFormatter', () => {
  it('formata como CPF se o valor tiver 11 dígitos', () => {
    expect(cpfOrBirthdayFormatter('98765432100')).toBe('987.654.321-00');
  });

  it('formata como data se o valor tiver mais de 11 caracteres (data)', () => {
    expect(cpfOrBirthdayFormatter('2023-01-18T00:00:00.000Z')).toBe('18/01/23');
  });

  it('retorna o valor original se não for CPF nem data', () => {
    expect(cpfOrBirthdayFormatter('abc')).toBe('abc');
  });
});
