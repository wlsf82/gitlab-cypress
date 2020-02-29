describe('Assign issue', () => {
  beforeEach(() => {
    cy.gui_login()
    cy.api_createIssue().then(issue => cy.api_getAllProjects().then(projects =>
      cy.visit(`${Cypress.env('user_name')}/${projects.body[0].name}/issues/${issue.body.iid}`)
    ))
  })

  after(() => cy.api_deleteProjects())

  it('assigns an issue to yourself', () => {
    cy.contains('assign yourself').click()

    cy.get('.qa-assignee-block')
      .should('be.visible')
      .and('contain', `@${Cypress.env('user_name')}`)
  })
})
