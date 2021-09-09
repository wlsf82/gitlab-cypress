describe('Broadcast message', () => {
  beforeEach(() => {
    cy.api_deleteBroadcastMessages()
    cy.login()
    cy.visit('admin/broadcast_messages')
  })

  it('shows a preview then adds the message', () => {
    const broadcastMessage = 'Hello world!'

    cy.get('#broadcast_message_message').type(broadcastMessage)

    cy.get('.broadcast-message-preview').should('contain', broadcastMessage)

    cy.contains('Add broadcast message').click()

    cy.contains('Broadcast Message was successfully created.').should('be.visible')
    cy.get('table tr').should('contain', broadcastMessage)
  })
})
