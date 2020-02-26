describe('Issue board', () => {
  beforeEach(() => cy.gui_login())

  after(() => cy.api_deleteProjects())

  it('sees an opened issue on the issue board, closes it, and sees it closed', () => {
    cy.api_createIssue()
      .then(issueResponse => cy.api_getAllProjects()
        .then(projectsResponse => {
          cy.visit(`${Cypress.env('user_name')}/${projectsResponse.body[0].name}/-/boards`)

          cy.get('[data-board-type="backlog"] [data-qa-selector="board_card"]')
            .should('contain', issueResponse.body.title)

          cy.visit(`${Cypress.env('user_name')}/${projectsResponse.body[0].name}/issues/${issueResponse.body.iid}`)
          cy.get('.d-none.btn-close').click()

          cy.visit(`${Cypress.env('user_name')}/${projectsResponse.body[0].name}/-/boards`)

          cy.get('[data-board-type="closed"] [data-qa-selector="board_card"]')
            .should('contain', issueResponse.body.title)
        }))
  })
})
