const faker = require('faker')

describe('Issue milestone', () => {
  const projectName = faker.random.uuid()
  const issueTitle = faker.random.uuid()
  const milestone = { title: `milestone-${faker.random.word()}` }

  beforeEach(() => {
    cy.login()
    cy.createProjectViaApi(Cypress.env('ACCESS_TOKEN'), projectName)
      .then(projectId => {
        cy.createProjectMilestoneViaApi(Cypress.env('ACCESS_TOKEN'), projectId, milestone)
        cy.createIssueViaApi(Cypress.env('ACCESS_TOKEN'), projectId, issueTitle)
          .then(issueIid =>
            cy.visit(`${Cypress.env('user_name')}/${projectName}/issues/${issueIid}`))
      })
  })

  it('adds milestone to an issue', () => {
    cy.addMilestoneOnIssue(milestone)

    cy.get('.block.milestone').should('contain', milestone.title)
  })
})
