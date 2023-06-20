/// <reference types="Cypress" />

describe('Primeiro acesso', () => {
  context('resolução 1440 x 900', () => {
    beforeEach(() => {
      cy.viewport(1440, 900);
      cy.visit('/');

      cy.contains(/acesso restrito/i).click();

      cy.get('.NavBar_NavBarModalContainer__tePj9').as('desktopModal');
    });

    it('O modal desktop é exibido ao clicar no campo ACESSO RESTRITO da navbar', () => {
      cy.get('@desktopModal').should('be.visible');
    });

    describe('Dentro do modal desktop', () => {
      beforeEach(() => {
        cy.get('@desktopModal')
          .find('.ButtonLight_ButtonLightContainer__w0rNI')
          .as('primeiroAcessoButtonModal');
      });

      it('É exibido o botão de PRIMEIRO ACESSO', () => {
        cy.get('@primeiroAcessoButtonModal')
          .should('be.visible')
          .and('have.text', 'PRIMEIRO ACESSO');
      });

      describe('Ao clicar no botão de PRIMEIRO ACESSO do modal desktop', () => {
        beforeEach(() => {
          cy.get('@primeiroAcessoButtonModal').click();
        });

        it('É exibida a input de email', () => {
          cy.get('input[placeholder="E-mail"]').should('be.visible');
        });

        it('É exibido o botão VOLTAR', () => {
          cy.get('@desktopModal')
            .contains(/voltar/i)
            .should('be.visible');
        });

        it('É exibido o botão PRÓXIMO', () => {
          cy.get('@desktopModal')
            .contains(/próximo/i)
            .should('be.visible');
        });
      });
    });
  });
});
