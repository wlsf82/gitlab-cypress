const faker = require('faker')

describe('Create new file', () => {
  const project = {
    name: faker.datatype.uuid(),
    file: {
      name: `${faker.random.word()}.txt`,
      content: faker.random.words(10)
    }
  }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
    cy.api_createProject(project)
    cy.visit(`${Cypress.env('user_name')}/${project.name}/new/master`)
  })

  it('successfully', () => {
    cy.gui_createFile(project.file)

    cy.contains('The file has been successfully created.').should('be.visible')
    cy.contains(project.file.name).should('be.visible')
    cy.contains(project.file.content).should('be.visible')
  })
})
