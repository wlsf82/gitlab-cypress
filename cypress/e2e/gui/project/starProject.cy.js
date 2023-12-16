import { faker } from '@faker-js/faker/locale/en'

describe('Star project', () => {
  const project = {
    name: `project-${faker.string.uuid()}`,
    description: faker.random.words(5),
    issue: {
      title: `issue-${faker.string.uuid()}`,
      description: faker.random.words(3)
    }
  }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.sessionLogin()
    cy.api_createProject(project)
  })

  it('stars a project', () => {
    cy.intercept(
      'POST',
        `${Cypress.env('user_name')}/${project.name}/toggle_star.json`
    ).as('starRequest')

    cy.visit(`${Cypress.config('baseUrl')}${Cypress.env('user_name')}/${project.name}`)

    cy.get('.star-btn').click()
    cy.wait('@starRequest')
      .its('response.statusCode')
      .should('equal', 200)

    cy.visit('dashboard/projects/starred')

    cy.get('[data-qa-selector="projects_list"]')
      .find(`ul li:contains(${project.name})`)
      .should('be.visible')
  })
})
