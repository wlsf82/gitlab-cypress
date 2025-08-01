import { faker } from '@faker-js/faker/locale/en'

let accessToken

/**
 * Ideally, the `setAccessTokenIfNotYetSet` function should be called just once,
 * right before the definition of all custom commands.
 * However, `cy.task` can only be called from within a test, which means that
 * calling it from outside of a test would result in a
 * `Cannot call cy.task() outside a running test.` error.
 *
 * This is why `setAccessTokenIfNotYetSet` is defined here as a function
 * that can be called by custom commands (or tests.)
 *
 * Since custom commands are called by test, calling the
 * `setAccessTokenIfNotYetSet` function inside them is like calling it
 * from inside the test that uses the command, making it a valid call.
 *
 * This is why every `api_*` command needs to call `setAccessTokenIfNotYetSet`
 * at the begining of their body.
 */
const setAccessTokenIfNotYetSet = () => {
  if (!accessToken) {
    cy.task('getToken')
      .then(token => {
        accessToken = token
      })
  }
}

Cypress.Commands.add('api_createGroup', ({ name, path }) => {
  setAccessTokenIfNotYetSet()
  cy.request({
    method: 'POST',
    url: '/api/v4/groups',
    headers: { 'Private-Token': accessToken },
    body: { name, path }
  })
})

Cypress.Commands.add('api_getAllGroups', () => {
  setAccessTokenIfNotYetSet()
  cy.request({
    method: 'GET',
    url: '/api/v4/groups',
    headers: { 'Private-Token': accessToken }
  })
})

Cypress.Commands.add('api_deleteGroups', () => {
  setAccessTokenIfNotYetSet()
  cy.api_getAllGroups()
    .its('body')
    .each(({ id }) => {
      cy.request({
        method: 'DELETE',
        url: `/api/v4/groups/${id}`,
        headers: { 'Private-Token': accessToken }
      })
    })
})

Cypress.Commands.add('api_createProject', ({ name }) => {
  setAccessTokenIfNotYetSet()
  cy.request({
    method: 'POST',
    url: '/api/v4/projects',
    headers: { 'Private-Token': accessToken },
    body: { name }
  })
})

Cypress.Commands.add('api_getAllProjects', () => {
  setAccessTokenIfNotYetSet()
  cy.request({
    method: 'GET',
    url: '/api/v4/projects',
    headers: { 'Private-Token': accessToken }
  })
})

Cypress.Commands.add('api_deleteProjects', () => {
  setAccessTokenIfNotYetSet()
  cy.api_getAllProjects()
    .its('body')
    .each(({ id }) => {
      cy.request({
        method: 'DELETE',
        url: `/api/v4/projects/${id}`,
        headers: { 'Private-Token': accessToken }
      })
    })
})

Cypress.Commands.add('api_createIssue', () => {
  setAccessTokenIfNotYetSet()
  cy.api_createProject({ name: `project-${faker.string.uuid()}` })
    .then(({ body }) => {
      cy.request({
        method: 'POST',
        url: `/api/v4/projects/${body.id}/issues`,
        headers: { 'Private-Token': accessToken },
        body: { title: `issue-${faker.string.uuid()}` }
      })
    })
})

Cypress.Commands.add('api_createProjectLabel', (projectId, label) => {
  setAccessTokenIfNotYetSet()
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/${projectId}/labels`,
    headers: { 'Private-Token': accessToken },
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
    url: `/api/v4/projects/${projectId}/milestones`,
    headers: { 'Private-Token': accessToken },
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
    url: '/api/v4/users',
    headers: { 'Private-Token': accessToken },
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
    url: '/api/v4/users',
    headers: { 'Private-Token': accessToken }
  })
})

Cypress.Commands.add('api_deleteUser', userId => {
  setAccessTokenIfNotYetSet()
  cy.request({
    method: 'DELETE',
    url: `/api/v4/users/${userId}`,
    headers: { 'Private-Token': accessToken }
  })
})

Cypress.Commands.add('deleteAllUsersButRoot', () => {
  setAccessTokenIfNotYetSet()
  cy.api_getAllUsers()
    .its('body')
    .each(({ username, id }) => {
      if (username !== 'root') {
        cy.api_deleteUser(id)
          .its('status')
          .should('equal', 204)
      }
    })
})

Cypress.Commands.add('api_updateUserWebsite', (userId, website) => {
  setAccessTokenIfNotYetSet()
  cy.request({
    method: 'PUT',
    url: `/api/v4/users/${userId}`,
    headers: { 'Private-Token': accessToken },
    body: { website_url: website }
  })
})

Cypress.Commands.add('api_getAllBroadcastMessages', () => {
  setAccessTokenIfNotYetSet()
  cy.request({
    method: 'GET',
    url: '/api/v4/broadcast_messages',
    headers: { 'Private-Token': accessToken }
  })
})

Cypress.Commands.add('api_deleteBroadcastMessages', () => {
  setAccessTokenIfNotYetSet()
  cy.api_getAllBroadcastMessages()
    .its('body')
    .each(({ id }) => {
      cy.request({
        method: 'DELETE',
        url: `/api/v4/broadcast_messages/${id}`,
        headers: { 'Private-Token': accessToken }
      })
    })
})

Cypress.Commands.add('api_getAllSnippets', () => {
  setAccessTokenIfNotYetSet()
  cy.request({
    method: 'GET',
    url: '/api/v4/snippets',
    headers: { 'Private-Token': accessToken }
  })
})

Cypress.Commands.add('api_deleteSnippets', () => {
  setAccessTokenIfNotYetSet()
  cy.api_getAllSnippets()
    .its('body')
    .each(({ id }) => {
      cy.request({
        method: 'DELETE',
        url: `/api/v4/snippets/${id}`,
        headers: { 'Private-Token': accessToken }
      })
    })
})

Cypress.Commands.add('api_getAllSystemHooks', () => {
  setAccessTokenIfNotYetSet()
  cy.request({
    method: 'GET',
    url: '/api/v4/hooks',
    headers: { 'Private-Token': accessToken }
  })
})

Cypress.Commands.add('api_deleteSystemHooks', () => {
  setAccessTokenIfNotYetSet()
  cy.api_getAllSystemHooks()
    .its('body')
    .each(({ id }) => {
      cy.request({
        method: 'DELETE',
        url: `/api/v4/hooks/${id}`,
        headers: { 'Private-Token': accessToken }
      })
    })
})
