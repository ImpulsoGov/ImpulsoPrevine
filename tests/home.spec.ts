import { test, expect } from "@chromatic-com/playwright";

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('Componente NavBarMounted', () => {
  test.beforeEach(async ({ page }) => {
    // Navega de volta para a página inicial antes de cada teste
    await page.goto(BASE_URL);
  });

  test('Deve redirecionar para a página "/quem-somos" quando clicar em "Quem somos"', async ({ page }) => {
    const quemSomosLink = page.getByRole('link', { name: 'Quem Somos' }).first();
    await quemSomosLink.click();
    await page.waitForURL(`${BASE_URL}/quem-somos`);
    expect(page.url()).toBe(`${BASE_URL}/quem-somos`);
  });

  test('Deve redirecionar para página "/apoio" quando clicar em "Apoio aos Municípios"', async ({ page }) => {
    const apoioLink = page.getByRole('link', { name: 'Apoio aos Municípios' }).first();
    await apoioLink.click();
    await page.waitForURL(`${BASE_URL}/apoio`);
    expect(page.url()).toBe(`${BASE_URL}/apoio`);
  });

  test('Deve redirecionar para a página "/analise" quando clicar em "Dados do SISAB"', async ({ page }) => {
    const analiseLink = page.getByRole('link', { name: 'Dados do SISAB' }).first();
    await analiseLink.click();
    await page.waitForURL(`${BASE_URL}/analise`);
    expect(page.url()).toBe(`${BASE_URL}/analise`);
  });

  test('Deve redirecionar para a página "/faq" quando clicar em "FAQ"', async ({ page }) => {
    const faqLink = page.getByRole('link', { name: 'FAQ' }).first();
    await faqLink.click();
    await page.waitForURL(`${BASE_URL}/faq`);
    expect(page.url()).toBe(`${BASE_URL}/faq`);
  });

  test('Deve redirecionar para a página "/blog" quando clicar em "Blog"', async ({ page }) => {
    const blogLink = page.getByRole('link', { name: 'Blog' }).first();
    await blogLink.click();
    await page.waitForURL(`${BASE_URL}/blog`);
    expect(page.url()).toBe(`${BASE_URL}/blog`);
  });
});