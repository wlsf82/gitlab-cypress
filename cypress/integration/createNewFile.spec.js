const faker = require('faker')

describe('Create new file', () => {
  const projectName = faker.random.uuid()

  const file = {
    name: `${faker.random.word()}.txt`,
    content: faker.random.words(10)
  }

  beforeEach(() => {
    cy.gui_login()
    cy.api_createProject(Cypress.env('ACCESS_TOKEN'), projectName)
    cy.visit(`${Cypress.env('user_name')}/${projectName}/new/master`)
  })

  it('successfully', () => {
    cy.gui_createFile(file)

    cy.contains('The file has been successfully created.').should('be.visible')
    cy.contains(file.name).should('be.visible')
    cy.contains(file.content).should('be.visible')
  })
})
