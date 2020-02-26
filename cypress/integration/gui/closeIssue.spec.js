describe('Close an issue', () => {
  beforeEach(() => {
    cy.gui_login()
    cy.api_createIssue()
      .then(issueResponse => cy.api_getAllProjects()
        .then(projectsResponse => cy.visit(`${Cypress.env('user_name')}/${projectsResponse.body[0].name}/issues/${issueResponse.body.iid}`)))
  })

  after(() => cy.api_deleteProjects())

  it('successfully', () => {
    cy.get('.d-none.btn-close').click()

    cy.get('.status-box-issue-closed')
      .should('be.visible')
      .and('contain', 'Closed')
  })
})
