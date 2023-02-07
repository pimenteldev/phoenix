import React, {useState} from 'react'
import style from './index.module.css'
import menuImg from '@/assets/bars.svg'
import logoImg from '@/assets/icon.png'
import {Link, Outlet} from 'react-router-dom'
import {menu} from '@/data/menu'
import {
  BsFillHouseFill,
  BsReverseLayoutTextSidebarReverse,
  BsFillGrid3X3GapFill,
  BsShop,
  BsGraphUp,
  BsListOl,
  BsTools,
  BsPeople,
  BsDiagram3,
  BsDoorOpen,
} from 'react-icons/bs'

function index(props) {
  const [stateMenu, setStateMenu] = useState(false)

  const handleMenu = () => {
    stateMenu ? setStateMenu(false) : setStateMenu(true)
  }

  const {context} = props
  const {userState} = context
  return (
    <>
      {userState.length !== 0 && (
        <nav>
          <div className={style.navbar}>
            <div className={style.navbar_logo}>
              <img
                src={logoImg}
                alt="logoImg"
                width="40px"
                height="40px"
              />
              <h1>Phoenix</h1>
            </div>
            <button
              className={style.navbar_bars}
              onClick={handleMenu}
            >
              <img
                src={menuImg}
                alt="Menu"
                width="30px"
                height="30px"
              />
            </button>

            <button className={style.navbar_logout}>
              <span className={style.navbar_logout_user}>
                <img
                  src={userState[0].user_photo}
                  alt={userState[0].user_name}
                  className={style.navbar_logout_user_img}
                />
                {userState[0].user_name}
              </span>
              <Link
                to="/"
                className={style.navbar_logout_btn}
                onClick={() => context.handleUserLogout()}
              >
                Salir
              </Link>
            </button>
          </div>
          <div className={stateMenu ? style.navbar_active : style.navbar_content}>
            <div className={style.navbar_list}>
              {menu &&
                menu.map((item, index) => (
                  <Link
                    to={item.path}
                    key={index}
                    className={style.navbar_item}
                    onClick={() => handleMenu()}
                  >
                    {item.icon === 'BsFillHouseFill' ? (
                      <BsFillHouseFill />
                    ) : item.icon === 'BsReverseLayoutTextSidebarReverse' ? (
                      <BsReverseLayoutTextSidebarReverse />
                    ) : item.icon === 'BsFillGrid3X3GapFill' ? (
                      <BsFillGrid3X3GapFill />
                    ) : item.icon === 'BsShop' ? (
                      <BsShop />
                    ) : item.icon === 'BsGraphUp' ? (
                      <BsGraphUp />
                    ) : item.icon === 'BsListOl' ? (
                      <BsListOl />
                    ) : item.icon === 'BsTools' ? (
                      <BsTools />
                    ) : item.icon === 'BsPeople' ? (
                      <BsPeople />
                    ) : item.icon === 'BsDiagram3' ? (
                      <BsDiagram3 />
                    ) : (
                      <></>
                    )}
                    <span>{item.title}</span>
                  </Link>
                ))}

              <Link
                to="/"
                className={style.navbar_item}
                onClick={() => context.handleUserLogout()}
              >
                <BsDoorOpen />
                <span>Salir</span>
              </Link>
            </div>
          </div>
        </nav>
      )}
      <Outlet />
    </>
  )
}

export default index
