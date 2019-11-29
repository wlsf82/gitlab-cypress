const faker = require('faker')

describe('Assign issue', () => {
  const projectName = faker.random.uuid()
  const issueTitle = faker.random.uuid()

  beforeEach(() => {
    cy.gui_login()
    cy.api_createProject(Cypress.env('GITLAB_ACCESS_TOKEN'), projectName)
      .then(response =>
        cy.api_createIssue(Cypress.env('GITLAB_ACCESS_TOKEN'), response.body.id, issueTitle)
      ).then(response =>
        cy.visit(`${Cypress.env('user_name')}/${projectName}/issues/${response.body.iid}`))
  })

  it('assigns an issue to yourself', () => {
    cy.contains('assign yourself').click()

    cy.get('.qa-assignee-block')
      .should('be.visible')
      .and('contain', `@${Cypress.env('user_name')}`)
  })
})
