const faker = require('faker')

describe('Issue board', () => {
  const projectName = faker.random.uuid()
  const issueTitle = faker.random.uuid()

  beforeEach(() => cy.gui_login())

  it('sees an opened issue on the issue board, closes it, and sees it closed', () => {
    cy.api_createProject(Cypress.env('ACCESS_TOKEN'), projectName)
      .then(projectId =>
        cy.api_createIssue(Cypress.env('ACCESS_TOKEN'), projectId, issueTitle)
      ).then(issueIid => {
        cy.visit(`${Cypress.env('user_name')}/${projectName}/-/boards`)

        cy.get('[data-board-type="backlog"] [data-qa-selector="board_card"]')
          .should('contain', issueTitle)

        cy.visit(`${Cypress.env('user_name')}/${projectName}/issues/${issueIid}`)
        cy.get('.d-none.btn-close').click()

        cy.visit(`${Cypress.env('user_name')}/${projectName}/-/boards`)

        cy.get('[data-board-type="closed"] [data-qa-selector="board_card"]')
          .should('contain', issueTitle)
      })
  })
})
