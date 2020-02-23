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
    cy.api_createProject(projectName)
      .then(resonse => {
        cy.api_createProjectLabel(resonse.body.id, label)
        cy.api_createIssue(resonse.body.id, issueTitle)
          .then(res =>
            cy.visit(`${Cypress.env('user_name')}/${projectName}/issues/${res.body.iid}`))
      })
  })

  after(() => cy.api_getAllProjects()
    .then(response => response.body.forEach(project =>
      cy.api_deleteProject(project.id))))

  it('successfully', () => {
    cy.gui_labelIssueWith(label)

    cy.get('.qa-labels-block').should('contain', label.name)
  })
})
