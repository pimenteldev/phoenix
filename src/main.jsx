import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import App from './App'
import {ThemeProvider} from './contexts/theme'
import {UserProvider} from './contexts/user'
import store from './redux/store'

import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <UserProvider>
          <App />
        </UserProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
)
