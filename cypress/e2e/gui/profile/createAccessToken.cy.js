describe('Create Access Token', () => {
  beforeEach(() => cy.sessionLogin())

  it('creates an access token successfully', () => {
    cy.gui_createAccessToken()
  })
})
