import { faker } from '@faker-js/faker/locale/en'

describe('Project', () => {
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.sessionLogin()
  })

  it('creates a project', () => {
    const project = {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5)
    }

    cy.gui_createProject(project)

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}${Cypress.env('user_name')}/${project.name}`)
    cy.contains('h1', project.name).should('be.visible')
    cy.contains('p', project.description).should('be.visible')
  })
})
