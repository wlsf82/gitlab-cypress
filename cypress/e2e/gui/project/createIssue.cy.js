import { faker } from '@faker-js/faker/locale/en'

describe('Create Issue', () => {
  const project = {
    name: `project-${faker.datatype.uuid()}`,
    description: faker.random.words(5),
    issue: {
      title: `issue-${faker.datatype.uuid()}`,
      description: faker.random.words(3)
    }
  }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.sessionLogin()
    cy.api_createProject(project)
  })

  it('creates a project successfully', () => {
    cy.gui_createIssue(project, project.issue)

    cy.get('.issue-details')
      .should('contain', project.issue.title)
      .and('contain', project.issue.description)
  })
})
