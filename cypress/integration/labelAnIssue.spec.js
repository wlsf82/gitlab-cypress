const faker = require('faker')

describe('Label an issue', () => {
  const projectName = faker.random.uuid()
  const issueTitle = faker.random.uuid()
  const label = {
    name: `label-${faker.random.word()}`,
    color: '#ffaabb'
  }

  beforeEach(() => {
    cy.login()
    cy.createProjectViaApi(Cypress.env('ACCESS_TOKEN'), projectName)
      .then(projectId => {
        cy.createProjectLabelViaApi(Cypress.env('ACCESS_TOKEN'), projectId, label)
        cy.createIssueViaApi(Cypress.env('ACCESS_TOKEN'), projectId, issueTitle)
          .then(issueIid =>
            cy.visit(`${Cypress.env('user_name')}/${projectName}/issues/${issueIid}`))
      })
  })

  it('successfully', () => {
    cy.labelIssueWith(label)

    cy.get('.qa-labels-block').should('contain', label.name)
  })
})
