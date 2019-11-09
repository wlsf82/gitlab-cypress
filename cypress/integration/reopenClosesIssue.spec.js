const faker = require('faker')

describe('Reopen a closed issue', () => {
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
              .then(issueIid => {
                cy.visit(`${Cypress.env('user_name')}/${projectName}/issues/${issueIid}`)
                cy.commentOnIssue('/close ')
                cy.reload()
              })
          }))
  })

  it('successfully', () => {
    cy.get('[data-qa-selector="reopen_issue_button"]').click()

    cy.get('.status-box-open')
      .should('be.visible')
      .and('contain', 'Open')
  })
})
