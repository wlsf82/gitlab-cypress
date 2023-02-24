import { faker } from '@faker-js/faker'

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

  it('logs in as a non-default user successfully', () => {
    cy.gui_login(newUser.username, newUser.password)
  })
})
