const accessToken = Cypress.env('GITLAB_ACCESS_TOKEN')

Cypress.Commands.add('api_createGroup', (name, path) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/groups/?private_token=${accessToken}`,
    body: { name, path }
  })
})

Cypress.Commands.add('api_createProject', name => {
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

Cypress.Commands.add('api_deleteProject', projectId => {
  cy.request({
    method: 'DELETE',
    url: `/api/v4/projects/${projectId}?private_token=${accessToken}`
  })
})

Cypress.Commands.add('api_createIssue', (projectId, title) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/${projectId}/issues?private_token=${accessToken}`,
    body: { title }
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
