import {createContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'

const ThemeContext = createContext()

const ThemeProvider = ({children}) => {
  const [themeName, setThemeName] = useState('light')
  document.body.classList.add(themeName)

  useEffect(() => {
    const darkMediaQuery = window.matchMedia('(prefers-color-scheme: light)')
    setThemeName(darkMediaQuery.matches ? 'dark' : 'light')
    darkMediaQuery.addEventListener('change', (e) => {
      setThemeName(e.matches ? 'dark' : 'light')
    })
  }, [])

  const toggleTheme = () => {
    const name = themeName === 'dark' ? 'light' : 'dark'
    localStorage.setItem('themeName', name)
    setThemeName(name)

    document.body.classList.toggle(themeName)
  }

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <ThemeContext.Provider value={[{themeName, toggleTheme}]}>{children}</ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export {ThemeProvider, ThemeContext}
