import React from 'react'
import style from './index.module.css'

function index(props) {
  return (
    <>
      <div className={style.table_card}>
        <div className={style.table_title}>{props.title}</div>
        <div className={style.table_body}>{props.body}</div>
      </div>
    </>
  )
}
export default index
