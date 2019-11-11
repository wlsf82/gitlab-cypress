Cypress.Commands.add('createGroupViaApi', (accessToken, name, path) => {
  cy.request(
    'POST', `/api/v4/groups/?private_token=${accessToken}`, { name, path }
  ).then(response => response.body.id)
})

Cypress.Commands.add('createProjectViaApi', (accessToken, name) => {
  cy.request(
    'POST', `/api/v4/projects/?private_token=${accessToken}`, { name }
  ).then(response => response.body.id)
})

Cypress.Commands.add('createIssueViaApi', (accessToken, projectId, title) => {
  cy.request(
    'POST', `/api/v4/projects/${projectId}/issues?private_token=${accessToken}`, { title }
  ).then(response => response.body.iid)
})

Cypress.Commands.add('createProjectLabelViaApi', (accessToken, projectId, label) => {
  cy.request(
    'POST',
    `/api/v4/projects/${projectId}/labels?private_token=${accessToken}`,
    {
      name: label.name,
      color: label.color
    }
  )
})

Cypress.Commands.add('createProjectMilestoneViaApi', (accessToken, projectId, milestone) => {
  cy.request(
    'POST',
    `/api/v4/projects/${projectId}/milestones?private_token=${accessToken}`,
    { title: milestone.title }
  )
})
