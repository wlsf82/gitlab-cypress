// Setup - Sign in (or Sign up) and create an access token
import '../gui/profile/createAccessToken.cy'

// GUI tests (all but project)
import './admin/broadcastMessage.cy'
// The below test destroys the user session. The next one recreates it.
import './admin/impersonateUser.cy.js'
import './profile/deploykeyCreation.cy'
import './group/createGroup.cy'
import './group/createGroupLabel.cy'
import './group/removeGroup.cy.js'
import './group/subGroup.cy'
import './profile/setStatus.cy.js'
import './snippets/createSnippet.cy.js'
import './authentication/loginAsNonDefaultUser.cy'


// Teardown - Delete access token(s)
import './profile/deleteAccessTokens.cy'
// Leave the logout test to the end since it destroys the user session
import './authentication/logout.cy'

