import { faker } from '@faker-js/faker'

describe('Create Access Token', () => {
  beforeEach(() => cy.sessionLogin())

  it('creates an access token successfully', () => {
    cy.gui_createAccessToken(faker.datatype.uuid())

    cy.contains('Your new personal access token has been created.')
      .should('be.visible')
    cy.get('.qa-created-personal-access-token')
      .should('be.visible')
      .then(($field) => {
        const token = $field[0]['value']
        cy.task('saveToken', token)
      })
  })
})
