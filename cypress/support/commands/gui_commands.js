Cypress.Commands.add('gui_login', (
  username = Cypress.env('user_name'),
  password = Cypress.env('user_password')
) => {
  cy.visit('users/sign_in')

  cy.get('[data-qa-selector="login_field"]').type(username)
  cy.get('[data-qa-selector="password_field"]').type(password, { log: false })
  cy.get('[data-qa-selector="sign_in_button"]').click()

  cy.get('.qa-user-avatar').should('exist')
})

Cypress.Commands.add('gui_signup', (password = Cypress.env('user_password')) => {
  cy.get('[data-qa-selector="password_field"]').type(password, { log: false })
  cy.get('[data-qa-selector="password_confirmation_field"]').type(password, { log: false })
  cy.get('[data-qa-selector="change_password_button"]').click()
})

Cypress.Commands.add('gui_login_or_signup', (
  username = Cypress.env('user_name'),
  password = Cypress.env('user_password')
) => {
  cy.visit('')

  cy.url().then(url => {
    if (url.includes('/users/sign_in')) {
      cy.gui_login(username, password)
      return
    }
    if (url.includes('/users/password/edit?reset_password_token=')) {
      cy.gui_signup(password)
      cy.gui_login(username, password)
    }
  })
})

Cypress.Commands.add('gui_createAccessToken', name => {
  cy.visit('profile/personal_access_tokens')

  cy.get('.qa-personal-access-token-name-field').type(name)
  cy.get('.qa-api-radio').check()
  cy.get('.qa-create-token-button').click()
})

Cypress.Commands.add('gui_deleteAccessTokens', () => {
  cy.visit('profile/personal_access_tokens')

  cy.get('body').then($body => {
    if ($body.find('.settings-message:contains(This user has no active Personal Access Tokens.)').length) {
      cy.log('no active tokens found.')
      return
    }
    cy.get('.active-tokens tbody tr')
      .its('length')
      .then(numberOfActiveTokens => {
        Cypress._.times(numberOfActiveTokens, () => {
          cy.get('.qa-revoke-button')
            .eq(0)
            .click()
        })
      })
  })
})

Cypress.Commands.add('gui_createProject', project => {
  cy.visit('projects/new')

  cy.get('#project_name').type(project.name)
  cy.get('#project_description').type(project.description)
  cy.get('.qa-initialize-with-readme-checkbox').check()
  cy.contains('Create project').click()
})

Cypress.Commands.add('gui_createIssue', (project, issue) => {
  cy.visit(`${Cypress.env('user_name')}/${project.name}/issues/new`)

  cy.get('.qa-issuable-form-title').type(issue.title)
  cy.get('.qa-issuable-form-description').type(issue.description)
  cy.contains('Submit issue').click()
})

Cypress.Commands.add('gui_createPublicGroup', group => {
  cy.visit('groups/new')

  cy.get('#group_name').type(group.name)
  cy.get('#group_description').type(group.description)
  cy.get('#group_visibility_level_20').check()
  cy.contains('Create group').click()
})

Cypress.Commands.add('gui_createSubgroup', (groupId, subgroup) => {
  cy.visit(`groups/new?parent_id=${groupId}`)

  cy.get('#group_name').type(subgroup.name)
  cy.contains('Create group').click()
})

Cypress.Commands.add('gui_createGroupLabel', (group, label) => {
  cy.visit(`groups/${group.path}/-/labels/new`)

  cy.get('.qa-label-title').type(label.title)
  cy.contains('Create label').click()
})

Cypress.Commands.add('gui_createProjectMilestone', (project, milestone) => {
  cy.visit(`${Cypress.env('user_name')}/${project.name}/-/milestones/new`)

  cy.get('.qa-milestone-title').type(milestone.title)
  cy.get('.qa-milestone-create-button').click()
})

Cypress.Commands.add('gui_labelIssueWith', label => {
  cy.get('.qa-edit-link-labels').click()
  cy.contains(label.name).click()
  cy.get('body').click()
})

Cypress.Commands.add('gui_commentOnIssue', comment => {
  cy.get('.qa-comment-input').type(comment)
  cy.get('.qa-comment-button').click()
})

Cypress.Commands.add('gui_logout', () => {
  cy.get('.qa-user-avatar').click()
  cy.contains('Sign out').click()
})

Cypress.Commands.add('gui_addMilestoneOnIssue', milestone => {
  cy.get('.block.milestone .edit-link').click()
  cy.contains(milestone.title).click()
})

Cypress.Commands.add('gui_createFile', file => {
  cy.get('#file_name').type(file.name)
  cy.get('#editor').type(file.content)
  cy.get('.qa-commit-button').click()
})
