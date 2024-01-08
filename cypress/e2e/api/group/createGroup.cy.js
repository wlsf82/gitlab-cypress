import { faker } from '@faker-js/faker/locale/en'

describe('Group', () => {
  beforeEach(() => cy.api_deleteGroups())

  it('creates a group', () => {
    const randomUuid = faker.string.uuid()
    const group = {
      name: `group-${randomUuid}`,
      path: randomUuid
    }

    cy.api_createGroup(group)
      .then(({ status, body }) => {
        expect(status).to.equal(201)
        expect(body.name).to.equal(group.name)
      })
  })
})
