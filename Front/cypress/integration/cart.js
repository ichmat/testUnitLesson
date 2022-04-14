describe('Test Home', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
      })
    
      it('load home', () => {
        cy.contains('Menu', { timeout: 10000 });
        cy.get(".product").its('length').should('be.gte', 1)
      })
  })
