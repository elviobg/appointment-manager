export const TOKEN_KEY = '@api-Token'
export const USER_NAME_KEY = '@user-Fullname'
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const getUserFullName = () => localStorage.getItem(USER_NAME_KEY)
export const login = (token, userFullName) => {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_NAME_KEY, userFullName)
}
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_NAME_KEY)
}
