const faker = require('faker')

describe('Create Project', () => {
  before(() => cy.api_deleteProjects())

  it('successfully', () => {
    const project = {
      name: faker.random.word()
    }

    cy.api_createProject(project).then(response => {
      expect(response.status).to.equal(201)
      expect(response.body.name).to.equal(project.name)
    })
  })
})
