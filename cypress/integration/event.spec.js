describe('Event', () => {

    beforeEach(() => {
        cy.login('user@calendar.be', '12345678');
    });

    it('should add an event', () => {
        cy.visit('http://localhost:3000/events/add');

        cy.get('[data-cy=titel_input]').type('Backend testen');
        cy.get('[data-cy=beschrijving_input]').type('Ik wil een robuuste backend maken');
        cy.get('[data-cy=datum_input]').type('2021-12-15');
        cy.get('[data-cy=tijd_input]').type('12:30');
        cy.get('[data-cy=type_input]').select('Vrije tijd');
        cy.get('[data-cy=herhaling_input]');

        cy.get('[data-cy=submit_event]').click();

        cy.get('[data-cy=event_title]').eq(1).contains('Backend testen');
        cy.get('[data-cy=event_title]').eq(1).click();

        cy.get('[data-cy=reminder_title]').contains('Backend testen begint zometeen');
        cy.get('[data-cy=reminder_date').contains('15-12-2021');
        cy.get('[data-cy=reminder_time').contains('12:30');

        cy.get('[data-cy=cancel]').click();

    });

    it('should remove an event', () => {
        cy.visit('http://localhost:3000');

        cy.get('[data-cy=event_title]').eq(1).click();

        cy.get('[data-cy=delete_event]').click();
        cy.get('[data-cy=event_title]').should('have.length', 1);
    });

    it('should show errors with empty fields', () => {
        cy.visit('http://localhost:3000/events/add');

        cy.get('[data-cy=submit_event]').click();

        cy.get('[data-cy=labelinput_error').should('be.visible');
        cy.get('[data-cy=labelinput_error').eq(0).contains('titel is verplicht');
        cy.get('[data-cy=labelinput_error').eq(1).contains('Datum is verplicht');
        cy.get('[data-cy=labelinput_error').eq(2).contains('Starttijd is verplicht');

        cy.get('[data-cy=labelselect_error').should('be.visible');
        cy.get('[data-cy=labelselect_error').eq(0).contains('type is verplicht');
    });

    it('should edit an event', () => {
        cy.visit('http://localhost:3000');

        cy.get('[data-cy=event_title]').eq(0).click();

        cy.get('[data-cy=edit_title]').clear();
        cy.get('[data-cy=edit_title]').type('Kruipen');
        cy.get('[data-cy=edit_description]').type('Kruipen tot aan de meet');
        cy.get('[data-cy=update_event]').click();

        cy.get('[data-cy=event_title]').eq(0).click();

        cy.get('[data-cy=edit_title]').should('have.value', 'Kruipen');
        cy.get('[data-cy=edit_description]').should('have.value', 'Kruipen tot aan de meet');

        cy.get('[data-cy=edit_title]').clear();
        cy.get('[data-cy=edit_title]').type('Hardlopen');
        cy.get('[data-cy=edit_description]').clear();
        cy.get('[data-cy=update_event]').click();

        cy.get('[data-cy=event_title]').eq(0).click();

        cy.get('[data-cy=edit_title]').should('have.value', 'Hardlopen');
        cy.get('[data-cy=edit_description]').should('have.value', '');
    });
});