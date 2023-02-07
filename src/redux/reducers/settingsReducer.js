import * as actionTypes from '../actions/actionTypes'

export const SettingsReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SET_DATA_SETTINGS: {
      return {
        ...state,
        settings: action.settings || [],
      }
    }
    default:
      return state
  }
}
