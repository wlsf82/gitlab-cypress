const faker = require('faker')

describe('Create Group Label', () => {
  const group = {
    name: faker.random.uuid(),
    path: faker.random.uuid()
  }

  beforeEach(() => {
    cy.gui_login()
    cy.api_createGroup(Cypress.env('ACCESS_TOKEN'), group.name, group.path)
    cy.visit(group.path)
  })

  it('successfully', () => {
    const label = {
      group: group.path,
      title: faker.random.word()
    }

    cy.gui_createGroupLabel(label)

    cy.url().should('be.equal', `${Cypress.config().baseUrl}groups/${group.path}/-/labels`)
    cy.get('.manage-labels-list').should('contain', label.title)
  })
})
