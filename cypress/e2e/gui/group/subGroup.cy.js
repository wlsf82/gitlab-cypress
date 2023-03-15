import { faker } from '@faker-js/faker/locale/en'

describe('Sub-group', () => {
  const randomUuid = faker.datatype.uuid()
  const group = {
    name: `group-${randomUuid}`,
    path: randomUuid,
    subgroup: {
      name: `sub-group-${faker.datatype.uuid()}`
    }
  }

  beforeEach(() => {
    // Arrange
    cy.api_deleteGroups()
    cy.sessionLogin()
    cy.api_createGroup(group)
      .its('body')
      .as('groupBody')
  })

  it('creates a sub-group and searches for it', function () {
    // Act
    cy.gui_createSubgroup(this.groupBody.id, group.subgroup)

    // Assert
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}${group.path}/${group.subgroup.name}`)
    cy.contains('h1', group.subgroup.name).should('be.visible')

    // Act
    cy.visit('dashboard/groups')
    cy.get('.qa-groups-filter').type(group.subgroup.name)

    // Assert
    cy.contains(
      '.qa-groups-list-tree-container',
      group.subgroup.name
    ).should('be.visible')
  })
})
