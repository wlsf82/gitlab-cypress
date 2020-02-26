const faker = require('faker')

describe('Label an issue', () => {
  const label = {
    name: `label-${faker.random.word()}`,
    color: '#ffaabb'
  }

  beforeEach(() => {
    cy.gui_login()
    cy.api_createIssue()
      .then(issueResponse => cy.api_getAllProjects()
        .then(projectsResponse => {
          cy.api_createProjectLabel(projectsResponse.body[0].id, label)
          cy.visit(`${Cypress.env('user_name')}/${projectsResponse.body[0].name}/issues/${issueResponse.body.iid}`)
        }))
  })

  after(() => cy.api_deleteProjects())

  it('successfully', () => {
    cy.gui_labelIssueWith(label)

    cy.get('.qa-labels-block').should('contain', label.name)
  })
})
