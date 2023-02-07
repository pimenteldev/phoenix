import React, {useEffect} from 'react'
import {URL_API_PDO} from '@/constants'
import {useForm} from 'react-hook-form'
import {toast} from 'react-hot-toast'
import style from './index.module.css'
import Button from '@/components/Button'

function index(props) {
  const {settings, handleDolar, dispatchGetData} = props

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: settings[0],
  })

  useEffect(() => {
    setValue('price_dollar', settings[0].price_dollar)
  }, [settings])

  const onSubmit = (data) => {
    toast.loading('Actualizando Precio del Dolar')

    const formData = new FormData()
    data.id = settings[0].id

    formData.append('settings', JSON.stringify(data))
    formData.append('functions', 'dolar')

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
          toast.success('Haz Actualizado el Precio del Dolar')
          handleDolar()
          dispatchGetData()
        } else {
          toast.error('No se pudo actualizar el Precio')
        }
      })
      .catch((err) => {
        toast.dismiss()
        toast.error(err)
      })
  }

  return (
    <form
      className={style.form_edita_dolar}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={style.form_item_edita_dolar}>
        <label htmlFor="price_dollar">Precio del Dolar en Bs</label>
        <input
          {...register('price_dollar', {
            required: {
              value: true,
              message: 'Este campo es obligatorio',
            },
          })}
          type="number"
          step="0.01"
          min={0}
          placeholder="Precio del Dolar"
          className={style.input_edita_dolar}
        />
        <>
          <span className="msg_err">{errors.price_dollar && errors.price_dollar.message}</span>
        </>
        <div className={style.form_buttons}>
          <Button
            btntype="WARNING"
            onClick={() => handleDolar()}
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
