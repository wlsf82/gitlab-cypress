describe('Assign issue', () => {
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.sessionLogin()
    cy.api_createIssue().then(issue => {
      cy.api_getAllProjects().then(({ body }) => {
        cy.visit(`${Cypress.env('user_name')}/${body[0].name}/issues/${issue.body.iid}`)
      })
    })
  })

  it('assigns an issue to yourself', () => {
    cy.contains('assign yourself').click()

    cy.contains('.qa-assignee-block', `@${Cypress.env('user_name')}`)
      .should('be.visible')
  })
})
