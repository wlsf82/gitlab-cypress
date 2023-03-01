import { faker } from '@faker-js/faker/locale/en'

describe('Create a sub-group', () => {
  const randomUuid = faker.datatype.uuid()
  const group = {
    name: randomUuid,
    path: randomUuid,
    subgroup: {
      name: `sub-group-${faker.datatype.uuid()}`
    }
  }

  beforeEach(() => {
    cy.api_deleteGroups()
    cy.sessionLogin()
    cy.api_createGroup(group)
      .then(({ body }) => {
        cy.gui_createSubgroup(body.id, group.subgroup)
      })
  })

  it('creates a sub-group successfully', () => {
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}${group.name}/${group.subgroup.name}`)
    cy.contains('h1', group.subgroup.name).should('be.visible')
  })
})
