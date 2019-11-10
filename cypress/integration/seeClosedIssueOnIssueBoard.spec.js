const faker = require('faker')

describe('Issue board', () => {
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
                cy.get('.d-none.btn-close').click()
              })
          }))
    cy.visit(`${Cypress.env('user_name')}/${projectName}/-/boards`)
  })

  it('sees a closed issue on the issue board', () => {
    cy.get('[data-board-type="closed"] [data-qa-selector="board_card"]')
      .should('contain', issueTitle)
  })
})
