const accessToken = Cypress.env('gitlab_access_token')

Cypress.Commands.add('api_createGroup', (name, path) => {
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

Cypress.Commands.add('api_createUser', user => {
  cy.request({
    method: 'POST',
    url: `/api/v4/users/?private_token=${accessToken}`,
    body: {
      email: user.email,
      name: user.name,
      username: user.username,
      password: user.password
    }
  })
})

Cypress.Commands.add('api_getAllUsers', () => {
  cy.request({
    method: 'GET',
    url: `/api/v4/users/?private_token=${accessToken}`
  }).then(response => console.log(response))
})

Cypress.Commands.add('api_deleteUser', userId => {
  cy.request({
    method: 'DELETE',
    url: `/api/v4/users/${userId}?private_token=${accessToken}`
  }).then(response => expect(response.status).to.equal(204))
})