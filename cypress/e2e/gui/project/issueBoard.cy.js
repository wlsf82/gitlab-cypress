describe('Issue board', () => {
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.sessionLogin()
  })

  it('shows an open issue on the issue board, closes it, and shows it closed', () => {
    cy.api_createIssue().as('issue')
    cy.api_getAllProjects()
      .then(function ({ body }) {
        const { title, iid } = this.issue.body
        const { name: projectName } = body[0]

        cy.env(['USERNAME']).then(({ USERNAME }) => {
          cy.intercept('PUT', `${USERNAME}/${projectName}/issues/**`)
            .as('closeIssueRequest')

          cy.visit(`${USERNAME}/${projectName}/-/boards`)

          cy.contains('[data-board-type="backlog"] [data-qa-selector="board_card"]', title)
            .should('be.visible')

          cy.visit(`${USERNAME}/${projectName}/issues/${iid}`)
          cy.get('.d-none.btn-close').click()
          cy.wait('@closeIssueRequest')

          cy.visit(`${USERNAME}/${projectName}/-/boards`)

          cy.contains('[data-board-type="closed"] [data-qa-selector="board_card"]', title)
            .should('be.visible')
        })
      })
  })
})
