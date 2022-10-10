describe('Reopen a closed issue', () => {
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
    cy.api_createIssue().then(issue => cy.api_getAllProjects().then(projects => {
      cy.visit(`${Cypress.env('user_name')}/${projects.body[0].name}/issues/${issue.body.iid}`)
      cy.get('.d-none.btn-close').click()
    }))
  })

  it('successfully', () => {
    cy.get('[data-qa-selector="reopen_issue_button"]').click()

    cy.get('.status-box-open')
      .should('be.visible')
      .and('contain', 'Open')
  })
})
