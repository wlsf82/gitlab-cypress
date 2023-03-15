describe('Logout', () => {
  beforeEach(() => {
    cy.sessionLogin()
    cy.visit('')
  })

  it('logs out', () => {
    cy.gui_logout()

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}users/sign_in`)
  })
})
