import { faker } from '@faker-js/faker/locale/en'

describe('Group', () => {
  beforeEach(() => {
    cy.api_deleteGroups()
    cy.sessionLogin()
  })

  it('creates a group', () => {
    const group = {
      name: `group-${faker.string.uuid()}`,
      description: faker.word.words(5)
    }

    cy.gui_createPublicGroup(group)

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}${group.name}`)
    cy.contains('h1', group.name).should('be.visible')
  })
})
