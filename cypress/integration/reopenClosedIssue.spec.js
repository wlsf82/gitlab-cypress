const faker = require('faker')

describe('Reopen a closed issue', () => {
  const projectName = faker.random.uuid()
  const issueTitle = faker.random.uuid()

  beforeEach(() => {
    cy.login()
    cy.createProjectViaApi(Cypress.env('ACCESS_TOKEN'), projectName)
      .then(projectId =>
        cy.createIssueViaApi(Cypress.env('ACCESS_TOKEN'), projectId, issueTitle))
          .then(issueIid => {
            cy.visit(`${Cypress.env('user_name')}/${projectName}/issues/${issueIid}`)
            cy.get('.d-none.btn-close').click()
          })
  })

  it('successfully', () => {
    cy.get('[data-qa-selector="reopen_issue_button"]').click()

    cy.get('.status-box-open')
      .should('be.visible')
      .and('contain', 'Open')
  })
})
