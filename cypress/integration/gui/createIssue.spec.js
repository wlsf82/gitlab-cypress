const faker = require('faker')

describe('Create Issue', () => {
  const project = {
    name: faker.random.uuid(),
    description: faker.random.words(5),
    issue: {
      title: faker.random.uuid(),
      description: faker.random.words(3)
    }
  }

  beforeEach(() => {
    cy.gui_login()
    cy.api_createProject(project)
  })

  after(() => cy.api_deleteProjects())

  it('successfully', () => {
    cy.gui_createIssue(project, project.issue)

    cy.get('.issue-details')
      .should('contain', project.issue.title)
      .and('contain', project.issue.description)
  })
})
