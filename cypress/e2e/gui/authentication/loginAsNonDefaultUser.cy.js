import { faker } from '@faker-js/faker/locale/en'

describe('Login as non-default user', () => {
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
  })

  it('logs in as a non-default user', () => {
    /**
     * The `gui_login` cmd already asserts that the user is logged in,
     * to ensure the session is correctly created.
     *
     * This is why this test has no explicit assertion.
     */
    cy.gui_login(newUser.username, newUser.password)
  })
})
