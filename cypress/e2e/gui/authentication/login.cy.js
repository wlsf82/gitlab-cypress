describe('Login as default user', () => {
  it('logs in successfully', () => {
    /**
     * The `sessionLogin` custom cmd uses the `gui_login` cmd,
     * which already asserts that the user is logged in, to ensure
     * the session is correctly created.
     *
     * This is why this test has no explicit assertion.
     */
    cy.sessionLogin()
  })
})
