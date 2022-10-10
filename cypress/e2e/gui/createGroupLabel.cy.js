const faker = require('faker')

describe('Create Group Label', () => {
  const randomUuid = faker.datatype.uuid()
  const group = {
    name: randomUuid,
    path: randomUuid,
    label: {
      title: faker.random.word()
    }
  }

  beforeEach(() => {
    cy.api_deleteGroups()
    cy.login()
    cy.api_createGroup(group)
    cy.visit(group.path)
  })

  it('successfully', () => {
    cy.gui_createGroupLabel(group, group.label)

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}groups/${group.path}/-/labels`)
    cy.get('.manage-labels-list').should('contain', group.label.title)
  })
})
