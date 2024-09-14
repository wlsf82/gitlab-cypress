import { faker } from '@faker-js/faker/locale/en'

describe('Group Label', () => {
  const randomUuid = faker.string.uuid()
  const group = {
    name: `group-${randomUuid}`,
    path: randomUuid,
    label: {
      title: `label-${faker.word.sample()}`
    }
  }

  beforeEach(() => {
    cy.api_deleteGroups()
    cy.sessionLogin()
    cy.api_createGroup(group)
    cy.visit(group.path)
  })

  it('creates a group label', () => {
    cy.gui_createGroupLabel(group, group.label)

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}groups/${group.path}/-/labels`)
    cy.contains('.manage-labels-list', group.label.title).should('be.visible')
  })
})
