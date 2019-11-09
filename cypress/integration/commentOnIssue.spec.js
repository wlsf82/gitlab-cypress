const faker = require('faker')

describe('Comments on an Issue', () => {
  const projectName = faker.random.uuid()
  const issueTitle = faker.random.uuid()

  beforeEach(() => {
    cy.login()
    cy.createAccessToken(faker.random.uuid())
      .then(accessTokenValue =>
        cy.createProjectViaApi(accessTokenValue, projectName)
          .then(data => {
            const accessToken = data[0]
            const projectId = data[1]

            cy.createIssueViaApi(accessToken, projectId, issueTitle)
              .then(issueIid =>
                cy.visit(`${Cypress.env('user_name')}/${projectName}/issues/${issueIid}`))
          }))
  })

  it('successfully', () => {
    const comment = faker.random.words(3)

    cy.get('.qa-comment-input').type(comment)
    cy.get('.qa-comment-button').click()

    cy.get('.qa-noteable-note-item').should('contain', comment)
  })
})
