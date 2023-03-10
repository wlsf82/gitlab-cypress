const newUser = require('../../../fixtures/sampleUser')
const { username: newUserName, password: newUserPassword } = newUser
const defaultUser = Cypress.env('user_name')

describe('Project with multiple users', () => {
  beforeEach(() => {
    cy.log('--- Pre-conditions ---')
    cy.log('1. Delete all users and projects to start in a clean state')
    cy.deleteAllUsersButRoot()
    cy.api_deleteProjects()

    cy.log('2. Create a brand new user')
    cy.api_createUser(newUser)

    cy.log(`3. Create a new issue (and by consequence a new project) for the ${defaultUser} user`)
    cy.api_createIssue()
      .its('body.iid')
      .as('issueIid')

    cy.log(`4. Sign in as ${defaultUser}`)
    cy.signInAsDefaultUser()

    cy.log(`5. Add the new user to the ${defaultUser} user's project`)
    cy.api_getAllProjects().as('projects')
    cy.get('@projects')
      .its('body[0].name')
      .as('projectName')
      .then(projectName => cy.gui_addUserToProject(newUser, projectName))
    cy.log('--- End of pre-conditions ---')
  })

  it('users reply to each other in an issue', () => {
    cy.log(`1. Visit the issue as ${defaultUser} and comment on it`)
    cy.visitIssue()
    cy.gui_commentOnIssue(`Hi @${newUserName}, what do you think?`)

    cy.log(`2. Sign in as ${newUserName}, visit the issue, and reply to the comment`)
    cy.signInAsNewUser()
    cy.visitIssue()
    cy.assertCommentIsVisible('what do you think?')
    cy.gui_commentOnIssue(`Hey, @${defaultUser}, it looks good to me.`)

    cy.log(`3. Sign in as ${defaultUser}, visit the issue, and reply to the new comment`)
    cy.signInAsDefaultUser()
    cy.visitIssue()
    cy.assertCommentIsVisible('looks good to me.')
    cy.gui_commentOnIssue('Great, thanks!')

    cy.log(`4. Sign in as ${newUserName}, visit the issue, and reply to the newest comment`)
    cy.signInAsNewUser()
    cy.visitIssue()
    cy.assertCommentIsVisible('Great, thanks!')
    cy.gui_commentOnIssue('You are welcome!')

    cy.log(`5. Sign in as ${defaultUser}, visit the issue, and see the last comment`)
    cy.signInAsDefaultUser()
    cy.visitIssue()
    cy.assertCommentIsVisible('You are welcome!')
  })
})

Cypress.Commands.add('visitIssue', function () {
  const { projectName, issueIid } = this
  cy.visit(`${defaultUser}/${projectName}/issues/${issueIid}`)
})

Cypress.Commands.add('signInAsDefaultUser', () => {
  cy.sessionLogin()
})

Cypress.Commands.add('signInAsNewUser', () => {
  cy.sessionLogin(newUserName, newUserPassword)
})

Cypress.Commands.add('assertCommentIsVisible', comment => {
  cy.contains('.timeline-content', comment).should('be.visible')
})
