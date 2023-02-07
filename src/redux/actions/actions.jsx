import * as actionTypes from './actionTypes'

export const login = (data) => {
  return {
    type: actionTypes.LOGIN,
    user: data.user,
    token: data.token,
  }
}

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  }
}

export const setDataMenu = (data) => {
  return {
    type: actionTypes.SET_DATA_MENU,
    products: data.products,
    categories: data.categories,
  }
}

export const setDataMesas = (data) => {
  return {
    type: actionTypes.SET_DATA_MESAS,
    payload: data,
  }
}

export const setDataPersonal = (data) => {
  return {
    type: actionTypes.SET_DATA_PERSONAL,
    personal: data.personal,
    role: data.role,
  }
}

export const setDataInventary = (data) => {
  return {
    type: actionTypes.SET_DATA_INVENTARY,
    items: data.items,
    categories: data.categories,
    units: data.units,
    list: data.list,
  }
}

export const setDataOrders = (data) => {
  return {
    type: actionTypes.SET_DATA_ORDERS,
    orders: data.orders,
  }
}

export const setDataSettings = (data) => {
  return {
    type: actionTypes.SET_DATA_SETTINGS,
    settings: data.settings,
  }
}

export const setDataEmpty = () => {
  return {
    type: actionTypes.SET_DATA_EMPTY,
  }
}
