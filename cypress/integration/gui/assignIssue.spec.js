const faker = require('faker')

describe('Assign issue', () => {
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

  it('assigns an issue to yourself', () => {
    cy.contains('assign yourself').click()

    cy.get('.qa-assignee-block')
      .should('be.visible')
      .and('contain', `@${Cypress.env('user_name')}`)
  })
})
