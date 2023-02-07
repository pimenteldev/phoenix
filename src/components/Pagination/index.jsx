import React from 'react'
import style from './index.module.css'

function index(props) {
  const {pagina, total, handleChange} = props

  const getPages = () => {
    let result = []
    for (let i = 0; i < total; i++) {
      let page = i + 1
      result.push(
        <a
          key={i + 1}
          className={pagina === page ? style.active : style.inactive}
          onClick={() => handleChange(page)}
        >
          {page}
        </a>
      )
    }
    return result
  }
  return (
    <div className={style.topbar_filter}>
      <span className={style.pagination_actual}>
        Página {pagina} de {total}:
      </span>
      <div className={style.pagination}>{getPages()}</div>
    </div>
  )
}

export default index
