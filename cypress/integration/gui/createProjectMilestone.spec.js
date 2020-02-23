const faker = require('faker')

describe('Create Projet Milestone', () => {
  const project = { name: faker.random.uuid() }

  const milestone = {
    project,
    title: `milestone-${faker.random.uuid()}`
  }

  beforeEach(() => {
    cy.gui_login()
    cy.api_createProject(project.name)
  })

  after(() => cy.api_getAllProjects()
    .then(response => response.body.forEach(project =>
      cy.api_deleteProject(project.id))))

  it('successfully', () => {
    cy.gui_createProjectMilestone(milestone)

    cy.get('.milestone-detail h2').should('contain', milestone.title)
  })
})
