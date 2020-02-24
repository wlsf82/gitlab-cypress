const faker = require('faker')

describe('Create a subgroup', () => {
  const groupName = faker.random.uuid()
  const groupPath = groupName
  const subgroup = { name: `sub-group-${faker.random.uuid()}` }

  beforeEach(() => {
    cy.gui_login()
    cy.api_createGroup(groupName, groupPath)
      .then(res => cy.gui_createSubgroup(res.body.id, subgroup))
  })

  after(() => cy.api_deleteGroups())

  it('successfully', () => {
    cy.url().should('be.equal', `${Cypress.config().baseUrl}${groupName}/${subgroup.name}`)
    cy.get('h1').should('contain', subgroup.name)
  })
})
