// Setup - Create access token
import './profile/createAccessToken.cy'

// GUI tests
import './admin/broadcastMessage.cy'
import './authentication/login.cy'
import './authentication/loginAsNonDefaultUser.cy'
import './authentication/logout.cy'
import './group/createGroup.cy'
import './group/createGroupLabel.cy'
import './group/subGroup.cy'
import './project/assignIssue.cy'
import './project/closeIssue.cy'
import './project/closeIssueQuickAction.cy'
import './project/commentOnIssue.cy'
import './project/createIssue.cy'
import './project/createNewFile.cy'
import './project/createProject.cy'
import './project/createProjectMilestone.cy'
import './project/createWiki.cy'
import './project/issueBoard.cy'
import './project/issueMilestone.cy'
import './project/labelAnIssue.cy'
import './project/reopenClosedIssue.cy'

// Tear down - delete access token(s)
import './profile/deleteAccessTokens.cy'
