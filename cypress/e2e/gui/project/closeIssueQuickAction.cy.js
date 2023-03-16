describe('Close an issue using quick action', () => {
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.sessionLogin()
    cy.api_createIssue().as('issue')
    cy.api_getAllProjects()
      .its('body')
      .as('projectsBody')
  })

  it('closes an issue using a quick action successfully', function () {
    cy.visit(`${Cypress.env('USER_NAME')}/${this.projectsBody[0].name}/issues/${this.issue.body.iid}`)

    cy.gui_commentOnIssue('/close ')

    cy.contains('Closed this issue')
      .should('be.visible')

    cy.reload()

    cy.contains('.status-box-issue-closed', 'Closed')
      .should('be.visible')
  })
})
