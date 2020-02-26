const faker = require('faker')

const accessToken = Cypress.env('gitlab_access_token')

Cypress.Commands.add('api_createGroup', group => {
  cy.request({
    method: 'POST',
    url: `/api/v4/groups/?private_token=${accessToken}`,
    body: {
      name: group.name,
      path: group.path
    }
  })
})

Cypress.Commands.add('api_getAllGroups', () => {
  cy.request({
    method: 'GET',
    url: `/api/v4/groups/?private_token=${accessToken}`
  })
})

Cypress.Commands.add('api_deleteGroups', () => {
  cy.api_getAllGroups()
    .then(response => {
      response.body.forEach(group => {
        cy.request({
          method: 'DELETE',
          url: `/api/v4/groups/${group.id}?private_token=${accessToken}`
        }).then(response => expect(response.status).to.equal(202))
      })
    })
})

Cypress.Commands.add('api_createProject', project => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/?private_token=${accessToken}`,
    body: { name: project.name }
  })
})

Cypress.Commands.add('api_getAllProjects', () => {
  cy.request({
    method: 'GET',
    url: `/api/v4/projects/?private_token=${accessToken}`
  })
})

Cypress.Commands.add('api_deleteProjects', () => {
  cy.api_getAllProjects()
    .then(response => {
      response.body.forEach(project => {
        cy.request({
          method: 'DELETE',
          url: `/api/v4/projects/${project.id}?private_token=${accessToken}`
        }).then(response => expect(response.status).to.equal(202))
      })
    })
})

Cypress.Commands.add('api_createIssue', () => {
  cy.api_createProject({ name: `project-${faker.random.uuid()}` })
    .then(response => {
      cy.request({
        method: 'POST',
        url: `/api/v4/projects/${response.body.id}/issues?private_token=${accessToken}`,
        body: { title: `title-${faker.random.uuid()}` }
      })
    })
})

Cypress.Commands.add('api_createProjectLabel', (projectId, label) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/${projectId}/labels?private_token=${accessToken}`,
    body: {
      name: label.name,
      color: label.color
    }
  })
})

Cypress.Commands.add('api_createProjectMilestone', (projectId, milestone) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/${projectId}/milestones?private_token=${accessToken}`,
    body: { title: milestone.title }
  })
})

Cypress.Commands.add('api_createUser', user => {
  let skipConfirmation = false

  if (Object.prototype.hasOwnProperty.call(user, 'skip_confirmation')) {
    skipConfirmation = user.skip_confirmation
  }

  cy.request({
    method: 'POST',
    url: `/api/v4/users/?private_token=${accessToken}`,
    body: {
      email: user.email,
      name: user.name,
      username: user.username,
      password: user.password,
      skip_confirmation: skipConfirmation
    }
  })
})

Cypress.Commands.add('api_getAllUsers', () => {
  cy.request({
    method: 'GET',
    url: `/api/v4/users/?private_token=${accessToken}`
  })
})

Cypress.Commands.add('api_deleteUser', userId => {
  cy.request({
    method: 'DELETE',
    url: `/api/v4/users/${userId}?private_token=${accessToken}`
  }).then(response => expect(response.status).to.equal(204))
})

Cypress.Commands.add('api_updateUserWebsite', (userId, website) => {
  cy.request({
    method: 'PUT',
    url: `/api/v4/users/${userId}?private_token=${accessToken}`,
    body: { website_url: website }
  })
})
