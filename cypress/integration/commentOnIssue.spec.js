const faker = require('faker')

describe('Comments on an Issue', () => {
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

  it('successfully', () => {
    const comment = faker.random.words(3)

    cy.gui_commentOnIssue(comment)

    cy.get('.qa-noteable-note-item').should('contain', comment)
  })
})
