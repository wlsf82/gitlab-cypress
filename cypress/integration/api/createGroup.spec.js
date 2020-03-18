const faker = require('faker')

describe('Create Group', () => {
  after(() => cy.api_deleteGroups())

  it('successfully', () => {
    const randomUuid = faker.random.uuid()
    const group = {
      name: randomUuid,
      path: randomUuid
    }

    cy.api_createGroup(group).then(response => {
      expect(response.status).to.equal(201)
      expect(response.body.name).to.equal(group.name)
    })
  })
})
