import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test('should login successfully', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const openModalButton = page.getByText(/acesso restrito/i);

    await openModalButton.click();

    const showLoginFormButton = page.getByRole('button', { name: /entrar/i });

    await showLoginFormButton.click();

    const cpfInput = page.getByTestId('Modal').getByPlaceholder(/cpf/i);

    await cpfInput.fill(process.env.CPF_LOGIN_TEST || '123.456.789-09');

    const passwordInput = page.getByTestId('Modal').getByPlaceholder(/senha/i);

    await passwordInput.fill(process.env.PASSWORD_LOGIN_TEST || '12345678');

    const loginButton = page.getByRole('button', { name: /entrar/i });

    await loginButton.click();
    await page.waitForURL('http://localhost:3000/inicio', { timeout: 8000 });

    await expect(page).toHaveURL('http://localhost:3000/inicio');
  });
});
