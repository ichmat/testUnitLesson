describe('Test Cart', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
      });
    
      it('go to cart', () => {
        cy.contains('Aller sur panier').click();
        cy.contains('Votre pannier', { timeout: 10000 });
      });

      it('load home', () => {
        cy.contains('Menu', { timeout: 10000 });
        cy.get(".product").its('length').should('be.gte', 1);
      });

      it('add product to cart and remove it', () => {
        cy.contains('Menu', { timeout: 10000 });
        cy.contains('Figurine de Morty Smith').parent().click();
        cy.get('input').first().focus().clear().type('{del}{moveToEnd}5');
        cy.contains('Ajouter au panier').click();
        cy.contains('Enregistré dans le panier', { timeout: 10000 });
        cy.contains('Retour').click();
        cy.contains('Aller sur panier').click();
        cy.contains('Votre pannier', { timeout: 10000 });
        cy.contains('Figurine de Morty Smith');
        cy.get('button').first().click();
        cy.contains('Produit bien supprimé', { timeout: 10000 });
        cy.contains('Votre pannier', { timeout: 10000 });
        cy.get('.product').should('not.exist');
      });

      it('add product which does not have quantity', () => {
        cy.contains('Menu', { timeout: 10000 });
        cy.contains('Figurine de Rick Sanchez').parent().click();
        cy.get('input').first().focus().clear().type('{del}{moveToEnd}5');
        cy.contains('Ajouter au panier').click();
        cy.contains('Trop de quantité', { timeout: 10000 });
        cy.contains('Retour').click();
        cy.contains('Aller sur panier').click();
        cy.contains('Votre pannier', { timeout: 10000 });
        cy.get('.product').should('not.exist');
      });

      it('add product with too much quantity', () => {
        cy.contains('Menu', { timeout: 10000 });
        cy.contains('Figurine de Morty Smith').parent().click();
        cy.get('input').first().focus().clear().type('{del}{moveToEnd}10');
        cy.contains('Ajouter au panier').click();
        cy.contains('Enregistré dans le panier', { timeout: 10000 });
        cy.contains('Ajouter au panier').click();
        cy.get('input').first().focus().clear().type('{del}{moveToEnd}30');
        cy.contains('Ajouter au panier').click();
        cy.contains('Trop de quantité', { timeout: 10000 });
        cy.contains('Retour').click();
        cy.contains('Aller sur panier').click();
        cy.contains('Votre pannier', { timeout: 10000 });
        cy.contains('Figurine de Morty Smith');
        cy.get('button').first().click();
        cy.contains('Produit bien supprimé', { timeout: 10000 });
        cy.contains('Votre pannier', { timeout: 10000 });
        cy.get('.product').should('not.exist');
      });
  })
