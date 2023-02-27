describe('Close an issue using quick action', () => {
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.sessionLogin()
    cy.api_createIssue().as('issue')
    cy.api_getAllProjects()
      .then(function ({ body }) {
        cy.visit(`${Cypress.env('user_name')}/${body[0].name}/issues/${this.issue.body.iid}`)
      })
  })

  it('closes an issue using a quick action successfully', () => {
    cy.gui_commentOnIssue('/close ')

    cy.contains('Closed this issue')
      .should('be.visible')

    cy.reload()

    cy.contains('.status-box-issue-closed', 'Closed')
      .should('be.visible')
  })
})
