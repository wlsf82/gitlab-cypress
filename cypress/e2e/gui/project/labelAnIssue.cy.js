import { faker } from '@faker-js/faker/locale/en'

describe('Label an issue', () => {
  const label = {
    name: `label-${faker.random.word()}`,
    color: '#ffaabb'
  }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.sessionLogin()
    cy.api_createIssue().as('issue')
    cy.api_getAllProjects()
      .then(function ({ body }) {
        const project = body[0]
        const issueIid = this.issue.body.iid

        cy.api_createProjectLabel(project.id, label)
        cy.visit(`${Cypress.env('user_name')}/${project.name}/issues/${issueIid}`)
      })
  })

  it('labels an issue successfully', () => {
    cy.gui_labelIssueWith(label)

    cy.contains('.qa-labels-block', label.name).should('be.visible')
  })
})
