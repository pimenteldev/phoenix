import React from 'react'
import style from './index.module.css'

function index(props) {
  const {item, itemActive, handleItemActive, maxValue} = props

  let altura = item.product_count
  let maxPorcentaje = (altura / maxValue) * 100

  return (
    <div onClick={() => handleItemActive(item)}>
      <p
        style={{
          opacity: itemActive.product_id === item.product_id ? 1 : '',
          backgroundColor: itemActive.day === item.day ? 'var(--dark)' : '',
          color: itemActive.day === item.day ? 'var(--white)' : '',
        }}
      >
        ${item.product_dinner_in_sell.toFixed(2)}
      </p>
      <div
        style={{height: `${Math.floor(maxPorcentaje)}%`}}
        className={itemActive.day === item.day ? style.item_active : ''}
      ></div>
      <span>{item.product.product_name}</span>
      <small># {item.product_count}</small>
    </div>
  )
}

export default index
