import { faker } from '@faker-js/faker/locale/en'

describe('Issue milestone', () => {
  const milestone = { title: `milestone-${faker.random.word()}` }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.sessionLogin()
    cy.api_createIssue().as('issue')
    cy.api_getAllProjects()
      .then(function ({ body }) {
        const project = body[0]
        const issueIid = this.issue.body.iid

        cy.api_createProjectMilestone(project.id, milestone)
        cy.visit(`${Cypress.env('USER_NAME')}/${project.name}/issues/${issueIid}`)
      })
  })

  it('adds a milestone to an issue', () => {
    cy.gui_addMilestoneOnIssue(milestone)

    cy.get('.block.milestone').should('contain', milestone.title)
  })
})
