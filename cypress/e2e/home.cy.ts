describe('The Home page', () => {
  before(() => {
    cy.visit('/');
    cy.log('runs only once before all the tests');
  });

  beforeEach(() => {
    cy.log('runs once before each tests');
  });

  it('Contains title', () => {
    cy.contains('anguLab');
  });

  it('contains a nav element', () => {
    cy.get('nav');
  });

  it('should have a nav element visible', () => {
    cy.get('nav').should('be.visible');
  });

  it('should display an unordered list inside the main', () => {
    cy.get('main ul').should('be.visible');
  });

  it('should navigate to agencies page', () => {
    cy.get('a[href*="agencies"]').click();
  });

  afterEach(() => {
    cy.log('runs once after each the tests');
  });

  after(() => {
    cy.log('runs only once after all the tests');
    cy.visit('/');
  });
});
