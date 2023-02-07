import React from 'react'
import style from './index.module.css'
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom'
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
} from 'react-icons/bs'

function index(props) {
  const {context} = props
  const {userState} = context
  const navigate = useNavigate()
  let location = useLocation()

  const goToPage = (route) => {
    location.pathname === route && navigate(route)
  }

  return (
    <>
      {userState.length !== 0 && (
        <aside className={style.sidebar_aside}>
          <div className={style.sidebar}>
            <div className={style.sidebar_list}>
              {menu &&
                menu.map((item, index) => (
                  <Link
                    className={location.pathname === item.path ? style.sidebar_item_active : style.sidebar_item}
                    key={index}
                    to={item.path}
                    onClick={() => goToPage(item.path)}
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
            </div>
          </div>
        </aside>
      )}
      <Outlet />
    </>
  )
}

export default index
