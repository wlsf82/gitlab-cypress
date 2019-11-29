const faker = require('faker')

describe('Create Project', () => {
  it('successfully', () => {
    const projectName = faker.random.word()

    cy.api_createProject(Cypress.env('GITLAB_ACCESS_TOKEN'), projectName)
      .then(response => {
        expect(response.status).to.equal(201)
        expect(response.body.name).to.equal(projectName)
      })
  })
})
