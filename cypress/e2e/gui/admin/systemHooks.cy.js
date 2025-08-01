describe('System hooks', () => {
  beforeEach(() => {
    cy.api_deleteSystemHooks()
    cy.sessionLogin()
  })

  it('creates a system hook', () => {
    // Arrange
    cy.visit('admin/hooks')

    // Act
    cy.get('#hook_url').type('http://example.com')
    cy.get('input[type="submit"][value="Add system hook"]').click()

    // Assert
    cy.contains('.flash-notice', 'Hook was successfully created.').should('be.visible')
    cy.contains('.card-header', 'System hooks (1)')
      .should('be.visible')
      .next()
      .should('contain', 'http://example.com')
      .and('be.visible')
  })
})
