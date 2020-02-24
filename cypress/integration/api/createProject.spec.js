const faker = require('faker')

describe('Create Project', () => {
  after(() => cy.api_deleteProjects())

  it('successfully', () => {
    const projectName = faker.random.word()

    cy.api_createProject(projectName)
      .then(response => {
        expect(response.status).to.equal(201)
        expect(response.body.name).to.equal(projectName)
      })
  })
})
