const faker = require('faker')

describe('Comments on an Issue', () => {
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

  it('successfully', () => {
    const comment = faker.random.words(3)

    cy.gui_commentOnIssue(comment)

    cy.get('.qa-noteable-note-item').should('contain', comment)
  })
})
