import { faker } from '@faker-js/faker'

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
        cy.api_createProjectLabel(body[0].id, label)
        cy.visit(`${Cypress.env('user_name')}/${body[0].name}/issues/${this.issue.body.iid}`)
      })
  })

  it('labels an issue successfully', () => {
    cy.gui_labelIssueWith(label)

    cy.contains('.qa-labels-block', label.name).should('be.visible')
  })
})
