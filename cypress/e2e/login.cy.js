/// <reference types='Cypress' />

const CPF_LOGIN_TEST = Cypress.env('CPF_LOGIN_TEST');
const PASSWORD_LOGIN_TEST = Cypress.env('PASSWORD_LOGIN_TEST');

describe('Login', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  it('should login successfully', async () => {
    cy.visit('http://localhost:3000');

    // const openModalButton = cy.contains('div', 'ACESSO RESTRITO');
    // openModalButton.click();

    // cy.get('[data-testid="Modal"]').should('be.visible');

    // const showLoginButton = cy.get('button').contains('ENTRAR');
    // showLoginButton.click();

    // cy.get('[data-testid="Modal"]').should('be.visible');

    // cy.get('input[placeholder="CPF"]').type(CPF_LOGIN_TEST || '12345678909');
    // cy.get('input[placeholder="Senha"]').type(PASSWORD_LOGIN_TEST || '12345678');

    // const loginButton = cy.get('button').contains('ENTRAR');
    // loginButton.click();

    // cy.url({ timeout: 8000 }).should('eq', 'http://localhost:3000/inicio');

    const openModalButton = cy.findByText(/acesso restrito/i);
    openModalButton.click();

    cy.findByTestId('Modal').should('be.visible');

    cy.findByRole('button', { name: /entrar/i }).click();

    cy.findByTestId('Modal').should('be.visible');

    const cpfInput = cy.findByTestId('Modal').findByPlaceholderText('CPF');
    cpfInput.type(CPF_LOGIN_TEST || '12345678909');

    const passwordInput = cy.findByTestId('Modal').findByPlaceholderText(/senha/i);
    passwordInput.type(PASSWORD_LOGIN_TEST || '12345678');

    const loginButton = cy.findByRole('button', { name: /entrar/i });
    loginButton.click();

    cy.url({ timeout: 8000 }).should('eq', 'http://localhost:3000/inicio');
  });
});
