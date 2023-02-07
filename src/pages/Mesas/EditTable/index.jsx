import React from 'react'
import style from './index.module.css'
import Button from '@/components/Button'
import useEditTable from './hooks/useEditTable'

function index(props) {
  const {mesa, setAddMesa, dispatchModifyMesa} = props

  const {modal, handleDeleteTable, handleModal, onSubmit, register, handleSubmit, errors} = useEditTable(
    mesa,
    setAddMesa,
    dispatchModifyMesa
  )

  return (
    <>
      {modal && (
        <div className={'modal'}>
          <div className="modal_body">
            <h3>Confirma que deseas Eliminar esta Mesa</h3>
            <div>
              <br />
              {mesa.table_name}
              <br />
              <br />
            </div>
            <div className="modal_body_buttons">
              <Button
                btntype="WARNING"
                onClick={() => handleModal()}
                content="Cancelar"
              />
              <Button
                btntype="DANGER"
                onClick={() => handleDeleteTable(mesa.table_id)}
                content="Eliminar"
              />
            </div>
          </div>
        </div>
      )}

      <form
        className={style.form_edita_mesa}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={style.form_item_edita_mesa}>
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
            className={style.input_edita_mesa}
          />
          <>
            <span className="msg_err">{errors.table_name && errors.table_name.message}</span>
          </>
        </div>

        <div className={style.form_item_edita_mesa}>
          <label htmlFor="table_status">Estatus</label>
          <select
            {...register('table_status', {
              required: {
                value: true,
                message: 'Este campo es obligatorio',
              },
            })}
            className={style.input_edita_mesa}
          >
            <option value="1">Activa</option>
            <option value="0">Inactiva</option>
          </select>
          <>
            <span className="msg_err">{errors.table_status && errors.table_status.message}</span>
          </>
        </div>
        <div className={style.buttons_actions_edita_mesa}>
          <Button
            btntype="DANGER"
            onClick={() => handleModal()}
            content="Eliminar"
          />
          <Button
            btntype="PRIMARY"
            type="submit"
            content="Modificar"
          />
        </div>
      </form>
    </>
  )
}

export default index
