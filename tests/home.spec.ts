import { test, expect } from "@chromatic-com/playwright";

test.describe('NavBarMounted Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('http://localhost:3000');
  });

  test('should redirect to "/quem-somos" when clicking on "Quem somos"', async ({ page }) => {
    const quemSomosLink = page.getByRole('link', { name: 'Quem Somos' }).first();
    await quemSomosLink.click();
    await page.waitForURL('http://localhost:3000/quem-somos');
    expect(page.url()).toBe('http://localhost:3000/quem-somos')
  });

  test('should redirect to "/apoio" when clicking on "Apoio aos Municípios"', async ({ page }) => {
    const apoioLink = page.getByRole('link', { name: 'Apoio aos Municípios' }).first();
    await apoioLink.click();
    await page.waitForURL('http://localhost:3000/apoio');
    expect(page.url()).toBe('http://localhost:3000/apoio');
  });

  
  test('should redirect to "/analise" when clicking on "Dados do SISAB"', async ({ page }) => {
    const analiseLink = page.getByRole('link', { name: 'Dados do SISAB' }).first();
    await analiseLink.click();
    await page.waitForURL('http://localhost:3000/analise');
    expect(page.url()).toBe('http://localhost:3000/analise');
  });

  test('should redirect to "/faq" when clicking on "FAQ"', async ({ page }) => {
    const analiseLink = page.getByRole('link', { name: 'FAQ' }).first();
    await analiseLink.click();
    await page.waitForURL('http://localhost:3000/faq');
    expect(page.url()).toBe('http://localhost:3000/faq');
  });

  test('should redirect to "/blog" when clicking on "Blog"', async ({ page }) => {
    const analiseLink = page.getByRole('link', { name: 'Blog' }).first();
    await analiseLink.click();
    await page.waitForURL('http://localhost:3000/blog');
    expect(page.url()).toBe('http://localhost:3000/blog');
  });
});