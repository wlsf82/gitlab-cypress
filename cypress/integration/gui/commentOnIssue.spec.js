const faker = require('faker')

describe('Comments on an Issue', () => {
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
    cy.api_createIssue().then(issue => cy.api_getAllProjects().then(projects =>
      cy.visit(`${Cypress.env('user_name')}/${projects.body[0].name}/issues/${issue.body.iid}`)
    ))
  })

  it('successfully', () => {
    const comment = faker.random.words(3)

    cy.gui_commentOnIssue(comment)

    cy.get('.qa-noteable-note-item').should('contain', comment)
  })
})
