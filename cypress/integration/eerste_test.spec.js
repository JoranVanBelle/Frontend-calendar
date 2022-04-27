describe('Mijn eerste test', () => {
    it('should run the application', () => {
        cy.visit('http://localhost:3000');
        cy.get('h1').should('exist');
    });

    it('should login', () => {
        cy.login('user@calendar.be', '12345678');
    })
});