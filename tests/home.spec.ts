import { test, expect } from '@playwright/test';

test.describe('Home', () => {
  test('deve exibir o modal de divulgação do webnar', async ({ page }) => {
    await page.goto('/');

    const modalTitle = page.getByText(/transição de gestão da saúde municipal/i);
    const subscribeButton = page.getByRole('button', { name: /garanta já sua inscrição/i });

    await expect(modalTitle).toBeVisible();
    await expect(subscribeButton).toBeVisible();
    await expect(subscribeButton).toBeEnabled();
  });
});
