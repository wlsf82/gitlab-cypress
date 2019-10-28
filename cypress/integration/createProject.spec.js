const faker = require('faker')

describe('Create Project', () => {
  beforeEach(() => cy.login())

  it('successfully creates a project', () => {
    const project = {
      name: faker.random.uuid(),
      description: faker.random.words(5)
    }

    cy.createProjectViaGui(project)

    cy.url().should('be.equal', `${Cypress.config().baseUrl}${Cypress.env('user_name')}/${project.name}`)
    cy.contains(project.name).should('be.visible')
    cy.contains(project.description).should('be.visible')
  })

  context('Create project via API', () => {
    const projectName = faker.random.uuid()

    beforeEach(() => cy.createAccessToken(faker.random.uuid())
      .then(accessTokenValue =>
        cy.createProjectViaApi(accessTokenValue, projectName)))

    it('successfully visits the just create project', () => {
      cy.visit(Cypress.env('user_name') + '/' + projectName)

      cy.get('.qa-project-name')
        .should('be.visible')
        .and('contain', projectName)
    })
  })
})
