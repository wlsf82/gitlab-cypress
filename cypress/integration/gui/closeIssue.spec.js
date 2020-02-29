describe('Close an issue', () => {
  beforeEach(() => {
    cy.gui_login()
    cy.api_createIssue().then(issue => cy.api_getAllProjects().then(projects =>
      cy.visit(`${Cypress.env('user_name')}/${projects.body[0].name}/issues/${issue.body.iid}`)
    ))
  })

  after(() => cy.api_deleteProjects())

  it('successfully', () => {
    cy.get('.d-none.btn-close').click()

    cy.get('.status-box-issue-closed')
      .should('be.visible')
      .and('contain', 'Closed')
  })
})
