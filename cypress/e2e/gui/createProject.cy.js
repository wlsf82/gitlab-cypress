import { faker } from '@faker-js/faker'

describe('Create Project', () => {
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.sessionLogin()
  })

  it('creates a project successfully', () => {
    const project = {
      name: faker.datatype.uuid(),
      description: faker.random.words(5)
    }

    cy.gui_createProject(project)

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}${Cypress.env('user_name')}/${project.name}`)
    cy.contains('h1', project.name).should('be.visible')
    cy.contains('p', project.description).should('be.visible')
  })
})
