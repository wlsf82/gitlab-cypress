import { faker } from '@faker-js/faker/locale/en'

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

Cypress.Commands.add('gui_login_or_signup_and_login', (
  username = Cypress.env('user_name'),
  password = Cypress.env('user_password')
) => {
  cy.visit('')

  cy.url().then(url => {
    if (url.includes('/users/password/edit?reset_password_token=')) {
      cy.signup(password)
    }
  })

  cy.gui_login(username, password)
})

Cypress.Commands.add('signup', (password = Cypress.env('user_password')) => {
  cy.get('[data-qa-selector="password_field"]').type(password, { log: false })
  cy.get('[data-qa-selector="password_confirmation_field"]').type(password, { log: false })
  cy.get('[data-qa-selector="change_password_button"]').click()
})

Cypress.Commands.add('gui_createAccessToken', (name = faker.datatype.uuid()) => {
  cy.visit('profile/personal_access_tokens')

  cy.get('.qa-personal-access-token-name-field').type(name)
  cy.get('.qa-api-radio').check()
  cy.get('.qa-create-token-button').click()

  cy.contains('Your new personal access token has been created.')
    .should('be.visible')
  cy.get('.qa-created-personal-access-token')
    .should('be.visible')
    .then(($field) => {
      const token = $field[0].value
      cy.task('saveToken', token)
    })
})

Cypress.Commands.add('gui_deleteAccessTokens', () => {
  cy.visit('profile/personal_access_tokens')

  cy.get('body').then($body => {
    if ($body.find('.settings-message:contains(This user has no active Personal Access Tokens.)').length) {
      cy.log('no active tokens were found.')
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

Cypress.Commands.add('gui_removeGroup', ({ path }, done) => {
  cy.on('uncaught:exception', () => {
    done()

    // return false to prevent the error from failing this test
    return false
  })

  cy.visit(`groups/${path}/-/edit`)

  cy.contains('h4', 'Path, transfer, remove')
    .next()
    .click()
  cy.get('input[value="Remove group"]')
    .should('be.visible')
    .click()
  cy.get('.qa-confirm-input')
    .type(path)
  cy.get('.qa-confirm-button').click()
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

Cypress.Commands.add('gui_addUserToProject', (user, project) => {
  const { username } = user

  cy.intercept('GET', `autocomplete/users.json?search=@${user}&active=true`)
    .as('getUser')

  cy.visit(`${Cypress.env('user_name')}/${project}/-/project_members`)
  cy.contains('label', 'GitLab member or Email address')
    .next()
    .type(`@${username}`)
  cy.wait('@getUser')
    .its('response.statusCode')
    .should('be.oneOf', [200, 304])
  cy.contains('li', `@${username}`)
    .as('userListItem')
    .should('be.visible')
  cy.get('@userListItem')
    .click()
  cy.get('.qa-add-member-button').click()
  cy.contains('.flash-notice', 'Users were successfully added.')
    .should('be.visible')
  cy.contains('.qa-members-list', `@${username}`)
    .should('be.visible')
})

Cypress.Commands.add('gui_createSnippet', snippetObj => {
  const { title, description, visibility, snippet } = snippetObj

  cy.get('.qa-snippet-title').type(title)
  cy.get('.qa-issuable-form-description').type(description)
  cy.get(`[data-qa-selector="${visibility}_radio"]`).check()
  cy.get('#editor .ace_content').type(snippet)
  cy.get('.qa-create-snippet-button').click()
})

Cypress.Commands.add('gui_setStatus', (emojiCode, statusText) => {
  cy.openStatusModal()
    .as('statusModal')
    .selectEmojiAndStatusText(emojiCode, statusText)
  cy.get('@statusModal')
    .find('button:contains(Set status)')
    .click()
  cy.assertStatus(statusText)
})

Cypress.Commands.add('gui_ediStatus', (emojiCode, statusText) => {
  cy.gui_setStatus(emojiCode, statusText)
})

Cypress.Commands.add('gui_clearStatus', () => {
  cy.openStatusModal()
    .find('button:contains(Remove status)')
    .click()
  cy.get('.qa-user-avatar')
    .should('be.visible')
    .click()
  cy.get('.dropdown-menu.show').should('be.visible')
  cy.get('.dropdown-menu .user-status')
    .should('not.exist')
  cy.get('.qa-user-avatar').click()
})

/**
 * Custom commands defined here without the `gui_` prefix are only
 * used by other custom commands, not directly by tests.
 *
 * This is a project's convention.
 */

Cypress.Commands.add('selectEmojiAndStatusText', { prevSubject: true }, (
  subject,
  emojiCode,
  statusText
) => {
  subject.find('[aria-label="Add status emoji"]')
    .click()
  cy.get('[name="emoji-menu-search"]')
    .should('be.visible')
    .type(` ${emojiCode}`)
  cy.contains('.emoji-search-title', 'Search results')
    .next()
    .find('li')
    .first()
    .click()
  cy.get('input[placeholder="What\'s your status?"]')
    .clear()
    .type(statusText)
})

Cypress.Commands.add('openStatusModal', () => {
  cy.get('.qa-user-avatar')
    .click()
  cy.contains('button', ' status').click()
  cy.get('#set-user-status-modal___BV_modal_content_')
    .should('be.visible')
})

Cypress.Commands.add('assertStatus', statusText => {
  cy.get('.qa-user-avatar')
    .as('avatar')
    .click()
  cy.get('.dropdown-menu .user-status')
    .should('contain', statusText)
  cy.get('.qa-user-avatar').click()
})
