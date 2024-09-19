import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test('should login successfully', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const openModalButton = page.getByText(/acesso restrito/i);

    await openModalButton.click();

    await expect(page.getByTestId('Modal')).toBeVisible();

    const showLoginFormButton = page
      .getByTestId('Modal')
      .getByRole('button', { name: /entrar/i });

    await showLoginFormButton.click();

    await expect(page.getByTestId('Modal')).toBeVisible();

    const cpfInput = page.getByTestId('Modal').getByPlaceholder(/cpf/i);
    const passwordInput = page.getByTestId('Modal').getByPlaceholder(/senha/i);

    await cpfInput.fill(process.env.CPF_LOGIN_TEST || '123.456.789-09');
    await passwordInput.fill(process.env.PASSWORD_LOGIN_TEST || '12345678');

    const loginButton = page
      .getByTestId('Modal')
      .getByRole('button', { name: /entrar/i });

    await loginButton.click();
    await page.waitForURL('http://localhost:3000/inicio', { timeout: 8000 });

    await expect(page).toHaveURL('http://localhost:3000/inicio');
  });
});
