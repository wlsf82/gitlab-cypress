const faker = require('faker')

describe('Create Issue', () => {
  const project = {
    name: faker.datatype.uuid(),
    description: faker.random.words(5),
    issue: {
      title: faker.datatype.uuid(),
      description: faker.random.words(3)
    }
  }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
    cy.api_createProject(project)
  })

  it('successfully', () => {
    cy.gui_createIssue(project, project.issue)

    cy.get('.issue-details')
      .should('contain', project.issue.title)
      .and('contain', project.issue.description)
  })
})
