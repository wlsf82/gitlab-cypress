describe('Assign issue', () => {
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.sessionLogin()
    cy.api_createIssue().as('issue')
    cy.api_getAllProjects()
      .its('body')
      .as('projectsBody')
  })

  it('assigns an issue to yourself', function () {
    cy.visit(`${Cypress.env('user_name')}/${this.projectsBody[0].name}/issues/${this.issue.body.iid}`)

    cy.contains('assign yourself').click()

    cy.contains('.qa-assignee-block', `@${Cypress.env('user_name')}`)
      .should('be.visible')
  })
})
