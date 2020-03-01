describe('Login as default user', () => {
  it('successfully', () => {
    cy.gui_login()

    cy.get('.qa-user-avatar').should('exist')
  })
})
