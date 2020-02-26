const faker = require('faker')

describe('Issue milestone', () => {
  const milestone = {
    title: `milestone-${faker.random.word()}`
  }

  beforeEach(() => {
    cy.gui_login()
    cy.api_createIssue()
      .then(issueResponse => cy.api_getAllProjects()
        .then(projectsResponse => {
          cy.api_createProjectMilestone(projectsResponse.body[0].id, milestone)
          cy.visit(`${Cypress.env('user_name')}/${projectsResponse.body[0].name}/issues/${issueResponse.body.iid}`)
        }))
  })

  after(() => cy.api_deleteProjects())

  it('adds milestone to an issue', () => {
    cy.gui_addMilestoneOnIssue(milestone)

    cy.get('.block.milestone').should('contain', milestone.title)
  })
})
