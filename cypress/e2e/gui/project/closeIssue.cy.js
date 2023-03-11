describe('Close an issue', () => {
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.sessionLogin()
    cy.api_createIssue().as('issue')
    cy.api_getAllProjects()
      .its('body')
      .as('projectsBody')
  })

  it('closes an issue successfully', function () {
    cy.visit(`${Cypress.env('user_name')}/${this.projectsBody[0].name}/issues/${this.issue.body.iid}`)

    cy.get('.d-none.btn-close').click()

    cy.contains('.status-box-issue-closed', 'Closed')
      .should('be.visible')
  })
})
