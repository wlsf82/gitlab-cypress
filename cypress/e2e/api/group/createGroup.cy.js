import { faker } from '@faker-js/faker/locale/en'

describe('Group', () => {
  before(() => cy.api_deleteGroups())

  it('creates a group successfully', () => {
    const randomUuid = faker.datatype.uuid()
    const group = {
      name: randomUuid,
      path: randomUuid
    }

    cy.api_createGroup(group)
      .then(({ status, body }) => {
        expect(status).to.equal(201)
        expect(body.name).to.equal(group.name)
      })
  })
})
