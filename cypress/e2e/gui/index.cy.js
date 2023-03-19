// Setup - Sign in (or Sign up) and create an access token
import '../gui/profile/createAccessToken.cy'

// GUI tests
// import './admin/broadcastMessage.cy'
// The below test destroys the user session. The next one recreates it.
// import './admin/impersonateUser.cy.js'
// import './group/createGroup.cy'
// import './group/createGroupLabel.cy'
import './group/removeGroup.cy.js'
// import './group/subGroup.cy'
// import './profile/setStatus.cy.js'
// import './project/assignIssue.cy'
// import './project/closeIssue.cy'
// import './project/closeIssueQuickAction.cy'
// import './project/commentOnIssue.cy'
// import './project/createIssue.cy'
// import './project/createNewFile.cy'
// import './project/createProject.cy'
// import './project/createProjectMilestone.cy'
// import './project/createWiki.cy'
// import './project/issueBoard.cy'
// import './project/issueMilestone.cy'
// import './project/labelAnIssue.cy'
// import './project/reopenClosedIssue.cy'
// import './project/multipleUsersInAnProject.cy.js'
// import './snippets/createSnippet.cy.js'
// import './authentication/loginAsNonDefaultUser.cy'

// Teardown - Delete access token(s)
import './profile/deleteAccessTokens.cy'
// Leave the logout test to the end since it destroys the user session
// import './authentication/logout.cy'
