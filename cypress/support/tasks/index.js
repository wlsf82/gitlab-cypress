let accessToken

module.exports = function tasks (on) {
  on('task', {
    saveToken (token) {
      accessToken = token
      return accessToken
    },
    getToken () {
      if (accessToken) {
        return accessToken
      }
      return null
    }
  })
}
