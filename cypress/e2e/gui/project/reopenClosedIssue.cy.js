describe('Reopen a closed issue', () => {
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.sessionLogin()
    cy.api_createIssue().as('issue')
    cy.api_getAllProjects()
      .then(function ({ body }) {
        const { name: projectName } = body[0]
        const { iid: issueIid } = this.issue.body

        cy.visit(`${Cypress.env('user_name')}/${projectName}/issues/${issueIid}`)
        cy.get('.d-none.btn-close').click()
      })
  })

  it('reopens a closed issue successfully', () => {
    cy.get('[data-qa-selector="reopen_issue_button"]').click()

    cy.contains('.status-box-open', 'Open').should('be.visible')
  })
})
