import React from 'react'
import style from './index.module.css'
import Button from '@/components/Button'
import useAddTable from './hooks/useAddTable'

function index(props) {
  const {dispatchModifyMesa} = props
  const {onSubmit, register, handleSubmit, errors} = useAddTable(dispatchModifyMesa)

  return (
    <div>
      <form
        className={style.form_nueva_mesa}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={style.form_item_nueva_mesa}>
          <label htmlFor="table_name">Nombre de la Mesa</label>
          <input
            {...register('table_name', {
              required: {
                value: true,
                message: 'Este campo es obligatorio',
              },
            })}
            type="text"
            placeholder="Nombre de la Mesa"
            className={style.input_nueva_mesa}
          />
          <>
            <span className="msg_err">{errors.table_name && errors.table_name.message}</span>
          </>
        </div>

        <div className={style.form_item_nueva_mesa}>
          <label htmlFor="table_status">Estatus</label>
          <select
            {...register('table_status', {
              required: {
                value: true,
                message: 'Este campo es obligatorio',
              },
            })}
            className={style.input_nueva_mesa}
          >
            <option value="">Seleccione</option>
            <option value="1">Activa</option>
            <option value="0">Inactiva</option>
          </select>
          <>
            <span className="msg_err">{errors.table_status && errors.table_status.message}</span>
          </>
        </div>
        <div className={style.buttons_actions_nueva_mesa}>
          <Button
            btntype="PRIMARY"
            type="submit"
            content="Agregar"
          />
        </div>
      </form>
    </div>
  )
}

export default index
