const stateLocal = JSON.parse(localStorage.getItem('state'))

export const initialState = stateLocal || {
  isAuth: false,
  user: [],
  token: '',
}
