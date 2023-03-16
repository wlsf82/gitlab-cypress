describe('Issue', () => {
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.sessionLogin()
    cy.api_createIssue().as('issue')
    cy.api_getAllProjects()
      .its('body')
      .as('projectsBody')
  })

  it('closes an issue', function () {
    const { name: projectName } = this.projectsBody[0]
    const { iid: issueIid } = this.issue.body

    cy.visit(`${Cypress.env('USER_NAME')}/${projectName}/issues/${issueIid}`)

    cy.get('.d-none.btn-close').click()

    cy.contains('.status-box-issue-closed', 'Closed')
      .should('be.visible')
  })
})
