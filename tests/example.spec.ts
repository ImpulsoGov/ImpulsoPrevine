import { test, expect } from "@playwright/test"; 

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe.parallel('Componente NavBarMounted', () => {
  const routes = [
    { name: 'Quem Somos', path: '/quem-somos' },
    { name: 'Apoio aos Municípios', path: '/apoio' },
    { name: 'Dados do SISAB', path: '/analise' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Blog', path: '/blog' }
  ];

  test.beforeEach(async ({ page }) => {
    // Navega de volta para a página inicial antes de cada teste
    await page.goto(BASE_URL);
  });

  for (const { name, path } of routes) {
    test(`Deve redirecionar para a página "${path}" quando clicar em "${name}"`, async ({ page }) => {
      const link = page.getByRole('link', { name, exact: true }).first();
      await link.click();
      await page.waitForURL(`${BASE_URL}${path}`);
      expect(page.url()).toBe(`${BASE_URL}${path}`);
    });
  }
});