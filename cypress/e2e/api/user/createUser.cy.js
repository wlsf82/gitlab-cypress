import { faker } from '@faker-js/faker/locale/en'

describe('User', () => {
  beforeEach(() => cy.deleteAllUsersButRoot())

  it('creates a user', () => {
    const randomName = faker.name.firstName().toLowerCase()
    const newUser = {
      email: `${randomName}@example.com`,
      name: `${randomName} ${faker.name.lastName().toLowerCase()}`,
      username: randomName,
      password: faker.internet.password()
    }

    cy.api_createUser(newUser)
      .then(({ status, body }) => {
        expect(status).to.equal(201)
        expect(body.email).to.equal(newUser.email)
        expect(body.name).to.equal(newUser.name)
        expect(body.username).to.equal(newUser.username)
      })
  })
})
