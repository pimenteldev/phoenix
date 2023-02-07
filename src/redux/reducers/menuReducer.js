import * as actionTypes from '../actions/actionTypes'

export const MenuReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SET_DATA_MENU: {
      return {
        ...state,
        products: action.products,
        categories: action.categories,
      }
    }
    case actionTypes.GET_DATA_AFTER_MODIFY: {
      return {
        ...state,
      }
    }
    default:
      return state
  }
}
