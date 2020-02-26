const faker = require('faker')

describe('Comments on an Issue', () => {
  beforeEach(() => {
    cy.gui_login()
    cy.api_createIssue()
      .then(issueResponse => cy.api_getAllProjects()
        .then(projectsResponse => cy.visit(`${Cypress.env('user_name')}/${projectsResponse.body[0].name}/issues/${issueResponse.body.iid}`)))
  })

  after(() => cy.api_deleteProjects())

  it('successfully', () => {
    const comment = faker.random.words(3)

    cy.gui_commentOnIssue(comment)

    cy.get('.qa-noteable-note-item').should('contain', comment)
  })
})
