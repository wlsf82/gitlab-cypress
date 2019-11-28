const faker = require('faker')

describe('Issue milestone', () => {
  const projectName = faker.random.uuid()
  const issueTitle = faker.random.uuid()
  const milestone = { title: `milestone-${faker.random.word()}` }

  beforeEach(() => {
    cy.gui_login()
    cy.api_createProject(Cypress.env('GITLAB_ACCESS_TOKEN'), projectName)
      .then(projectId => {
        cy.api_createProjectMilestone(Cypress.env('GITLAB_ACCESS_TOKEN'), projectId, milestone)
        cy.api_createIssue(Cypress.env('GITLAB_ACCESS_TOKEN'), projectId, issueTitle)
          .then(issueIid =>
            cy.visit(`${Cypress.env('user_name')}/${projectName}/issues/${issueIid}`))
      })
  })

  it('adds milestone to an issue', () => {
    cy.gui_addMilestoneOnIssue(milestone)

    cy.get('.block.milestone').should('contain', milestone.title)
  })
})
