import React, {useEffect} from 'react'
import {URL_API_PDO} from '@/constants'
import {useForm} from 'react-hook-form'
import {toast} from 'react-hot-toast'
import style from './index.module.css'
import Button from '@/components/Button'

function index(props) {
  const {settings, handlePercentIva, dispatchGetData} = props

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: settings[0],
  })

  useEffect(() => {
    setValue('percent_iva', settings[0]?.percent_iva)
  }, [settings])

  const onSubmit = (data) => {
    toast.loading('Actualizando Porcentaje del IVA')

    const formData = new FormData()
    data.id = settings[0].id

    formData.append('settings', JSON.stringify(data))
    formData.append('functions', 'iva')

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
          toast.success('Haz Actualizado el Porcentaje de IVA')
          handlePercentIva()
          dispatchGetData()
        } else {
          toast.error('No se pudo actualizar el Porcentaje de IVA')
        }
      })
      .catch((err) => {
        toast.dismiss()
        toast.error(err)
      })
  }

  return (
    <form
      className={style.form_edita_iva}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={style.form_item_edita_iva}>
        <label htmlFor="percent_iva">Porcentaje de IVA</label>
        <input
          {...register('percent_iva', {
            required: {
              value: true,
              message: 'Este campo es obligatorio',
            },
          })}
          type="number"
          step="0.01"
          min={0}
          placeholder="Porcentaje de IVA"
          className={style.input_edita_iva}
        />
        <>
          <span className="msg_err">{errors.percent_iva && errors.percent_iva.message}</span>
        </>
        <div className={style.form_buttons}>
          <Button
            btntype="WARNING"
            onClick={() => handlePercentIva()}
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
