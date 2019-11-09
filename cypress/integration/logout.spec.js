describe('Logout', () => {
  beforeEach(() => cy.login())

  it('successfully logs in', () => {
    cy.logout()

    cy.url().should("be.equal", `${Cypress.config('baseUrl')}users/sign_in`);
  })
})
