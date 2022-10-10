const faker = require('faker')

describe('Issue milestone', () => {
  const milestone = { title: `milestone-${faker.random.word()}` }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
    cy.api_createIssue().then(issue => cy.api_getAllProjects().then(projects => {
      cy.api_createProjectMilestone(projects.body[0].id, milestone)
      cy.visit(`${Cypress.env('user_name')}/${projects.body[0].name}/issues/${issue.body.iid}`)
    }))
  })

  it('adds milestone to an issue', () => {
    cy.gui_addMilestoneOnIssue(milestone)

    cy.get('.block.milestone').should('contain', milestone.title)
  })
})
