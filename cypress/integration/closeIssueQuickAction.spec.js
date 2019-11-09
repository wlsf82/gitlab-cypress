const faker = require('faker')

describe('Close an issue using quick action', () => {
  const projectName = faker.random.uuid()
  const issueTitle = faker.random.uuid()

  beforeEach(() => {
    cy.login()
    cy.createAccessToken(faker.random.uuid())
      .then(accessTokenValue =>
        cy.createProjectViaApi(accessTokenValue, projectName)
          .then(data => {
            const accessToken = data[0]
            const projectId = data[1]

            cy.createIssueViaApi(accessToken, projectId, issueTitle)
              .then(issueIid =>
                cy.visit(`${Cypress.env('user_name')}/${projectName}/issues/${issueIid}`))
          }))
  })

  it('successfully', () => {
    cy.commentOnIssue('/close ')

    cy.contains('Closed this issue')
      .should('be.visible')

    cy.reload()

    cy.get('.status-box-issue-closed')
      .should('be.visible')
      .and('contain', 'Closed')
  })
})
