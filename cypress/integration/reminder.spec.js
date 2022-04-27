describe('Remidnder', () => {

    beforeEach(() => {
        cy.login('user@calendar.be', '12345678');
    });

    it('should add a reminder with description', () => {
        cy.visit('http://localhost:3000');
        
        cy.get('[data-cy=event_title]').eq(0).click();

        cy.get('[data-cy=create_reminder]').click();

        cy.get('[data-cy=description_input]').type('Backend niet vergeten testen');
        cy.get('[data-cy=date_input]').type('2021-12-06');
        cy.get('[data-cy=time_input]').type('13:00');

        cy.get('[data-cy=submit_reminder]').click();

        cy.get('[data-cy=reminder_title]').eq(0).contains('Backend niet vergeten testen');
        cy.get('[data-cy=reminder_date]').eq(0).contains('06-12-2021');
        cy.get('[data-cy=reminder_time]').eq(0).contains('13:00');
    });

    it('should add a reminder with no description', () => {
        cy.visit('http://localhost:3000');
        
        cy.get('[data-cy=event_title]').eq(0).click();

        cy.get('[data-cy=create_reminder]').click();

        cy.get('[data-cy=date_input]').type('2021-12-06');
        cy.get('[data-cy=time_input]').type('13:30');

        cy.get('[data-cy=submit_reminder]').click();

        cy.get('[data-cy=reminder_title]').eq(1).contains('Geen beschrijving');
        cy.get('[data-cy=reminder_date]').eq(1).contains('06-12-2021');
        cy.get('[data-cy=reminder_time]').eq(1).contains('13:30');
    });

    it('should delete 2 reminders', () => {
        cy.visit('http://localhost:3000');
        
        cy.get('[data-cy=event_title]').eq(0).click();

        cy.get('[data-cy=reminder]').eq(0).click()

        cy.get('[data-cy=delete_reminder]').click();

        cy.get('[data-cy=reminder]').eq(0).click()

        cy.get('[data-cy=delete_reminder]').click();
    });
});