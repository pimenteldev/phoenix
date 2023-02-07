import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import style from './index.module.css'
import {toast} from 'react-hot-toast'
import {URL_API_PDO} from '@/constants'
import {v4 as newId} from 'uuid'
import Button from '@/components/Button'

function index(props) {
  const [file, setFile] = useState(null)
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: '',
  })

  const {role} = props

  const resetForm = (e) => {
    setFile(null)
    setValue('personal_document', '')
    setValue('personal_name', '')
    setValue('personal_alias', '')
    setValue('personal_role', '')
    setValue('personal_photo', '')
    setValue('personal_status', '')
    e.target.reset()
  }

  const onSubmit = async (data, e) => {
    toast.loading('Registrando')

    let newIdPersonal = newId()
    const formData = new FormData()
    formData.append('file', file)
    formData.append('photo', newIdPersonal)
    formData.append('location', 'personal')
    formData.append('personal', JSON.stringify(data))

    fetch(`${URL_API_PDO}personals.php`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        toast.dismiss()
        if (json.created === true) {
          toast.success('Has creado un Nuevo Personal')
          props.dispatchModifyPersonal()
          resetForm(e)
        } else {
          toast.error(json.message)
          props.dispatchModifyPersonal()
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
        className={style.form_nuevo_personal}
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <div className={style.form_item_nuevo_personal_100}>
          {file ? (
            <div className={style.preview_personal}>
              <figure className={style.preview_personal_figure}>
                <img
                  src={URL.createObjectURL(file)}
                  className={style.preview_personal_img}
                  loading="lazy"
                />
              </figure>
            </div>
          ) : null}
          <input
            {...register('personal_photo', {
              required: {
                value: true,
                message: 'Este campo es obligatorio',
              },
            })}
            type="file"
            placeholder="Seleccione una Imagen"
            className={style.input_photo_personal}
            onChange={(e) => setFile(e.target.files[0])}
          />

          <>
            <span className="msg_err">{errors.personal_photo && errors.personal_photo.message}</span>
          </>
        </div>
        <div className={style.form_item_nuevo_personal}>
          <label htmlFor="personal_document">Cedula de Identidad</label>
          <input
            {...register('personal_document', {
              required: {
                value: true,
                message: 'Este campo es obligatorio',
              },
            })}
            type="text"
            placeholder="Cedula de Identidad"
            className={style.input_nuevo_personal}
          />
          <>
            <span className="msg_err">{errors.personal_document && errors.personal_document.message}</span>
          </>
        </div>
        <div className={style.form_item_nuevo_personal}>
          <label htmlFor="personal_name">Nombre del personal</label>
          <input
            {...register('personal_name', {
              required: {
                value: true,
                message: 'Este campo es obligatorio',
              },
            })}
            type="text"
            placeholder="Nombre del personal"
            className={style.input_nuevo_personal}
          />
          <>
            <span className="msg_err">{errors.personal_name && errors.personal_name.message}</span>
          </>
        </div>
        <div className={style.form_item_nuevo_personal}>
          <label htmlFor="personal_alias">Alias o SobreNombre</label>
          <input
            {...register('personal_alias', {
              required: {
                value: true,
                message: 'Este campo es obligatorio',
              },
            })}
            type="text"
            placeholder="Descripción  del personal"
            className={style.input_nuevo_personal}
          />
          <>
            <span className="msg_err">{errors.personal_alias && errors.personal_alias.message}</span>
          </>
        </div>
        <div className={style.form_item_nuevo_personal}>
          <label htmlFor="personal_role">Cargo o Rol</label>
          <select
            {...register('personal_role', {
              required: {
                value: true,
                message: 'Este campo es obligatorio',
              },
            })}
            className={style.input_nuevo_personal}
          >
            <option value="">Seleccione</option>
            {role?.map((rol, index) => (
              <option
                key={index}
                value={rol.role_id}
              >
                {rol.role_name}
              </option>
            ))}
          </select>
          <>
            <span className="msg_err">{errors.personal_role && errors.personal_role.message}</span>
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
