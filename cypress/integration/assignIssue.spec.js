const faker = require('faker')

describe('Assign issue', () => {
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

  it('assigns an issue to yourself', () => {
    cy.contains('assign yourself').click()

    cy.get('.qa-assignee-block')
      .should('be.visible')
      .and('contain', `@${Cypress.env('user_name')}`)
  })
})
