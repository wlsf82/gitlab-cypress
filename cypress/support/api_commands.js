import { faker } from '@faker-js/faker'

const accessToken = Cypress.env('gitlab_access_token')

Cypress.Commands.add('api_createGroup', ({ name, path }) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/groups/?private_token=${accessToken}`,
    body: { name, path }
  })
})

Cypress.Commands.add('api_getAllGroups', () => {
  cy.request({
    method: 'GET',
    url: `/api/v4/groups/?private_token=${accessToken}`
  })
})

Cypress.Commands.add('api_deleteGroups', () => {
  cy.api_getAllGroups().then(({ body }) => {
    body.forEach(({ id }) => {
      cy.request({
        method: 'DELETE',
        url: `/api/v4/groups/${id}?private_token=${accessToken}`
      })
    })
  })
})

Cypress.Commands.add('api_createProject', ({ name }) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/?private_token=${accessToken}`,
    body: { name }
  })
})

Cypress.Commands.add('api_getAllProjects', () => {
  cy.request({
    method: 'GET',
    url: `/api/v4/projects/?private_token=${accessToken}`
  })
})

Cypress.Commands.add('api_deleteProjects', () => {
  cy.api_getAllProjects().then(({ body }) => {
    body.forEach(({ id }) => {
      cy.request({
        method: 'DELETE',
        url: `/api/v4/projects/${id}?private_token=${accessToken}`
      })
    })
  })
})

Cypress.Commands.add('api_createIssue', () => {
  cy.api_createProject({ name: `project-${faker.datatype.uuid()}` }).then(({ body }) => {
    cy.request({
      method: 'POST',
      url: `/api/v4/projects/${body.id}/issues?private_token=${accessToken}`,
      body: { title: `title-${faker.datatype.uuid()}` }
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
  })
})

Cypress.Commands.add('deleteAllUsersButRoot', () => {
  cy.api_getAllUsers()
    .its('body')
    .each(({ username, id }) => {
      if (username !== 'root') cy.api_deleteUser(id)
    })
})

Cypress.Commands.add('api_updateUserWebsite', (userId, website) => {
  cy.request({
    method: 'PUT',
    url: `/api/v4/users/${userId}?private_token=${accessToken}`,
    body: { website_url: website }
  })
})

Cypress.Commands.add('api_getAllBroadcastMessages', () => {
  cy.request({
    method: 'GET',
    url: `/api/v4/broadcast_messages/?private_token=${accessToken}`
  })
})

Cypress.Commands.add('api_deleteBroadcastMessages', () => {
  cy.api_getAllBroadcastMessages().then(({ body }) => {
    body.forEach(({ id }) => {
      cy.request({
        method: 'DELETE',
        url: `/api/v4/broadcast_messages/${id}?private_token=${accessToken}`
      })
    })
  })
})
