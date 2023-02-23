describe('Reopen a closed issue', () => {
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.sessionLogin()
    cy.api_createIssue().then(issue => {
      cy.api_getAllProjects().then(({ body }) => {
        cy.visit(`${Cypress.env('user_name')}/${body[0].name}/issues/${issue.body.iid}`)
        cy.get('.d-none.btn-close').click()
      })
    })
  })

  it('reopens a closed issue successfully', () => {
    cy.get('[data-qa-selector="reopen_issue_button"]').click()

    cy.contains('.status-box-open', 'Open').should('be.visible')
  })
})
