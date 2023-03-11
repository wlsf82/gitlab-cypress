describe('Broadcast message', () => {
  beforeEach(() => {
    cy.api_deleteBroadcastMessages()
    cy.sessionLogin()
  })

  it('shows a preview then adds the message', () => {
    const broadcastMessage = 'Hello world!'

    // Arrange
    cy.visit('admin/broadcast_messages')

    // Act
    cy.get('#broadcast_message_message').type(broadcastMessage)
    // Intermediate assertion
    cy.contains('.broadcast-message-preview', broadcastMessage).should('be.visible')
    // Act
    cy.contains('Add broadcast message').click()

    // Assert
    cy.contains('Broadcast Message was successfully created.').should('be.visible')
    cy.contains('table tr', broadcastMessage).should('be.visible')
  })
})
