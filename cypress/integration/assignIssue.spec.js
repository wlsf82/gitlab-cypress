const faker = require('faker')

describe('Assign issue', () => {
  const projectName = faker.random.uuid()
  const issueTitle = faker.random.uuid()

  beforeEach(() => {
    cy.gui_login()
    cy.api_createProject(Cypress.env('ACCESS_TOKEN'), projectName)
      .then(projectId =>
        cy.api_createIssue(Cypress.env('ACCESS_TOKEN'), projectId, issueTitle)
      ).then(issueIid =>
        cy.visit(`${Cypress.env('user_name')}/${projectName}/issues/${issueIid}`))
  })

  it('assigns an issue to yourself', () => {
    cy.contains('assign yourself').click()

    cy.get('.qa-assignee-block')
      .should('be.visible')
      .and('contain', `@${Cypress.env('user_name')}`)
  })
})
