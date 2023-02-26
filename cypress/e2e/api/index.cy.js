// Setup - Sign in (or Sign up) and create an access token
import '../gui/profile/createAccessToken.cy'

// API tests
import './group/createGroup.cy'
import './project/createProject.cy'
import './user/createUser.cy'
import './user/updateUser.cy'

// Teardown - Delete access token(s)
import '../gui/profile/deleteAccessTokens.cy'
