import React from 'react'
import './index.css'
import {Link, Outlet} from 'react-router-dom'

function index() {
  return (
    <>
      <div className="error_page_content">
        <div className="error_page">
          {'Error 404 => Url no Existe'}
          <div>
            <br />
            <Link
              to="/"
              className="navbar-item-nopage"
            >
              Ir Al Inicio
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default index
