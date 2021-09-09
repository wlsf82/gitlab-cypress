const faker = require('faker')

describe('Create Group', () => {
  before(() => cy.api_deleteGroups())

  it('successfully', () => {
    const randomUuid = faker.datatype.uuid()
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
