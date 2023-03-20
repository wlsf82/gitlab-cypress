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

  /**
   * @TODO: Find out why this tests fails on CI.
   * E.g., https://github.com/wlsf82/gitlab-cypress/actions/runs/4442725501/jobs/7799374091
   */
  it('removes a group', (done) => {
    // Act
    cy.gui_removeGroup(group, done)

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
