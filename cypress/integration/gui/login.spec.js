describe('Login as default user', () => {
  it('successfully', () => {
    cy.login(
      Cypress.env('user_name'),
      Cypress.env('user_password'),
      { cacheSession: false }
    )

    cy.get('.qa-user-avatar').should('exist')
  })
})
