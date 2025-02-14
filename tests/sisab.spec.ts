import { test, expect } from "@playwright/test";

test.describe("Navegação da tela de dados públicos", () => {
	test("Deve acessar a área aberta e renderizar todos os componentes", async ({
		page,
	}) => {
		await page.goto("http://localhost:3000/");
		await page.getByRole("link", { name: "Dados do SISAB" }).click();
		await expect(page.getByText("Analise os resultados do")).toBeVisible();
		await expect(page.getByText("Confira gratuitamente uma")).toBeVisible();
		await expect(page.getByText("Os dados exibidos nessa pá")).toBeVisible();
		await expect(
			page.getByText(
				"Indicadores de Desempenho Compare resultados dos 7 indicadores entre um",
			),
		).toBeVisible();
		await expect(
			page.getByText(
				"Capitação Ponderada - Cadastros Acompanhe a evolução nos cadastros de cada",
			),
		).toBeVisible();
		await expect(
			page.getByText(
				"Incentivos a Ações Estratégicas Confira o histórico de repasses e as ações que",
			),
		).toBeVisible();
	});

	test("Deve acessar a seção indicadores de desempenho e interagir com os gráficos", async ({
		page,
	}) => {
		await page.goto("http://localhost:3000/analise");
		await page.getByRole("link", { name: "INDICADORES DE DESEMPENHO" }).click();
		await expect(page.locator("canvas").first()).toBeVisible();
		await page.locator("select").selectOption("2024.Q1");
		await expect(page.locator("canvas").first()).toBeVisible();
		await expect(page.locator("canvas").nth(1)).toBeVisible();
		await page.getByText('Indicador de Desempenho▼').click();
		await expect(
			page.getByRole("checkbox", { name: "Gestantes Saúde Bucal" }),
		).toBeChecked();
		await expect(page.locator("canvas").nth(1)).toBeVisible();
	});
});


