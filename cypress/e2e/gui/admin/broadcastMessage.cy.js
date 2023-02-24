describe('Broadcast message', () => {
  beforeEach(() => {
    cy.api_deleteBroadcastMessages()
    cy.sessionLogin()
    cy.visit('admin/broadcast_messages')
  })

  it('shows a preview then adds the message', () => {
    const broadcastMessage = 'Hello world!'

    cy.get('#broadcast_message_message').type(broadcastMessage)

    cy.contains('.broadcast-message-preview', broadcastMessage).should('be.visible')

    cy.contains('Add broadcast message').click()

    cy.contains('Broadcast Message was successfully created.').should('be.visible')
    cy.contains('table tr', broadcastMessage).should('be.visible')
  })
})
