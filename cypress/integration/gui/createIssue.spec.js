const faker = require('faker')

describe('Create Issue', () => {
  const project = {
    name: faker.random.uuid(),
    description: faker.random.words(5)
  }

  const issue = {
    project: project.name,
    title: faker.random.uuid(),
    description: faker.random.words(3)
  }

  beforeEach(() => {
    cy.gui_login()
    cy.api_createProject(project.name)
  })

  after(() => cy.api_deleteProjects())

  it('successfully', () => {
    cy.gui_createIssue(issue)

    cy.get('.issue-details')
      .should('contain', issue.title)
      .and('contain', issue.description)
  })
})
