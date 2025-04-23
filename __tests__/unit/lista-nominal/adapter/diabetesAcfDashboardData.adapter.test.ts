import { cpfOrDate  } from "@/features/acf/modules/AcfDashboardPage/modules/PanelSelector/modules/dashboards/modules/table/modules/diabetes/diabetesAcfDashboardData.adapter";

describe('cpfOrDate', () => {
    it('retorna null quando a entrada for null', () => {
        expect(cpfOrDate(null)).toBeNull();
    })

    it('retorna o próprio CPF quando a string representa um cpf', () => {
        const cpf = '12345678901';
        expect(cpfOrDate(cpf)).toBe(cpf);
    })

    it('converte para Date quando string representa uma data', () => {
        expect(cpfOrDate('1985-12-17')).toEqual(new Date('1985-12-17'));
        expect(cpfOrDate('1985-12-17T00:00:00Z')).toEqual(new Date('1985-12-17T00:00:00Z'));
        expect(cpfOrDate('2022-12-31T15:00:00Z')).toEqual(new Date('2022-12-31T15:00:00Z'));
    })

    it('retorna a própria string quando ela não é uma data nem um cpf', () => {
        expect(cpfOrDate('')).toBe('');
        expect(cpfOrDate('foo-bar')).toBe('foo-bar');
    })
})
