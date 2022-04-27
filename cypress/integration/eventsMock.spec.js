describe('events test', () => {
    beforeEach(() => {
        cy.login('user@calendar.be', '12345678');
    });
    
    it('should show the list of events', () => {
        cy.intercept(
            'GET',
            'http://localhost:9000/api/events?limit=9000&offset=0',
            { fixture: 'event.json' }
        );

        cy.visit('http://localhost:3000');
        cy.get('[data-cy=event_title]').should('have.length', 1);
        
        cy.get('[data-cy=event_title]').eq(0).contains('Backend testen');
        cy.get('[data-cy=event_title]').eq(0).click();

        cy.get('[data-cy=edit_title]').should('have.value', 'Backend testen');
        cy.get('[data-cy=edit_description]').should('have.value', 'Controleren of er een robuste api is ontwikkeld');
        cy.get('[data-cy=edit_date]').should('have.value', '2021-12-07');
        cy.get('[data-cy=edit_time]').should('have.value', '14:00');
        cy.get('[data-cy=edit_type]').should('have.value', 'School');

        cy.get('[data-cy=cancel]').click();

    });

    it('should show loading indicator', () => {
        cy.intercept(
            'http://localhost:9000/api/events?limit=9000&offset=0',
            (req) => {
                req.on('response', (res) => {
                    res.setDelay(1000);
                });
            }
        ).as('slowResponse')
        cy.visit('http://localhost:3000');
        cy.get('[data-cy=loading]').should('be.visible');

        cy.wait('@slowResponse');
        cy.get('[data-cy=loading]').should('not.exist');

    });
});