const faker = require('faker')

describe('Close an issue using quick action', () => {
  const projectName = faker.random.uuid()
  const issueTitle = faker.random.uuid()

  beforeEach(() => {
    cy.gui_login()
    cy.api_createProject(projectName)
      .then(res =>
        cy.api_createIssue(res.body.id, issueTitle)
      ).then(res =>
        cy.visit(`${Cypress.env('user_name')}/${projectName}/issues/${res.body.iid}`))
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
