/// <reference types="Cypress" />

describe('Recuperação de senha', () => {
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
          .find('.ButtonColor_ButtonColorContainer__FZdLO')
          .as('entrarButtonModal');
      });

      it('É exibido o botão de ENTRAR', () => {
        cy.get('@entrarButtonModal')
          .should('be.visible')
          .and('have.text', 'ENTRAR');
      });

      describe('Ao clicar no botão de ENTRAR do modal desktop', () => {
        beforeEach(() => {
          cy.get('@entrarButtonModal').click();
        });

        it('É exibido o link "Esqueceu sua senha?"', () => {
          cy.get('@desktopModal')
            .contains(/esqueceu sua senha\?/i)
            .should('be.visible');
        });

        describe('Ao clicar no link "Esqueceu sua senha?"', () => {
          beforeEach(() => {
            cy.get('@desktopModal')
              .contains(/esqueceu sua senha\?/i)
              .click();
          });

          it('É exibido o título "Recuperação de senha"', () => {
            cy.get('@desktopModal')
              .contains('Recuperação de senha')
              .should('be.visible');
          });

          it('É exibida a input de email', () => {
            cy.get('input[placeholder*="E-mail"]').should('be.visible');
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
});
