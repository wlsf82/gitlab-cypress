import { faker } from '@faker-js/faker/locale/en'

describe('User impersonation', () => {
  const randomName = faker.name.firstName().toLowerCase()
  const newUser = {
    email: `${randomName}@example.com`,
    name: `${randomName} ${faker.name.lastName().toLowerCase()}`,
    username: randomName,
    password: faker.internet.password(),
    skip_confirmation: true
  }

  beforeEach(() => {
    cy.deleteAllUsersButRoot()
    cy.api_createUser(newUser)
    cy.sessionLogin()
  })

  it('impersonates and stops impersonating a user', () => {
    const { username } = newUser

    // Arrange
    cy.visit(`admin/users/${username}`)

    // Act
    cy.get('[data-qa-selector="impersonate_user_link"]').click()

    // Assert
    cy.url().should('be.equal', Cypress.config('baseUrl'))
    cy.contains('.flash-alert', `You are now impersonating ${username}`)
      .should('be.visible')

    // Act
    cy.get('.qa-user-avatar').click()

    // Assert
    cy.get('.dropdown-menu-right ul li.current-user')
      .should('contain', newUser.name)
      .and('contain', `@${username}`)

    // Act
    cy.get('[data-qa-selector="stop_impersonation_link"]').click()

    // Assert
    cy.location('pathname').should('be.equal', `/admin/users/${username}`)
    cy.contains('.flash-alert', `You are now impersonating ${username}`)
      .should('not.exist')

    // Act
    cy.get('.qa-user-avatar').click()

    // Assert
    cy.get('.dropdown-menu-right ul li.current-user')
      .should('contain', 'Administrator')
      .and('contain', `@${Cypress.env('user_name')}`)
  })
})
