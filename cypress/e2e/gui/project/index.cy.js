// Setup - Sign in (or Sign up) and create an access token
import '../profile/createAccessToken.cy'

// GUI tests (project)
import './assignIssue.cy'
import './closeIssue.cy'
import './closeIssueQuickAction.cy'
import './commentOnIssue.cy'
import './createIssue.cy'
import './createNewFile.cy'
import './createProject.cy'
import './createProjectMilestone.cy'
import './createWiki.cy'
import './issueBoard.cy'
import './issueMilestone.cy'
import './labelAnIssue.cy'
import './reopenClosedIssue.cy'
import './multipleUsersInAnProject.cy.js'

// Teardown - Delete access token(s)
import '../profile/deleteAccessTokens.cy'
