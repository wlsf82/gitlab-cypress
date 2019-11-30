const faker = require('faker')

describe('Issue milestone', () => {
  const projectName = faker.random.uuid()
  const issueTitle = faker.random.uuid()
  const milestone = { title: `milestone-${faker.random.word()}` }

  beforeEach(() => {
    cy.gui_login()
    cy.api_createProject(Cypress.env('GITLAB_ACCESS_TOKEN'), projectName)
      .then(res => {
        cy.api_createProjectMilestone(Cypress.env('GITLAB_ACCESS_TOKEN'), res.body.id, milestone)
        cy.api_createIssue(Cypress.env('GITLAB_ACCESS_TOKEN'), res.body.id, issueTitle)
          .then(res =>
            cy.visit(`${Cypress.env('user_name')}/${projectName}/issues/${res.body.iid}`))
      })
  })

  it('adds milestone to an issue', () => {
    cy.gui_addMilestoneOnIssue(milestone)

    cy.get('.block.milestone').should('contain', milestone.title)
  })
})
