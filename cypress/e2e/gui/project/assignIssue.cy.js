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
    const { name: projectName } = this.projectsBody[0]
    const { iid: issueIid } = this.issue.body

    cy.visit(`${Cypress.env('user_name')}/${projectName}/issues/${issueIid}`)

    cy.contains('assign yourself').click()

    cy.contains('.qa-assignee-block', `@${Cypress.env('user_name')}`)
      .should('be.visible')
  })
})
