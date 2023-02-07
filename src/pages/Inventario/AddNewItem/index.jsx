import React from 'react'
import style from './index.module.css'
import {useForm} from 'react-hook-form'
import {toast} from 'react-hot-toast'
import {URL_API_PDO} from '@/constants'
import Button from '@/components/Button'

function index(props) {
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: '',
  })

  const {categories, units} = props

  const resetForm = (e) => {
    e.target.reset()
    setValue('item_name', '')
    setValue('item_category', '')
    setValue('item_uni_metric', '')
  }

  const onSubmit = (data, e) => {
    toast.loading('Registrando')

    fetch(`${URL_API_PDO}inventary.php`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        toast.dismiss()
        if (json.created === true) {
          toast.success('Has creado un Nuevo Articulo')
          props.dispatchModifyItem()
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

  return (
    <div>
      <form
        className={style.form_nuevo_articulo}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={style.form_item_nuevo_articulo_100}>
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
            className={style.input_nuevo_articulo}
          />
          <>
            <span className="msg_err">{errors.item_name && errors.item_name.message}</span>
          </>
        </div>

        <div className={style.form_item_nuevo_articulo}>
          <label htmlFor="item_category">Categoría</label>
          <select
            {...register('item_category', {
              required: {
                value: true,
                message: 'Este campo es obligatorio',
              },
            })}
            className={style.input_nuevo_articulo}
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
        <div className={style.form_item_nuevo_articulo}>
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
            {units?.map((u, index) => (
              <option
                key={index}
                value={u.unit_id}
              >
                {u.unit_type + ' - ' + u.unit_name}
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
