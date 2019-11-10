const faker = require('faker')

describe('Create a subgroup', () => {
  const groupName = faker.random.uuid()
  const groupPath = groupName
  const subgroup = { name: `sub-group-${faker.random.uuid()}` }

  beforeEach(() => {
    cy.login()
    cy.createGroupViaApi(Cypress.env('ACCESS_TOKEN'), groupName, groupPath)
      .then(groupId => cy.createSubgroup(groupId, subgroup))
  })

  it('successfully', () => {
    cy.url().should('be.equal', `${Cypress.config().baseUrl}${groupName}/${subgroup.name}`)
    cy.get('h1').should('contain', subgroup.name)
  })
})