import React from 'react'
import style from './index.module.css'

function Card(props) {
  return (
    <div className={props.ancho === undefined ? style.card : style.card_50}>
      <div className={style.card_title}>{props.title}</div>
      <div className={props.ancho === undefined ? style.card_body : style.card_body_50}>{props.children}</div>
    </div>
  )
}
export default Card
