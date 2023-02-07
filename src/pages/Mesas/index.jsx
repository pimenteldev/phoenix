import React from 'react'
import style from './index.module.css'
import Card from '@/components/Card/Card'
import AddNewTable from './AddNewTable'
import EditTable from './EditTable'
import useTables from './hooks/useTables'
import Button from '@/components/Button'
import Alert from '@/components/Alert/Alert'

function index() {
  const {dispatchModifyMesa, handleEditMesa, handleMesa, setAddMesa, mesas, addMesa, mesaEditing} = useTables()

  return (
    <div className={'content_body'}>
      {addMesa ? (
        <Card title="Nueva Mesa">
          <AddNewTable dispatchModifyMesa={dispatchModifyMesa} />
        </Card>
      ) : (
        <>
          <Button
            btntype="WARNING"
            onClick={handleMesa}
            content="Cancelar"
          />
          <br />
          <br />
          <Card title="Editando Una Mesa">
            <EditTable
              mesa={mesaEditing}
              dispatchModifyMesa={dispatchModifyMesa}
              setAddMesa={setAddMesa}
            />
          </Card>
        </>
      )}

      <Card title="Mesas">
        {mesas?.length >= 1 ? (
          <div className={style.card_mesas}>
            {mesas?.map((mesa) => (
              <div
                className={style.card_mesa}
                key={mesa.table_id}
                onClick={() => handleEditMesa(mesa)}
              >
                <div className={style.card_mesa_body}>
                  <figure className={style.card_mesa_img_box}>
                    <img
                      src="/mesa.jpg"
                      alt="mesa imagen"
                      className={style.card_mesa_img}
                      loading="lazy"
                    />
                  </figure>
                  <div className={style.card_mesa_name}>{mesa.table_name}</div>
                  <div className={mesa.table_status === 0 ? style.mesa_status_inactivo : style.mesa_status_activo}>
                    {mesa.table_status === 0 ? 'Inactiva' : 'Activa'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Alert typeAlert="warning">No existen Mesas en el Sistema</Alert>
        )}
      </Card>
    </div>
  )
}

export default index
