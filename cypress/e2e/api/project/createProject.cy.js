import { faker } from '@faker-js/faker/locale/en'

describe('Project', () => {
  before(() => cy.api_deleteProjects())

  it('creates a project', () => {
    const project = { name: `project-${faker.datatype.uuid()}` }

    cy.api_createProject(project)
      .then(({ status, body }) => {
        expect(status).to.equal(201)
        expect(body.name).to.equal(project.name)
      })
  })
})
