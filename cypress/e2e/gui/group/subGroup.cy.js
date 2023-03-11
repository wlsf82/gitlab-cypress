import { faker } from '@faker-js/faker/locale/en'

describe('Create a sub-group', () => {
  const randomUuid = faker.datatype.uuid()
  const group = {
    name: randomUuid,
    path: randomUuid,
    subgroup: {
      name: `sub-group-${faker.datatype.uuid()}`
    }
  }

  beforeEach(() => {
    cy.api_deleteGroups()
    cy.sessionLogin()
    cy.api_createGroup(group)
      .its('body')
      .as('groupBody')
  })

  it('creates a sub-group successfully', function () {
    cy.gui_createSubgroup(this.groupBody.id, group.subgroup)

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}${group.name}/${group.subgroup.name}`)
    cy.contains('h1', group.subgroup.name).should('be.visible')
  })
})
