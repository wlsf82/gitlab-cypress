const faker = require('faker')

describe('Create Group', () => {
  it('successfully', () => {
    const groupName = faker.random.word()
    const groupPath = groupName

    cy.api_createGroup(Cypress.env('GITLAB_ACCESS_TOKEN'), groupName, groupPath)
      .then(response => {
        expect(response.status).to.equal(201)
        expect(response.body.name).to.equal(groupName)
      })
  })
})
