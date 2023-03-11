describe('Set Status', () => {
  beforeEach(() => {
    cy.sessionLogin()
    cy.visit('')
  })

  it('sets, edits and clears user status', () => {
    let emojiCode = 'computer'
    let statusText = 'Working'

    cy.gui_setStatus(emojiCode, statusText)

    emojiCode = 'island'
    statusText = 'Vacationing'

    cy.gui_ediStatus(emojiCode, statusText)

    cy.gui_clearStatus()
  })
})
