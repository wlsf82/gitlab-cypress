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
    const { name: projectName } = this.projectsBody[0]
    const { iid: issueIid } = this.issue.body

    cy.visit(`${Cypress.env('user_name')}/${projectName}/issues/${issueIid}`)

    cy.gui_commentOnIssue('/close ')

    cy.contains('Closed this issue')
      .should('be.visible')

    cy.reload()

    cy.contains('.status-box-issue-closed', 'Closed')
      .should('be.visible')
  })
})
