const faker = require('faker')

describe('Issue milestone', () => {
  const projectName = faker.random.uuid()
  const issueTitle = faker.random.uuid()
  const milestone = { title: `milestone-${faker.random.word()}` }

  beforeEach(() => {
    cy.login()
    cy.createAccessToken(faker.random.uuid())
      .then(accessTokenValue =>
        cy.createProjectViaApi(accessTokenValue, projectName)
          .then(data => {
            const accessToken = data[0]
            const projectId = data[1]

            cy.createProjectMilestoneViaApi(accessToken, projectId, milestone)

            cy.createIssueViaApi(accessToken, projectId, issueTitle)
              .then(issueIid =>
                cy.visit(`${Cypress.env('user_name')}/${projectName}/issues/${issueIid}`))
          }))
  })

  it('adds milestone to an issue', () => {
    cy.addMilestoneOnIssue(milestone)

    cy.get('.block.milestone').should('contain', milestone.title)
  })
})
