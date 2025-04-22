import { birthdayFormatter, formatDate, isDate, stringToDate } from "@/common/time";

describe("formatDate", () => {
    it("deve formatar uma data corretamente no formato dd/mm/aa", () => {
        const date = new Date("2023-10-05");
        expect(formatDate(date)).toBe("05/10/23");
    });

    it("deve lidar corretamente com datas no início do mês e do ano em diferentes fusos", () => {
        const date = new Date("2023-01-01T15:00:00+03:00");
        expect(formatDate(date)).toBe("01/01/23");
    });

    it("deve lidar corretamente com datas no final do mês e do ano", () => {
        const date = new Date("2023-12-31T00:00:00Z");
        expect(formatDate(date)).toBe("31/12/23");
    });

    it("deve lidar com anos anteriores a 2000", () => {
        const date = new Date("1999-07-15T00:00:00Z");
        expect(formatDate(date)).toBe("15/07/99");
    });

    it("deve retornar null ao receber uma data inválida", () => {
      const date = new Date("abc");
      expect(formatDate(date)).toBeNull();
  });
});

describe('birthdayFormatter', () => {
    it('formata uma data com timestamp completo corretamente', () => {
      const date = '2023-01-18T00:00:00.000Z';
      expect(birthdayFormatter(date)).toBe('18/01/23');
    });
});

describe('isDate', () => {
  it('deve retornar true para strings de tamanho 10 que contenham "-"', () => {
    expect(isDate('2025-04-17')).toBe(true);
    expect(()=>isDate('1234-56-78')).toThrow();
  });

  it('deve retornar false para strings com menos de 10 caracteres', () => {
    expect(()=>isDate('2025-4-17')).toThrow();
    expect(()=>isDate('')).toThrow();
  });

  it('deve retornar false para strings com mais de 10 caracteres', () => {
    expect(()=>isDate('2025-04-170')).toThrow()
  });

  it('deve retornar false para strings de tamanho 10 sem "-"', () => {
    expect(()=>isDate('2025041701')).toThrow();
    expect(()=>isDate('abcdefghij')).toThrow();
  });
});

describe('stringToDate', () => {
  it('deve converter uma ISO string válida em um objeto Date correto', () => {
    const isoString = '2025-04-17';
    const result = stringToDate(isoString);
    expect(result).toBeInstanceOf(Date);
    expect(result.getTime()).toBe(new Date(isoString).getTime());
  });

  it('deve retornar "Invalid Date" (getTime() = NaN) para uma string não-data qualquer', () => {
    const invalid = stringToDate('isso-não-é-uma-data');
    expect(invalid).toBeInstanceOf(Date);
    expect(invalid.getTime()).toBeNaN();
  });

  it('deve retornar "Invalid Date" para string vazia', () => {
    const empty = stringToDate('');
    expect(empty.getTime()).toBeNaN();
  });
});
