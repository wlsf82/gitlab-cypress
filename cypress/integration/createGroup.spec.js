const faker = require('faker')

describe('Create Group', () => {
  beforeEach(() => cy.login())

  it('successfully', () => {
    const group = {
      name: faker.random.uuid(),
      description: faker.random.words(5)
    }

    cy.createPublicGroup(group)

    cy.url().should('be.equal', `${Cypress.config().baseUrl}${group.name}`)
    cy.contains(group.name).should('be.visible')
  })

  context('Create group via API', () => {
    const groupName = faker.random.uuid()
    const groupPath = groupName

    beforeEach(() => cy.createAccessToken(faker.random.uuid())
      .then(accessTokenValue =>
        cy.createGroupViaApi(accessTokenValue, groupName, groupPath)))

    it('successfully visits the just create group', () => {
      cy.visit(groupPath)

      cy.get('.home-panel-title')
        .should('be.visible')
        .and('contain', groupName)
    })
  })
})
