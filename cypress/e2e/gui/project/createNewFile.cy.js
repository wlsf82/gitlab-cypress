import { faker } from '@faker-js/faker/locale/en'

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
    cy.sessionLogin()
    cy.api_createProject(project)
  })

  it('creates a new file successfully', () => {
    cy.visit(`${Cypress.env('USER_NAME')}/${project.name}/new/master`)

    cy.gui_createFile(project.file)

    cy.contains('The file has been successfully created.').should('be.visible')
    cy.contains(project.file.name).should('be.visible')
    cy.contains(project.file.content).should('be.visible')
  })
})
