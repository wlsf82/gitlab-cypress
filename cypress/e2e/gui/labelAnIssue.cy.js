import { faker } from '@faker-js/faker'

describe('Label an issue', () => {
  const label = {
    name: `label-${faker.random.word()}`,
    color: '#ffaabb'
  }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.sessionLogin()
    cy.api_createIssue().then(issue => {
      cy.api_getAllProjects().then(({ body }) => {
        cy.api_createProjectLabel(body[0].id, label)
        cy.visit(`${Cypress.env('user_name')}/${body[0].name}/issues/${issue.body.iid}`)
      })
    })
  })

  it('labels an issue successfully', () => {
    cy.gui_labelIssueWith(label)

    cy.contains('.qa-labels-block', label.name).should('be.visible')
  })
})
