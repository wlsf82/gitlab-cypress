const faker = require('faker')

describe('Create a subgroup', () => {
  const randomUuid = faker.random.uuid()
  const group = {
    name: randomUuid,
    path: randomUuid,
    subgroup: {
      name: `sub-group-${faker.random.uuid()}`
    }
  }

  beforeEach(() => {
    cy.gui_login()
    cy.api_createGroup(group).then(res => cy.gui_createSubgroup(res.body.id, group.subgroup))
  })

  after(() => cy.api_deleteGroups())

  it('successfully', () => {
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}${group.name}/${group.subgroup.name}`)
    cy.get('h1').should('contain', group.subgroup.name)
  })
})
