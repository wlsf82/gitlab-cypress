describe('Create Access Token', () => {
  beforeEach(() => cy.sessionLogin())

  it('creates an access token', () => {
    /**
     * The `gui_createAccessToken` custom command hides its assertion
     * to avoid complexity into the test code. But it does ensure that
     * both the success message and token are displayed.
     *
     * This is why this test has no explicit assertion.
     */
    cy.gui_createAccessToken()
  })
})
