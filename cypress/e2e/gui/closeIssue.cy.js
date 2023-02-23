describe('Close an issue', () => {
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.sessionLogin()
    cy.api_createIssue().then(issue => {
      cy.api_getAllProjects().then(({ body }) => {
        cy.visit(`${Cypress.env('user_name')}/${body[0].name}/issues/${issue.body.iid}`)
      })
    })
  })

  it('closes an issue successfully', () => {
    cy.get('.d-none.btn-close').click()

    cy.contains('.status-box-issue-closed', 'Closed')
      .should('be.visible')
  })
})
