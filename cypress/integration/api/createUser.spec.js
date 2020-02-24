const faker = require('faker')

describe('Create User', () => {
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
    cy.api_createUser(newUser)
    .then(response => {
      expect(response.status).to.equal(201)
      expect(response.body.email).to.equal(newUser.email)
      expect(response.body.name).to.equal(newUser.name)
      expect(response.body.username).to.equal(newUser.username)
    })
  })
})
