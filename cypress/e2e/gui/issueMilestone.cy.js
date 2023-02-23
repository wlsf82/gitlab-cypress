import { faker } from '@faker-js/faker'

describe('Issue milestone', () => {
  const milestone = { title: `milestone-${faker.random.word()}` }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.sessionLogin()
    cy.api_createIssue().then(issue => {
      cy.api_getAllProjects().then(({ body }) => {
        cy.api_createProjectMilestone(body[0].id, milestone)
        cy.visit(`${Cypress.env('user_name')}/${body[0].name}/issues/${issue.body.iid}`)
      })
    })
  })

  it('adds a milestone to an issue', () => {
    cy.gui_addMilestoneOnIssue(milestone)

    cy.get('.block.milestone').should('contain', milestone.title)
  })
})
