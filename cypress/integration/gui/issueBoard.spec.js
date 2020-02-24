const faker = require('faker')

describe('Issue board', () => {
  const projectName = faker.random.uuid()
  const issueTitle = faker.random.uuid()

  beforeEach(() => cy.gui_login())

  after(() => cy.api_deleteProjects())

  it('sees an opened issue on the issue board, closes it, and sees it closed', () => {
    cy.api_createProject(projectName)
      .then(resonse =>
        cy.api_createIssue(resonse.body.id, issueTitle)
      ).then(res => {
        cy.visit(`${Cypress.env('user_name')}/${projectName}/-/boards`)

        cy.get('[data-board-type="backlog"] [data-qa-selector="board_card"]')
          .should('contain', issueTitle)

        cy.visit(`${Cypress.env('user_name')}/${projectName}/issues/${res.body.iid}`)
        cy.get('.d-none.btn-close').click()

        cy.visit(`${Cypress.env('user_name')}/${projectName}/-/boards`)

        cy.get('[data-board-type="closed"] [data-qa-selector="board_card"]')
          .should('contain', issueTitle)
      })
  })
})
