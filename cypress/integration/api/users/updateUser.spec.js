const faker = require('faker')

describe('Update user info', () => {
  const randomName = faker.name.firstName().toLowerCase()
  const newUser = {
    email: `${randomName}@example.com`,
    name: `${randomName} ${faker.name.lastName().toLowerCase()}`,
    username: randomName,
    password: faker.internet.password()
  }

  after(() => {
    cy.api_getAllUsers()
      .then(users => {
        users.body.forEach(user => {
          if (user.username === newUser.username) {
            cy.api_deleteUser(user.id)
          }
        })
      })
  })

  it('successfully', () => {
    const website = `https://${randomName}.example.com`

    cy.api_createUser(newUser)
      .then(response => {
        cy.api_updateUserWebsite(response.body.id, website)
          .then(response => {
            expect(response.status).to.equal(200)
            expect(response.body.username).to.equal(newUser.username)
            expect(response.body.website_url).to.equal(website)
          })
      })
  })
})
