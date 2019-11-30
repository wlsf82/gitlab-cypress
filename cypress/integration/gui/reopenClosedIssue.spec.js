const faker = require('faker')

describe('Reopen a closed issue', () => {
  const projectName = faker.random.uuid()
  const issueTitle = faker.random.uuid()

  beforeEach(() => {
    cy.gui_login()
    cy.api_createProject(Cypress.env('GITLAB_ACCESS_TOKEN'), projectName)
      .then(res =>
        cy.api_createIssue(Cypress.env('GITLAB_ACCESS_TOKEN'), res.body.id, issueTitle)
      ).then(res => {
        cy.visit(`${Cypress.env('user_name')}/${projectName}/issues/${res.body.iid}`)
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
