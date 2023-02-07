import React, {useEffect} from 'react'
import {URL_API_PDO} from '@/constants'
import {useForm} from 'react-hook-form'
import {toast} from 'react-hot-toast'
import style from './index.module.css'
import Button from '@/components/Button'

function index(props) {
  const {settings, handleCountItems, dispatchGetData} = props

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: settings[0],
  })

  useEffect(() => {
    setValue('count_items_inventary', settings[0]?.count_items_inventary)
  }, [settings])

  const onSubmit = (data) => {
    toast.loading('Actualizando Cantidad de Articulos')

    const formData = new FormData()
    data.id = settings[0].id

    formData.append('settings', JSON.stringify(data))
    formData.append('functions', 'count')

    fetch(`${URL_API_PDO}settings.php`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        toast.dismiss()
        if (json.modify === true) {
          toast.success('Haz Actualizado la Cantidad de Articulos')
          handleCountItems()
          dispatchGetData()
        } else {
          toast.error('No se pudo actualizar el cantidad de Articulos')
        }
      })
      .catch((err) => {
        toast.dismiss()
        toast.error(err)
      })
  }

  return (
    <form
      className={style.form_edita_count}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={style.form_item_edita_count}>
        <label htmlFor="count_items_inventary">Cantidad de Articulos por Lista</label>
        <input
          {...register('count_items_inventary', {
            required: {
              value: true,
              message: 'Este campo es obligatorio',
            },
          })}
          type="number"
          min={1}
          placeholder="Cantidad de Articulos por Lista"
          className={style.input_edita_count}
        />
        <>
          <span className="msg_err">{errors.count_items_inventary && errors.count_items_inventary.message}</span>
        </>

        <div className={style.form_buttons}>
          <Button
            btntype="WARNING"
            onClick={() => handleCountItems()}
            content="Cancelar"
          />
          <Button
            btntype="PRIMARY"
            type="submit"
            content="Actualizar"
          />
        </div>
      </div>
    </form>
  )
}

export default index
