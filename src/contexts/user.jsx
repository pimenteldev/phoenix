import * as ACTIONS from '@/redux/actions/actions'
import * as AuthReducer from '@/redux/reducers/authReducer'
import {initialState} from '@/redux/reducers/initialState'
import PropTypes from 'prop-types'
import React, {useReducer} from 'react'
import Context from './context'

const UserProvider = ({children}) => {
  const [stateAuthReducer, dispatchAuthReducer] = useReducer(AuthReducer.AuthReducer, initialState)
  const handleLogin = (data) => {
    dispatchAuthReducer(ACTIONS.login(data))
  }
  const handleLogout = () => {
    dispatchAuthReducer(ACTIONS.logout())
  }

  return (
    <Context.Provider
      value={{
        authState: stateAuthReducer.isAuth,
        userState: stateAuthReducer.user,
        tokenState: stateAuthReducer.token,
        handleUserLogin: (user) => handleLogin(user),
        handleUserLogout: () => handleLogout(),
      }}
    >
      {children}
    </Context.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export {UserProvider}
