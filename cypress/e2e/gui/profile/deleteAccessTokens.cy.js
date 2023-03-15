describe("Access Token's clean up", () => {
  beforeEach(() => cy.sessionLogin())

  it('deletes all access tokens', () => {
    cy.gui_deleteAccessTokens()

    cy.contains(
      '.settings-message',
      'This user has no active Personal Access Tokens'
    ).should('be.visible')
  })
})
