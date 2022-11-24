import { TripsPage } from 'cypress/support/pages/trips.page';

describe('Given the Page Trips', () => {
  let tripsPage: TripsPage;
  before(() => {
    tripsPage = new TripsPage();
  });
  context('when the page is loaded', () => {
    it('then displays 5 elements', () => {
      tripsPage.getTripsList().should('have.length', 5);
    });
  });
  context('when filling a new trip', () => {
    beforeEach(() => {
      // tripsPage.getDestinationInput().type('Asteroide B612');
      // tripsPage.getAgencySelect().select('space-y');
      // tripsPage.getStartDateInput().type('2030-12-31');
      tripsPage.fillFormOk();
    });
    it('should enable submit button', () => {
      tripsPage.getSubmitButton().should('not.be.disabled');
    });
  });
  context('when filling a new trip without destination', () => {
    beforeEach(() => {
      tripsPage.getDestinationInput().clear();
      tripsPage.getAgencySelect().select('space-y');
      tripsPage.getStartDateInput().type('2030-12-31');
    });
    it('should disable submit button', () => {
      tripsPage.getSubmitButton().should('be.disabled');
    });
  });
});
