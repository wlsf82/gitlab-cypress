const faker = require('faker')

describe('Create Access Token', () => {
  beforeEach(() => cy.login())

  it('successfully', () => {
    cy.createAccessToken(faker.random.uuid())

    cy.contains('Your new personal access token has been created.')
      .should('be.visible')
    cy.get('.qa-created-personal-access-token')
      .should('be.visible')
  })
})
