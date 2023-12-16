// Setup - Sign in (or Sign up) and create an access token
import '../profile/createAccessToken.cy.js'

// GUI tests (project|issue)
import './assignIssue.cy.js'
import './closeIssue.cy.js'
import './closeIssueQuickAction.cy.js'
import './commentOnIssue.cy.js'
import './createIssue.cy.js'
import './issueBoard.cy.js'
import './issueMilestone.cy.js'
import './labelAnIssue.cy.js'
import './reopenClosedIssue.cy.js'
import './multipleUsersInAnProject.cy.js'

// Teardown - Delete access token(s)
import '../profile/deleteAccessTokens.cy.js'
