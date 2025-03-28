import { test, expect, type Page } from "@playwright/test";

//TODO: Pensar em como lidar com essa base URL
const baseUrl = "http://localhost:3000";
const pageUrl = `${baseUrl}/lista-nominal`;

const login = async ({ page }: { page: Page }) => {
    await page.goto(`${baseUrl}/`);
    await page.getByText("ACESSO RESTRITO", {}).first().click();
    await page.getByRole('button', { name: 'ENTRAR' }).click();
    await page.getByRole('textbox', { name: 'CPF' }).fill(process.env.userTest || "000.000.000-00");
    await page
        .getByRole('textbox', { name: 'Senha' })
        .fill(process.env.userTestPassword || "123456");
    await Promise.all([
        page.getByRole('button', { name: 'ENTRAR' }).click()
    ]);
    await expect(page.getByText("Boas vindas", )).toBeVisible({ timeout: 100000 });
};

test.describe("Testes de renderização do componente Table no ListContainer", () => {
    test.beforeEach(async ({ page }) => {
        // Navegue para a página onde o ListContainer é renderizado
        await login({ page });
    });

    test("Deve renderizar a tabela usando data-testid", async ({ page }) => {
        await page.goto(pageUrl);

        await page.getByText("Listas", { exact: true}).click();

        // Procura pela tabela que possui o data-testid "list-table"
        const table = page.locator('[data-testid="list-table"]');
        await expect(table).toBeVisible();
    });
});
