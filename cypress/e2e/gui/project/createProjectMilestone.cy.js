import { faker } from '@faker-js/faker/locale/en'

describe('Projet Milestone', () => {
  const project = {
    name: `project-${faker.datatype.uuid()}`,
    milestone: {
      title: `milestone-${faker.datatype.uuid()}`
    }
  }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.sessionLogin()
    cy.api_createProject(project)
  })

  it('creates a project milestone', () => {
    cy.gui_createProjectMilestone(project, project.milestone)

    cy.contains('.milestone-detail h2', project.milestone.title).should('be.visible')
  })
})
