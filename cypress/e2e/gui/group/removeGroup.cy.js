import { faker } from '@faker-js/faker/locale/en'

describe('Group', () => {
  const randomUuid = faker.datatype.uuid()
  const group = {
    name: `group-${randomUuid}`,
    path: randomUuid
  }

  beforeEach(() => {
    // Arrange
    cy.api_deleteGroups()
    cy.sessionLogin()
    cy.api_createGroup(group)
  })

  it('removes a group', () => {
    // Act
    cy.gui_removeGroup(group)

    // Assert
    cy.contains(
      '.flash-alert',
      `Group '${group.name}' was scheduled for deletion.`
    ).should('be.visible')

    // Act
    cy.visit('groups')

    // Assert
    cy.get('.group-empty-state').should('be.visible')
  })
})
