import React from 'react'
import style from './spinner.module.css'
import logo from '@/assets/icon.png'

function Spinner() {
  return (
    <div className={style.spinContainer}>
      <img
        src={logo}
        alt="Phoenix"
        className={style.spinImg}
      />
      <div className={style.spin}>
        <div className={style.c1}></div>
        <div className={style.c2}></div>
        <div className={style.c3}></div>
      </div>
    </div>
  )
}

export default Spinner
