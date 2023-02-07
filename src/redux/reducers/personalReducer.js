import * as actionTypes from '../actions/actionTypes'

export const PersonalReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SET_DATA_PERSONAL: {
      return {
        ...state,
        personal: action.personal,
        role: action.role,
      }
    }
    default:
      return state
  }
}
