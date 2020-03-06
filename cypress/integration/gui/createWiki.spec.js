const faker = require('faker')

describe('Create new page', () => {
  const project = { name: faker.random.uuid() }

  beforeEach(() => {
    cy.gui_login()
    cy.api_createProject(project)
    cy.visit(`${Cypress.env('user_name')}/${project.name}/wikis/home?view=create`)
  })

  after(() => cy.api_deleteProjects())

  it('successfully', () => {
    const wikiContent = faker.random.words(4)

    cy.get('.qa-wiki-content-textarea').type(wikiContent)
    cy.contains('Create page').click()

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}${Cypress.env('user_name')}/${project.name}/wikis/home`)
    cy.get('[data-qa-selector="wiki_page_content"]').should('contain', wikiContent)
  })
})
