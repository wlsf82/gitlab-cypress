const faker = require('faker')

describe('Create Group Label', () => {
  const group = {
    name: faker.random.uuid(),
    path: faker.random.uuid(),
  }

  beforeEach(() => {
    cy.login()
    cy.createAccessToken(faker.random.uuid())
      .then(accessTokenValue =>
        cy.createGroupViaApi(accessTokenValue, group.name, group.path))
    cy.visit(group.path)
  })

  it('successfully creates a group label', () => {
    const label = {
      group: group.path,
      title: faker.random.word()
    }

    cy.createGroupLabel(label)

    cy.url().should('be.equal', `${Cypress.config().baseUrl}groups/${group.path}/-/labels`)
    cy.get('.manage-labels-list').should('contain', label.title)
  })
})
