const faker = require('faker')

describe('Comments on an Issue', () => {
  const projectName = faker.random.uuid()
  const issueTitle = faker.random.uuid()

  beforeEach(() => {
    cy.login()
    cy.createProjectViaApi(Cypress.env('ACCESS_TOKEN'), projectName)
      .then(projectId =>
        cy.createIssueViaApi(Cypress.env('ACCESS_TOKEN'), projectId, issueTitle))
          .then(issueIid =>
            cy.visit(`${Cypress.env('user_name')}/${projectName}/issues/${issueIid}`))
  })

  it('successfully', () => {
    const comment = faker.random.words(3)

    cy.commentOnIssue(comment)

    cy.get('.qa-noteable-note-item').should('contain', comment)
  })
})
