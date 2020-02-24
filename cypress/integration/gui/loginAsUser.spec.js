const faker = require('faker')

describe('Login as another user', () => {
  const randomName = faker.name.firstName().toLowerCase()
  const newUser = {
    email: `${randomName}@example.com`,
    name: `${randomName} ${faker.name.lastName().toLowerCase()}`,
    username: randomName,
    password: faker.internet.password(),
    skip_confirmation: true
  }

  beforeEach(() => cy.api_createUser(newUser))

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
    cy.gui_login(newUser.username, newUser.password)

    cy.get('.qa-user-avatar').should('exist')
  })
})
