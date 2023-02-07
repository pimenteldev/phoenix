import * as actionTypes from '../actions/actionTypes'
import {initialState} from './initialState'

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN: {
      localStorage.setItem(
        'state',
        JSON.stringify({
          ...state,
          isAuth: true,
          user: action.user,
          token: action.token,
        })
      )

      return {
        ...state,
        isAuth: true,
        user: action.user,
        token: action.token,
      }
    }

    case actionTypes.LOGOUT:
      return {
        ...state,
        isAuth: false,
        user: [],
        token: '',
      }
    default:
      return state
  }
}
