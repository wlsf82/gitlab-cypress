// Setup - Sign in (or Sign up) and create an access token
import '../profile/createAccessToken.cy.js'

// GUI tests (project, but issue)
import './createNewFile.cy.js'
import './createProject.cy.js'
import './createProjectMilestone.cy.js'
import './createWiki.cy.js'
import './starProject.cy.js'

// Teardown - Delete access token(s)
import '../profile/deleteAccessTokens.cy.js'
