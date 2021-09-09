const faker = require('faker')

describe('Label an issue', () => {
  const label = {
    name: `label-${faker.random.word()}`,
    color: '#ffaabb'
  }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
    cy.api_createIssue().then(issue => cy.api_getAllProjects().then(projects => {
      cy.api_createProjectLabel(projects.body[0].id, label)
      cy.visit(`${Cypress.env('user_name')}/${projects.body[0].name}/issues/${issue.body.iid}`)
    }))
  })

  it('successfully', () => {
    cy.gui_labelIssueWith(label)

    cy.get('.qa-labels-block').should('contain', label.name)
  })
})
