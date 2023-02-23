import './api_commands'
import './gui_commands'

Cypress.Commands.add('sessionLogin', (
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password')
) => {
  const login = () => cy.gui_login(user, password)

  const validate = () => {
    cy.visit('/')
    cy.location('pathname', { timeout: 1000 })
      .should('not.eq', '/users/sign_in')
  }

  const options = {
    cacheAcrossSpecs: true,
    validate
  }

  cy.session(user, login, options)
})
