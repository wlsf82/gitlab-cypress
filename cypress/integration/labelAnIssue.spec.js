const faker = require('faker')

describe('Label an issue', () => {
  const projectName = faker.random.uuid()
  const issueTitle = faker.random.uuid()
  const label = {
    name: `label-${faker.random.word()}`,
    color: '#ffaabb'
  }

  beforeEach(() => {
    cy.gui_login()
    cy.api_createProject(Cypress.env('GITLAB_ACCESS_TOKEN'), projectName)
      .then(projectId => {
        cy.api_createProjectLabel(Cypress.env('GITLAB_ACCESS_TOKEN'), projectId, label)
        cy.api_createIssue(Cypress.env('GITLAB_ACCESS_TOKEN'), projectId, issueTitle)
          .then(issueIid =>
            cy.visit(`${Cypress.env('user_name')}/${projectName}/issues/${issueIid}`))
      })
  })

  it('successfully', () => {
    cy.gui_labelIssueWith(label)

    cy.get('.qa-labels-block').should('contain', label.name)
  })
})
