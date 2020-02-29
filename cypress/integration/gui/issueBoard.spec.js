describe('Issue board', () => {
  beforeEach(() => cy.gui_login())

  after(() => cy.api_deleteProjects())

  it('sees an opened issue on the issue board, closes it, and sees it closed', () => {
    cy.api_createIssue().then(issue => cy.api_getAllProjects().then(projects => {
      cy.visit(`${Cypress.env('user_name')}/${projects.body[0].name}/-/boards`)

      cy.get('[data-board-type="backlog"] [data-qa-selector="board_card"]')
        .should('contain', issue.body.title)

      cy.visit(`${Cypress.env('user_name')}/${projects.body[0].name}/issues/${issue.body.iid}`)
      cy.get('.d-none.btn-close').click()

      cy.visit(`${Cypress.env('user_name')}/${projects.body[0].name}/-/boards`)

      cy.get('[data-board-type="closed"] [data-qa-selector="board_card"]')
        .should('contain', issue.body.title)
    }))
  })
})
