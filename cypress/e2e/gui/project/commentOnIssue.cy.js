import { faker } from '@faker-js/faker/locale/en'

describe('Comment on an Issue', () => {
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.sessionLogin()
    cy.api_createIssue().as('issue')
    cy.api_getAllProjects()
      .its('body')
      .as('projectsBody')
  })

  it('comments on an issue successfully', function () {
    const comment = faker.random.words(3)

    cy.visit(`${Cypress.env('USER_NAME')}/${this.projectsBody[0].name}/issues/${this.issue.body.iid}`)

    cy.gui_commentOnIssue(comment)

    cy.contains('.qa-noteable-note-item', comment)
      .should('be.visible')
  })
})
