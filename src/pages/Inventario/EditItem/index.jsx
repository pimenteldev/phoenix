import React, {useState, useEffect} from 'react'
import style from './index.module.css'
import {useForm} from 'react-hook-form'
import {toast} from 'react-hot-toast'
import {URL_API_PDO} from '@/constants'
import Button from '@/components/Button'

function index(props) {
  const {item, units, categories, dispatchModifyItem, setAddItem} = props
  const [modalDelete, setModalDelete] = useState(false)

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: item,
  })

  useEffect(() => {
    setValue('item_id', item.item_id)
    setValue('item_name', item.item_name)
    setValue('item_category', item.item_category)
    setValue('item_uni_metric', item.item_uni_metric)
    setValue('item_create', item.item_create)
    setValue('item_status', item.item_status)
  }, [item])

  const resetForm = (e) => {
    e.target.reset()
    setValue('item_id', '')
    setValue('item_name', '')
    setValue('item_category', '')
    setValue('item_uni_metric', '')
    setValue('item_create', '')
    setValue('item_status', '')
  }

  const onSubmit = (data, e) => {
    toast.loading('Modificando')
    setAddItem(true)
    fetch(`${URL_API_PDO}inventary.php`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        toast.dismiss()
        if (json.modify === true) {
          toast.success('Haz modificado a un Articulo')
          dispatchModifyItem()
          resetForm(e)
        } else {
          toast.error(json.message)
        }
      })
      .catch((err) => {
        toast.dismiss()
        toast.error(err)
      })
  }

  const handleDeleteItem = (item_id) => {
    toast.loading('Eliminando')
    setAddItem(true)
    fetch(`${URL_API_PDO}inventary.php?item_id=${item_id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        toast.dismiss()
        if (json.delete === true) {
          toast.success('Haz Eliminado un Articulo')
          dispatchModifyItem()
        } else {
          toast.error(json.message)
        }
      })
      .catch((err) => {
        toast.dismiss()
        toast.error(err)
      })
    handleModalDelete()
    setAddItem(true)
  }

  const handleModalDelete = () => {
    modalDelete ? setModalDelete(false) : setModalDelete(true)
  }

  return (
    <>
      <form
        className={style.form_edita_articulo}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={style.form_item_edita_articulo_100}>
          <label htmlFor="item_name">Nombre del Articulo</label>
          <input
            {...register('item_name', {
              required: {
                value: true,
                message: 'Este campo es obligatorio',
              },
            })}
            type="text"
            placeholder="Nombre del Articulo"
            className={style.input_edita_articulo}
          />
          <>
            <span className="msg_err">{errors.item_name && errors.item_name.message}</span>
          </>
        </div>

        <div className={style.form_item_edita_articulo}>
          <label htmlFor="item_category">Categoría</label>
          <select
            {...register('item_category', {
              required: {
                value: true,
                message: 'Este campo es obligatorio',
              },
            })}
            className={style.input_edita_articulo}
          >
            <option value="">Seleccione</option>
            {categories?.map((cat, index) => (
              <option
                key={index}
                value={cat.category_id}
              >
                {cat.category_name}
              </option>
            ))}
          </select>
          <>
            <span className="msg_err">{errors.item_category && errors.item_category.message}</span>
          </>
        </div>
        <div className={style.form_item_edita_articulo}>
          <label htmlFor="item_uni_metric">Tipo de Unidad</label>
          <select
            {...register('item_uni_metric', {
              required: {
                value: true,
                message: 'Este campo es obligatorio',
              },
            })}
            className={style.input_edita_articulo}
          >
            <option value="">Seleccione</option>
            {units?.map((unit, index) => (
              <option
                key={index}
                value={unit.unit_id}
              >
                {unit.unit_type + ' - ' + unit.unit_name}
              </option>
            ))}
            {!units && (
              <option
                defaultValue=""
                value=""
              >
                {' '}
                Seleccione
              </option>
            )}
          </select>
          <>
            <span className="msg_err">{errors.item_uni_metric && errors.item_uni_metric.message}</span>
          </>
        </div>
        <div className={style.buttons_actions}>
          <Button
            btntype="DANGER"
            onClick={() => handleModalDelete()}
            content="Eliminar"
          />
          <Button
            btntype="PRIMARY"
            type="submit"
            content="Modificar"
          />
        </div>
      </form>
      {modalDelete && (
        <div className={'modal'}>
          <div className="modal_body">
            <h3>Confirma que deseas Eliminar este Articulo</h3>
            <div>
              <br />
              {item.item_name}
              <br />
              <br />
            </div>
            <div className="modal_body_buttons">
              <Button
                btntype="WARNING"
                onClick={() => handleModalDelete()}
                content="Cancelar"
              />
              <Button
                btntype="DANGER"
                onClick={() => handleDeleteItem(item.item_id)}
                content="Eliminar"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default index
