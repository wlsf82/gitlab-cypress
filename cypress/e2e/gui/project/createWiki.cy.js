import { faker } from '@faker-js/faker/locale/en'

describe('Create new page', () => {
  const project = { name: faker.datatype.uuid() }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.sessionLogin()
    cy.api_createProject(project)
    cy.visit(`${Cypress.env('user_name')}/${project.name}/wikis/home?view=create`)
  })

  it('creates a wiki successfully', () => {
    const wikiContent = faker.random.words(4)

    cy.get('.qa-wiki-content-textarea').type(wikiContent)
    cy.contains('Create page').click()

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}${Cypress.env('user_name')}/${project.name}/wikis/home`)
    cy.contains('[data-qa-selector="wiki_page_content"]', wikiContent).should('be.visible')
  })
})
