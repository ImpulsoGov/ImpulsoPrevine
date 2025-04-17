import { isDate, stringToDate } from '@/common/time'
import { patientCpfOrBirthdayAdapter  } from "@/features/acf/modules/AcfDashboardPage/modules/PanelSelector/modules/dashboards/modules/table/modules/diabetes/diabetesAcfDashboardData.adapter";
import { isCpfPatientNotBirthday } from '@/features/acf/modules/AcfDashboardPage/modules/PanelSelector/modules/dashboards/modules/table/modules/diabetes/modules/isCpfPatientNotBirthday';

jest.mock('@/common/time', () => ({
  __esModule: true,
  isDate: jest.fn(),
  stringToDate: jest.fn(),
}))

jest.mock('@/features/acf/modules/AcfDashboardPage/modules/PanelSelector/modules/dashboards/modules/table/modules/diabetes/modules/isCpfPatientNotBirthday', () => ({
    __esModule: true,
    isCpfPatientNotBirthday: jest.fn(),
}))

describe('patientCpfOrBirthdayAdapter', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('retorna null quando a entrada for null', () => {
        expect(patientCpfOrBirthdayAdapter(null)).toBeNull();
    })

    it('retorna null quando a string for vazia', () => {
        (isCpfPatientNotBirthday as jest.Mock).mockReturnValue(false);
        expect(patientCpfOrBirthdayAdapter('')).toBeNull();
    })

    it('retorna o próprio CPF quando isCpfPatientNotBirthday for true', () => {
        (isCpfPatientNotBirthday as jest.Mock).mockReturnValue(true);
        const cpf = '12345678901';
        expect(patientCpfOrBirthdayAdapter(cpf)).toBe(cpf);
        expect(isCpfPatientNotBirthday).toHaveBeenCalledWith(cpf);
    })

    it('converte para Date quando isDate for true', () => {
        (isCpfPatientNotBirthday as jest.Mock).mockReturnValue(false);
        (isDate as jest.Mock).mockReturnValue(true);
        const input = '1985-12-17';
        const fakeDate: Date = new Date(input);
        (stringToDate as jest.Mock).mockReturnValue(fakeDate);

        const result = patientCpfOrBirthdayAdapter(input);
        expect(isDate).toHaveBeenCalledWith(input);
        expect(stringToDate).toHaveBeenCalledWith(input);
        expect(result).toBe(fakeDate);
    })

    it('retorna null quando não for CPF nem data', () => {
        (isCpfPatientNotBirthday as jest.Mock).mockReturnValue(false);
        (isDate as jest.Mock).mockReturnValue(false);
        expect(patientCpfOrBirthdayAdapter('foo-bar')).toBeNull();
    })

    it('captura erro interno e retorna null', () => {
        (isCpfPatientNotBirthday as jest.Mock).mockReturnValue(false);
        (isDate as jest.Mock).mockImplementation(() => { throw new Error('boom') });
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

        expect(patientCpfOrBirthdayAdapter('1985-12-17')).toBeNull();
        expect(consoleError).toHaveBeenCalledWith(
            'Erro ao converter a data de nascimento:',
            expect.any(Error),
        );

        consoleError.mockRestore();
    })
})
