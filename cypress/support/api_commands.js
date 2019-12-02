Cypress.Commands.add('api_createGroup', (accessToken, name, path) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/groups/?private_token=${accessToken}`,
    body: { name, path }
  })
})

Cypress.Commands.add('api_createProject', (accessToken, name) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/?private_token=${accessToken}`,
    body: { name }
  })
})

Cypress.Commands.add('api_createIssue', (accessToken, projectId, title) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/${projectId}/issues?private_token=${accessToken}`,
    body: { title }
  })
})

Cypress.Commands.add('api_createProjectLabel', (accessToken, projectId, label) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/${projectId}/labels?private_token=${accessToken}`,
    body: {
      name: label.name,
      color: label.color
    }
  })
})

Cypress.Commands.add('api_createProjectMilestone', (accessToken, projectId, milestone) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/${projectId}/milestones?private_token=${accessToken}`,
    body: { title: milestone.title }
  })
})
