describe('Assign issue', () => {
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.sessionLogin()
    cy.api_createIssue().as('issue')
    cy.api_getAllProjects()
      .then(function({ body }) {
        cy.visit(`${Cypress.env('user_name')}/${body[0].name}/issues/${this.issue.body.iid}`)
      })
  })

  it('assigns an issue to yourself', () => {
    cy.contains('assign yourself').click()

    cy.contains('.qa-assignee-block', `@${Cypress.env('user_name')}`)
      .should('be.visible')
  })
})
