import { dateFormatter, dateRenderCell } from '@features/acf/modules/AcfDashboardPage/modules/PanelSelector/modules/dashboards/modules/table/modules/diabetes/dateFormatter';

// mock explícito dos helpers
jest.mock('@/helpers/lista-nominal/renderCell', () => ({
  renderDateTagCell: jest.fn((value) => `rendered-${value}`),
}));

jest.mock('@/features/acf/modules/AcfDashboardPage/modules/PanelSelector/modules/dashboards/modules/table/modules/diabetes/iconDetailsMap', () => ({
  iconDetailsMap: {},
}));

describe('dateFormatter', () => {
  it('formata corretamente uma data completa no formato ISO', () => {
    const input = '2023-12-15T00:00:00.000Z';
    const result = dateFormatter(input);
    expect(result).toBe('15/12/23');
  });
});

describe('dateRenderCell', () => {
  it('chama renderDateTagCell quando value é null', () => {
    const result = dateRenderCell(null as any);
    expect(result).toHaveProperty('type', 'div');
  });

  it('formata corretamente uma data completa no formato ISO', () => {
    const input = '2024-12-17T00:00:00.000Z';
    const result = dateRenderCell(input);
    expect(result).toBe('17/12/24');
  });
})
