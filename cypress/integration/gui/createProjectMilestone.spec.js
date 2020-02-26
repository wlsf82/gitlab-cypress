const faker = require('faker')

describe('Create Projet Milestone', () => {
  const project = {
    name: faker.random.uuid(),
    milestone: {
      title: `milestone-${faker.random.uuid()}`
    }
  }

  beforeEach(() => {
    cy.gui_login()
    cy.api_createProject(project)
  })

  after(() => cy.api_deleteProjects())

  it('successfully', () => {
    cy.gui_createProjectMilestone(project, project.milestone)

    cy.get('.milestone-detail h2').should('contain', project.milestone.title)
  })
})
