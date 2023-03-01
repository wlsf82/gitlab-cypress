import { faker } from '@faker-js/faker/locale/en'

describe('User info', () => {
  beforeEach(() => cy.deleteAllUsersButRoot())

  it('updates user info successfully', () => {
    const randomName = faker.name.firstName().toLowerCase()
    const newUser = {
      email: `${randomName}@example.com`,
      name: `${randomName} ${faker.name.lastName().toLowerCase()}`,
      username: randomName,
      password: faker.internet.password()
    }
    const website = `https://${randomName}.example.com`

    cy.api_createUser(newUser)
      .then(({ body }) => {
        cy.api_updateUserWebsite(body.id, website).then(({ status, body }) => {
          expect(status).to.equal(200)
          expect(body.username).to.equal(newUser.username)
          expect(body.website_url).to.equal(website)
        })
      })
  })
})
