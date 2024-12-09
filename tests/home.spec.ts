import { test, expect } from "@chromatic-com/playwright";

test.describe('Home', () => {
  console.log('test.describe');
  test('deve exibir o modal de divulgação do webnar', async ({ page }) => {
    console.log('test start');
    await page.goto('/');

    const modalTitle = page.getByText(/transição de gestão da saúde municipal/i);
    const subscribeButton = page.getByRole('button', { name: /garanta já sua inscrição/i });

    await expect(modalTitle).toBeVisible();
    await expect(subscribeButton).toBeVisible();
    await expect(subscribeButton).toBeEnabled();
    console.log('test end');
  });
});
