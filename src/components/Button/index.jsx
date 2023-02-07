import React from 'react'
import * as BtnType from './types'
import style from './index.module.css'

function index(props) {
  let btnProps
  btnProps = {...props}

  switch (btnProps.btntype) {
    case BtnType.WARNING: {
      return (
        <button
          className={`${style.btn} ${style.btn_warning}`}
          type={props.type ? props.type : 'Button'}
          {...btnProps}
        >
          {' '}
          {btnProps.content}
        </button>
      )
    }

    case BtnType.DANGER: {
      return (
        <button
          className={`${style.btn} ${style.btn_danger}`}
          type={props.type ? props.type : 'Button'}
          {...btnProps}
        >
          {' '}
          {btnProps.content}
        </button>
      )
    }

    case BtnType.SUCCESS: {
      return (
        <button
          className={`${style.btn} ${style.btn_success}`}
          type={props.type ? props.type : 'Button'}
          {...btnProps}
        >
          {' '}
          {btnProps.content}
        </button>
      )
    }

    case BtnType.INFO: {
      return (
        <button
          className={`${style.btn} ${style.btn_info}`}
          type={props.type ? props.type : 'Button'}
          {...btnProps}
        >
          {' '}
          {btnProps.content}
        </button>
      )
    }

    case BtnType.PRIMARY: {
      return (
        <button
          className={`${style.btn} ${style.btn_primary}`}
          type={props.type ? props.type : 'Button'}
          {...btnProps}
        >
          {' '}
          {btnProps.content} {btnProps.children}
        </button>
      )
    }

    case BtnType.FLEX: {
      return (
        <button
          className={`${style.btn} ${style.btn_flex}`}
          type={props.type ? props.type : 'Button'}
          {...btnProps}
        >
          {' '}
          {btnProps.content} {btnProps.children}
        </button>
      )
    }
    default:
      return (
        <button
          className={`${style.btn}`}
          {...btnProps}
        >
          {props.content}
        </button>
      )
  }
}

export default index
