const faker = require('faker')

describe('Create Group', () => {
  after(() => cy.api_getAllGroups()
    .then(response => response.body.forEach(group =>
      cy.api_deleteGroup(group.id))))

  it('successfully', () => {
    const groupName = faker.random.word()
    const groupPath = groupName

    cy.api_createGroup(groupName, groupPath)
      .then(response => {
        expect(response.status).to.equal(201)
        expect(response.body.name).to.equal(groupName)
      })
  })
})
