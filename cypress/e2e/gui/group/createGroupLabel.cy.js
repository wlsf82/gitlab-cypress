import { faker } from '@faker-js/faker/locale/en'

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
    cy.sessionLogin()
    cy.api_createGroup(group)
    cy.visit(group.path)
  })

  it('creates a group label successfully', () => {
    cy.gui_createGroupLabel(group, group.label)

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}groups/${group.path}/-/labels`)
    cy.contains('.manage-labels-list', group.label.title).should('be.visible')
  })
})
