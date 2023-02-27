Cypress.Commands.add('sessionLogin', (
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password')
) => {
  const login = () => cy.gui_login_or_signup(user, password)

  const validate = () => {
    cy.visit('/')
    cy.location('pathname', { timeout: 1000 })
      .should('not.eq', '/users/sign_in')
  }

  const options = {
    cacheAcrossSpecs: true,
    validate
  }

  /**
   * @param user string - the id of the session. If the id changes, a new
   * session is created.
   * @param login function - the function creates the session.
   * @param options object - an object to add certain characteristics to the
   * session, such as sharing the cached session across specs (test files),
   * and a way to validate if the session is still valid.
   *
   * For more details, visit https://docs.cypress.io/api/commands/session
   */
  cy.session(user, login, options)
})
