const faker = require('faker')

describe('Create Projet Milestone', () => {
  const project = {
    name: faker.datatype.uuid(),
    milestone: {
      title: `milestone-${faker.datatype.uuid()}`
    }
  }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
    cy.api_createProject(project)
  })

  it('successfully', () => {
    cy.gui_createProjectMilestone(project, project.milestone)

    cy.get('.milestone-detail h2').should('contain', project.milestone.title)
  })
})
