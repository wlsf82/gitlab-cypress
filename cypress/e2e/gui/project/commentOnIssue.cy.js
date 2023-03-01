import { faker } from '@faker-js/faker/locale/en'

describe('Comments on an Issue', () => {
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.sessionLogin()
    cy.api_createIssue().as('issue')
    cy.api_getAllProjects()
      .then(function ({ body }) {
        cy.visit(`${Cypress.env('user_name')}/${body[0].name}/issues/${this.issue.body.iid}`)
      })
  })

  it('comments on an issue successfully', () => {
    const comment = faker.random.words(3)

    cy.gui_commentOnIssue(comment)

    cy.contains('.qa-noteable-note-item', comment)
      .should('be.visible')
  })
})
