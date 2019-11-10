const faker = require('faker')

describe('Issue board', () => {
  const projectName = faker.random.uuid()
  const issueTitle = faker.random.uuid()

  beforeEach(() => {
    cy.login()
    cy.createProjectViaApi(Cypress.env('ACCESS_TOKEN'), projectName)
      .then(projectId =>
        cy.createIssueViaApi(Cypress.env('ACCESS_TOKEN'), projectId, issueTitle))
          .then(issueIid => {
            cy.visit(`${Cypress.env('user_name')}/${projectName}/issues/${issueIid}`)
            cy.visit(`${Cypress.env('user_name')}/${projectName}/-/boards`)
          })
  })

  it('sees an open issue on the issue board', () => {
    cy.get('[data-board-type="backlog"] [data-qa-selector="board_card"]')
      .should('contain', issueTitle)
  })
})
