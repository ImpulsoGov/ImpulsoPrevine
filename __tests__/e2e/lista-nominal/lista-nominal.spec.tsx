import { type Page, expect, test } from "@playwright/test";

//TODO: Pensar em como lidar com essa base URL
const baseUrl = process.env.DEPLOY_URL ;
const pageUrl = `${baseUrl}/lista-nominal`;

const login = async ({ page }: { page: Page }) => {
    await page.goto(`${baseUrl}/`);
    const button =  page.locator('div[class*="__NavBarLogin"]').filter({ hasText: "ACESSO RESTRITO" });
    button.waitFor({ state: "visible", timeout: 200000 });
    await button.click();
    await page.getByRole('button', { name: 'ENTRAR' }).click();
    await page.getByRole('textbox', { name: 'CPF' }).fill(process.env.TEST_USER || "000.000.000-00");
    await page
        .getByRole('textbox', { name: 'Senha' })
        .fill(process.env.TEST_USER_PASSWORD || "123456");
    await Promise.all([
        page.getByRole('button', { name: 'ENTRAR' }).click()
    ]);
    await expect(page.getByText("Boas vindas", )).toBeVisible({ timeout: 200000 });
};

test.describe("Testes de renderização do componente Table no ListContainer", () => {
    test.beforeEach(async ({ page }) => {
        // Navegue para a página onde o ListContainer é renderizado
        await login({ page });
    });

    test("Deve renderizar a tabela usando data-testid", async ({ page }) => {
        await page.goto(pageUrl);

        // Procura pela tabela que possui o data-testid "list-table"
        const table = page.locator('[data-testid="list-table"]');
        await expect(table).toBeVisible();
    });
});
