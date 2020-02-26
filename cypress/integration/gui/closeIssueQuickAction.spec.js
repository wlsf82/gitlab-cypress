describe('Close an issue using quick action', () => {
  beforeEach(() => {
    cy.gui_login()
    cy.api_createIssue()
      .then(issueResponse => cy.api_getAllProjects()
        .then(projectsResponse => cy.visit(`${Cypress.env('user_name')}/${projectsResponse.body[0].name}/issues/${issueResponse.body.iid}`)))
  })

  after(() => cy.api_deleteProjects())

  it('successfully', () => {
    cy.gui_commentOnIssue('/close ')

    cy.contains('Closed this issue')
      .should('be.visible')

    cy.reload()

    cy.get('.status-box-issue-closed')
      .should('be.visible')
      .and('contain', 'Closed')
  })
})
