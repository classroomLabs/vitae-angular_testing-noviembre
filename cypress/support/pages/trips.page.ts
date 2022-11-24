import { interceptGet } from '../interceptors';
export class TripsPage {
  constructor() {
    cy.visit('/trips');
    interceptGet('trips');
    cy.wait('@get_trips');
  }

  getTripsList() {
    return cy.get('app-trips-list > ul li');
  }
  getDestinationInput() {
    return cy.get('input[formcontrolname="destination"]');
  }
  getAgencySelect() {
    return cy.get('select[formcontrolname="agencyId"]');
  }
  getStartDateInput() {
    return cy.get('input[formcontrolname="startDate"]');
  }
  getSubmitButton() {
    return cy.get('button[type="submit"]');
  }

  fillFormOk() {
    this.getDestinationInput().type('Asteroide B612');
    this.getAgencySelect().select('space-y');
    this.getStartDateInput().type('2030-12-31');
  }
}

export function getDestinationInput() {
  return cy.get('input[formcontrolname="destination"]');
}
