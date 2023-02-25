import { faker } from '@faker-js/faker'

let accessToken

/**
 * `cy.task` can only be called from within a test!
 *
 * `setAccessTokenIfNotYetSet` is defined as a function that can be called
 * by custom commands or tests. This is because `cy.task` can only be called
 * from within a test. Since custom commands are called by test, calling the
 * `setAccessTokenIfNotYetSet` is like calling it from inside the test that
 * uses the command, making it a valid call.
 */
const setAccessTokenIfNotYetSet = () => {
  if (!accessToken) {
    cy.task('getToken')
      .then(token => accessToken = token)
  }
}

Cypress.Commands.add('api_createGroup', ({ name, path }) => {
  setAccessTokenIfNotYetSet()
  cy.request({
    method: 'POST',
    url: `/api/v4/groups/?private_token=${accessToken}`,
    body: { name, path }
  })
})

Cypress.Commands.add('api_getAllGroups', () => {
  setAccessTokenIfNotYetSet()
  cy.request({
    method: 'GET',
    url: `/api/v4/groups/?private_token=${accessToken}`
  })
})

Cypress.Commands.add('api_deleteGroups', () => {
  setAccessTokenIfNotYetSet()
  cy.api_getAllGroups()
    .its('body')
    .each(({ id }) => {
      cy.request({
        method: 'DELETE',
        url: `/api/v4/groups/${id}?private_token=${accessToken}`
      })
    })
})

Cypress.Commands.add('api_createProject', ({ name }) => {
  setAccessTokenIfNotYetSet()
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/?private_token=${accessToken}`,
    body: { name }
  })
})

Cypress.Commands.add('api_getAllProjects', () => {
  setAccessTokenIfNotYetSet()
  cy.request({
    method: 'GET',
    url: `/api/v4/projects/?private_token=${accessToken}`
  })
})

Cypress.Commands.add('api_deleteProjects', () => {
  setAccessTokenIfNotYetSet()
  cy.api_getAllProjects()
    .its('body')
    .each(({ id }) => {
      cy.request({
        method: 'DELETE',
        url: `/api/v4/projects/${id}?private_token=${accessToken}`
      })
    })
})

Cypress.Commands.add('api_createIssue', () => {
  setAccessTokenIfNotYetSet()
  cy.api_createProject({ name: `project-${faker.datatype.uuid()}` })
    .then(({ body }) => {
      cy.request({
        method: 'POST',
        url: `/api/v4/projects/${body.id}/issues?private_token=${accessToken}`,
        body: { title: `title-${faker.datatype.uuid()}` }
      })
    })
})

Cypress.Commands.add('api_createProjectLabel', (projectId, label) => {
  setAccessTokenIfNotYetSet()
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
  setAccessTokenIfNotYetSet()
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/${projectId}/milestones?private_token=${accessToken}`,
    body: { title: milestone.title }
  })
})

Cypress.Commands.add('api_createUser', user => {
  setAccessTokenIfNotYetSet()

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
  setAccessTokenIfNotYetSet()
  cy.request({
    method: 'GET',
    url: `/api/v4/users/?private_token=${accessToken}`
  })
})

Cypress.Commands.add('api_deleteUser', userId => {
  setAccessTokenIfNotYetSet()
  cy.request({
    method: 'DELETE',
    url: `/api/v4/users/${userId}?private_token=${accessToken}`
  })
})

Cypress.Commands.add('deleteAllUsersButRoot', () => {
  setAccessTokenIfNotYetSet()
  cy.api_getAllUsers()
    .its('body')
    .each(({ username, id }) => {
      if (username !== 'root') cy.api_deleteUser(id)
    })
})

Cypress.Commands.add('api_updateUserWebsite', (userId, website) => {
  setAccessTokenIfNotYetSet()
  cy.request({
    method: 'PUT',
    url: `/api/v4/users/${userId}?private_token=${accessToken}`,
    body: { website_url: website }
  })
})

Cypress.Commands.add('api_getAllBroadcastMessages', () => {
  setAccessTokenIfNotYetSet()
  cy.request({
    method: 'GET',
    url: `/api/v4/broadcast_messages/?private_token=${accessToken}`
  })
})

Cypress.Commands.add('api_deleteBroadcastMessages', () => {
  setAccessTokenIfNotYetSet()
  cy.api_getAllBroadcastMessages()
    .its('body')
    .each(({ id }) => {
      cy.request({
        method: 'DELETE',
        url: `/api/v4/broadcast_messages/${id}?private_token=${accessToken}`
      })
    })
})
