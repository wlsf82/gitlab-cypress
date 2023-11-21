describe('Set Status', () => {
  beforeEach(() => {
    cy.sessionLogin()
    cy.visit('')
  })

  it.skip('sets, edits and clears user status', () => {
    /**
     * All custom commands used in this test already provide assertions
     * that the status was correctly set, edited, or deleted.
     *
     * Thi is only hidden in here to improve test's readability, since
     * the commands use other custom commands.
     *
     * This is why this test has no explicit assertions.
     */
    let emojiCode = 'computer'
    let statusText = 'Working'

    cy.gui_setStatus(emojiCode, statusText)

    emojiCode = 'island'
    statusText = 'Vacationing'

    cy.gui_ediStatus(emojiCode, statusText)

    cy.gui_clearStatus()
  })
})
