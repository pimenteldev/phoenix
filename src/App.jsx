import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Layout from './components/Layout/Layout'
import './styles/app.css'

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  )
}

export default App
