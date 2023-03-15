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

  it('comments on an issue', function () {
    const comment = faker.random.words(3)
    const { name: projectName } = this.projectsBody[0]
    const { iid: issueIid } = this.issue.body

    cy.visit(`${Cypress.env('user_name')}/${projectName}/issues/${issueIid}`)

    cy.gui_commentOnIssue(comment)

    cy.contains('.qa-noteable-note-item', comment)
      .should('be.visible')
  })
})
