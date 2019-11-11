const faker = require('faker')

describe('Close an issue', () => {
  const projectName = faker.random.uuid()
  const issueTitle = faker.random.uuid()

  beforeEach(() => {
    cy.login()
    cy.createProjectViaApi(Cypress.env('ACCESS_TOKEN'), projectName)
      .then(projectId =>
        cy.createIssueViaApi(Cypress.env('ACCESS_TOKEN'), projectId, issueTitle)
      ).then(issueIid =>
        cy.visit(`${Cypress.env('user_name')}/${projectName}/issues/${issueIid}`))
  })

  it('successfully', () => {
    cy.get('.d-none.btn-close').click()

    cy.get('.status-box-issue-closed')
      .should('be.visible')
      .and('contain', 'Closed')
  })
})
