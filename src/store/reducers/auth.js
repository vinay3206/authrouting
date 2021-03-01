import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  data: null,
  token: null,
  refreshToken: null,
  userId: null,
  error: null,
  loading: false,
  name: null,
  isLoggedIn: false
}

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true })
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    data: action.tokenData,
    token: action.tokenData.access_token,
    refreshToken: action.tokenData.refresh_token,
    userId: action.tokenData.id,
    name: action.tokenData.name,
    isLoggedIn: true,
    error: null,
    loading: false,
  })
}

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    isLoggedIn: false
  })
}

const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null, data: null, isLoggedIn: false })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action)
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
    case actionTypes.AUTH_FAIL: return authFail(state, action)
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
    default:
      return state
  }
}

export default reducer
