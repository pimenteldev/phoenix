import * as actionTypes from '../actions/actionTypes'

export const MesasReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SET_DATA_MESAS: {
      return {
        ...state,
        mesas: action.payload,
      }
    }
    default:
      return state
  }
}
