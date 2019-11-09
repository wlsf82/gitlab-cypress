const faker = require('faker')

describe('Create Projet Milestone', () => {
  const project = { name: faker.random.uuid() }

  const milestone = {
    project,
    title: `milestone-${faker.random.uuid()}`
  }

  beforeEach(() => {
    cy.login()
    cy.createAccessToken(faker.random.uuid())
      .then(accessTokenValue =>
        cy.createProjectViaApi(accessTokenValue, project.name))
  })

  it('successfully creates an issue', () => {
    cy.createProjectMilestone(milestone)

    cy.get('.qa-milestone-title').should('contain', milestone.title)
  })
})
