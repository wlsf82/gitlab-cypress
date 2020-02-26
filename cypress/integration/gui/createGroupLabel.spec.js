const faker = require('faker')

describe('Create Group Label', () => {
  const randomUuid = faker.random.uuid()
  const group = {
    name: randomUuid,
    path: randomUuid,
    label: {
      title: faker.random.word()
    }
  }

  beforeEach(() => {
    cy.gui_login()
    cy.api_createGroup(group)
    cy.visit(group.path)
  })

  after(() => cy.api_deleteGroups())

  it('successfully', () => {
    cy.gui_createGroupLabel(group, group.label)

    cy.url().should('be.equal', `${Cypress.config().baseUrl}groups/${group.path}/-/labels`)
    cy.get('.manage-labels-list').should('contain', group.label.title)
  })
})
