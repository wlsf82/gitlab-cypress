import { faker } from '@faker-js/faker/locale/en'

describe('Search sub-group', () => {
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
      .then(({ body }) => {
        cy.gui_createSubgroup(body.id, group.subgroup)
        cy.visit('dashboard/groups')
      })
    cy.get('.qa-groups-filter').as('searchFiled')
  })

  it('searches for a sub-group by its partial name', () => {
    // Act
    cy.get('@searchFiled').type('sub-group')

    // Assert
    cy.contains(
      '.qa-groups-list-tree-container',
      group.subgroup.name
    ).should('be.visible')
  })

  it('searches for a sub-group by its full name', () => {
    // Act
    cy.get('@searchFiled').type(group.subgroup.name)

    // Assert
    cy.contains(
      '.qa-groups-list-tree-container',
      group.subgroup.name
    ).should('be.visible')
  })
})
