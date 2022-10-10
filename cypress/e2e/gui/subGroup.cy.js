const faker = require('faker')

describe('Create a subgroup', () => {
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
    cy.login()
    cy.api_createGroup(group).then(res => cy.gui_createSubgroup(res.body.id, group.subgroup))
  })

  it('successfully', () => {
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}${group.name}/${group.subgroup.name}`)
    cy.get('h1').should('contain', group.subgroup.name)
  })
})
