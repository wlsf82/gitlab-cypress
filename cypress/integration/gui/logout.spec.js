describe('Logout', () => {
  beforeEach(() => cy.gui_login())

  it('successfully', () => {
    cy.gui_logout()

    cy.url().should("be.equal", `${Cypress.config('baseUrl')}users/sign_in`);
  })
})
