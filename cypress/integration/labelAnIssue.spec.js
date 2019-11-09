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
    cy.createAccessToken(faker.random.uuid())
      .then(accessTokenValue =>
        cy.createProjectViaApi(accessTokenValue, projectName)
          .then(data => {
            const accessToken = data[0]
            const projectId = data[1]

            cy.createProjectLabelViaApi(accessToken, projectId, label)

            cy.createIssueViaApi(accessToken, projectId, issueTitle)
              .then(issueIid =>
                cy.visit(Cypress.env('user_name') + '/' + projectName + '/issues/' + issueIid))
          }))
  })

  it('successfully', () => {
    cy.labelIssueWith(label)

    cy.get('.qa-labels-block').should('contain', label.name)
  })
})
