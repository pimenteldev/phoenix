import React, {useEffect, Suspense, lazy} from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'
import {useContext} from 'react'
import {ThemeContext} from '@/contexts/theme'
import Navbar from '@/components/Navbar'
import Loader from '@/components/Loader'
import PageNotFound from '@/pages/PageNotFound'
import Sidebar from '@/components/Sidebar'
import TopButton from '@/components/TopButton'
import {Toaster} from 'react-hot-toast'
import Context from '@/contexts/context'
import MainContainer from './MainContainer'
import Spinner from '../Spinner/Spinner'

export default function Layout() {
  const [{themeName, toggleTheme}] = useContext(ThemeContext)
  const context = useContext(Context)
  const {authState, tokenState, userState} = context
  const navigate = useNavigate()

  useEffect(() => {
    if (!authState || tokenState === '' || userState.length === 0) {
      localStorage.setItem(
        'state',
        JSON.stringify({
          isAuth: false,
          user: [],
          token: '',
        })
      )
      navigate('/')
    }
  }, [context])

  const Login = lazy(() => import('@/pages/Login/Login'))

  const Inicio = lazy(() => import('@/pages/Inicio/Inicio'))
  const Menu = lazy(() => import('@/pages/Menu/Menu'))
  const Mesas = lazy(() => import('@/pages/Mesas'))
  const Pedidos = lazy(() => import('@/pages/Pedidos/Pedidos'))
  const Reportes = lazy(() => import('@/pages/Reportes'))
  const Inventario = lazy(() => import('@/pages/Inventario'))
  const Empresa = lazy(() => import('@/pages/Empresa'))
  const Personal = lazy(() => import('@/pages/Personal'))
  const Proveedores = lazy(() => import('@/pages/Proveedores'))

  return (
    <>
      <Navbar
        toggleTheme={toggleTheme}
        themeName={themeName}
        context={context}
      />
      <Sidebar
        toggleTheme={toggleTheme}
        themeName={themeName}
        context={context}
      />
      <MainContainer>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route
              path="/"
              element={<Login />}
            />
            <Route
              path="/inicio"
              element={!authState || tokenState === '' || userState.length === 0 ? <Login /> : <Inicio />}
            />
            <Route
              path="/menu"
              element={!authState || tokenState === '' || userState.length === 0 ? <Login /> : <Menu />}
            />
            <Route
              path="/mesas"
              element={!authState || tokenState === '' || userState.length === 0 ? <Login /> : <Mesas />}
            />
            <Route
              path="/pedidos"
              element={!authState || tokenState === '' || userState.length === 0 ? <Login /> : <Pedidos />}
            />
            <Route
              path="/reportes"
              element={!authState || tokenState === '' || userState.length === 0 ? <Login /> : <Reportes />}
            />
            <Route
              path="/inventario"
              element={!authState || tokenState === '' || userState.length === 0 ? <Login /> : <Inventario />}
            />
            <Route
              path="/empresa"
              element={!authState || tokenState === '' || userState.length === 0 ? <Login /> : <Empresa />}
            />
            <Route
              path="/personal"
              element={!authState || tokenState === '' || userState.length === 0 ? <Login /> : <Personal />}
            />
            <Route
              path="/proveedores"
              element={!authState || tokenState === '' || userState.length === 0 ? <Login /> : <Proveedores />}
            />
            <Route
              path="*"
              element={<PageNotFound />}
            />
          </Routes>
        </Suspense>
      </MainContainer>

      <TopButton theme={themeName} />
      <Toaster
        position="center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: 'toast',
          duration: 3000,
          style: {
            background: 'white',
            fontSize: '16px',
            whiteSpace: 'nowrap',
            color: 'dark',
            height: '50px',
          },
        }}
      />
    </>
  )
}
