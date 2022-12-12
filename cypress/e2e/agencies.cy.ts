describe('The agencies page with 4 items', () => {
  beforeEach(() => {
    interceptGet('agencies');
    interceptGet('agency-ranges');
    interceptGet('agency-statuses');
    cy.visit('/agencies');
    cy.wait('@get_agencies');
    cy.wait('@get_agency-ranges');
    cy.wait('@get_agency-statuses');
  });
  it('should have title show 4 agencies', () => {
    cy.get('header').should('contain', '4 agencies');
  });
  it('should call delete when click on remove button', () => {
    interceptDelete('agencies');
    cy.get(':nth-child(1) > :nth-child(4) > button').click();
    cy.get('@delete_agencies').its('response.statusCode').should('eq', 204);
  });
  it('should post when fill the form and click on submit button', () => {
    interceptPost('agencies');
    cy.get('#name').type('Agency 7');
    cy.get('#Interplanetary').click();
    cy.get('#Active').click();
    cy.get('form > button').contains('Submit').click();
    const payload = {
      id: 'agency-7',
      name: 'Agency 7',
      range: 'Interplanetary',
      status: 'Active',
    };
    cy.get('@post_agencies').its('request.body').should('deep.equal', payload);
  });
});

function interceptGet(endPoint: string) {
  const url = Cypress.env('apiUrl') + '/' + endPoint;
  const response = { fixture: 'data/' + endPoint };
  const alias = 'get_' + endPoint;
  cy.intercept('get', url, response).as(alias);
}

function interceptDelete(endPoint: string) {
  const url = Cypress.env('apiUrl') + '/' + endPoint + '/*';
  const response = { statusCode: 204 };
  const alias = 'delete_' + endPoint;
  cy.intercept('delete', url, response).as(alias);
}

function interceptPost(endPoint: string) {
  const lowerEndPoint = endPoint.toLowerCase();
  const url = Cypress.env('apiUrl') + '/' + lowerEndPoint;
  const response = { statusCode: 201, body: {} };
  cy.intercept('post', url, response).as('post_' + endPoint);
}
