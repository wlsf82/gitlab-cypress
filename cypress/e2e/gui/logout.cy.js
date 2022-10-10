describe('Logout', () => {
  beforeEach(() => {
    cy.login(
      Cypress.env('user_name'),
      Cypress.env('user_password'),
      { cacheSession: false }
    )
  })

  it('successfully', () => {
    cy.gui_logout()

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}users/sign_in`)
  })
})
