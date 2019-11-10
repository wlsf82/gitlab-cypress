const faker = require('faker')

describe('Create Projet Milestone', () => {
  const project = { name: faker.random.uuid() }

  const milestone = {
    project,
    title: `milestone-${faker.random.uuid()}`
  }

  beforeEach(() => {
    cy.login()
    cy.createProjectViaApi(Cypress.env('ACCESS_TOKEN'), project.name)
  })

  it('successfully', () => {
    cy.createProjectMilestone(milestone)

    cy.get('.qa-milestone-title').should('contain', milestone.title)
  })
})
