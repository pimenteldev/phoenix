import React, {useState, useEffect} from 'react'
import style from './index.module.css'
import {useForm} from 'react-hook-form'
import {toast} from 'react-hot-toast'
import {URL_API_PDO} from '@/constants'
import Button from '@/components/Button'
import {v4 as newId} from 'uuid'

function index(props) {
  const [modal, setModal] = useState(false)
  const [file, setFile] = useState()
  const {personal, role, setAddPersonal, dispatchModifyPersonal} = props
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: personal,
  })

  useEffect(() => {
    setValue('personal_document', personal.personal_document)
    setValue('personal_name', personal.personal_name)
    setValue('personal_alias', personal.personal_alias)
    setValue('personal_role', personal.personal_role)
    setValue('personal_photo', personal.personal_photo)
    setValue('personal_status', personal.personal_status)
  }, [personal])

  const resetForm = (e) => {
    setAddPersonal(true)
    setFile(null)
    setValue('product_name', '')
    setValue('product_description', '')
    setValue('product_base_price', '')
    setValue('product_status', '')
    e.target.reset()
  }

  const onSubmit = async (data, e) => {
    toast.loading('Modificando')

    const formData = new FormData()
    formData.append('file', file)
    formData.append('photo', newId())
    formData.append('photo_prev', personal.personal_photo)
    formData.append('location', 'personal')
    formData.append('method', 'PUT')
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
        if (json.modify === true) {
          toast.success('Haz modificado a un Personal')
          dispatchModifyPersonal()
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

  const handleModal = () => {
    modal ? setModal(false) : setModal(true)
  }

  const handleDeletePersonal = (personal_document, personal_photo) => {
    toast.loading('Eliminando')
    setAddPersonal(true)
    fetch(`${URL_API_PDO}personals.php?personal_document=${personal_document}&personal_photo=${personal_photo}`, {
      method: 'DELETE',
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        toast.dismiss()
        if (json.delete === true) {
          toast.success('Haz Eliminado un Personal')
          dispatchModifyPersonal()
        } else {
          toast.error('No se pudo eliminar el Personal')
          dispatchModifyPersonal()
        }
      })
      .catch((err) => {
        toast.dismiss()
        toast.error(err)
      })
    handleModal()
  }

  return (
    <>
      {modal && (
        <div className={'modal'}>
          <div className="modal_body">
            <h3>Confirma que deseas Eliminar este personal</h3>
            <div>
              <br />
              {personal.personal_name}
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
                onClick={() => handleDeletePersonal(personal.personal_document, personal.personal_photo)}
                content="Eliminar"
              />
            </div>
          </div>
        </div>
      )}

      <div>
        <form
          className={style.form_edita_personal}
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <div className={style.form_item_edita_personal_100}>
            {file ? (
              <figure className={style.preview_personal_figure}>
                <img
                  src={URL.createObjectURL(file)}
                  className={style.preview_personal_edita_img}
                  loading="lazy"
                />
              </figure>
            ) : (
              <figure className={style.preview_personal_figure}>
                <img
                  src={URL_API_PDO + personal.personal_photo}
                  className={style.preview_personal_edita_img}
                  loading="lazy"
                />
              </figure>
            )}
            <input
              {...register('personal_photo')}
              type="file"
              placeholder="Seleccione una Imagen"
              className={style.input_nuevo_personal}
              onChange={(e) => setFile(e.target.files[0])}
            />

            <>
              <span className="msg_err">{errors.personal_photo && errors.personal_photo.message}</span>
            </>
          </div>

          <div className={style.form_item_edita_personal}>
            <label htmlFor="personal_document">Cedula de Identidad</label>
            <input
              {...register('personal_document', {
                required: {
                  value: true,
                  message: 'Este campo es obligatorio',
                },
              })}
              type="text"
              disabled
              placeholder="Cedula de Identidad"
              className={style.input_edita_personal}
            />
            <>
              <span className="msg_err">{errors.personal_document && errors.personal_document.message}</span>
            </>
          </div>
          <div className={style.form_item_edita_personal}>
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
              className={style.input_edita_personal}
            />
            <>
              <span className="msg_err">{errors.personal_name && errors.personal_name.message}</span>
            </>
          </div>
          <div className={style.form_item_edita_personal}>
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
              className={style.input_edita_personal}
            />
            <>
              <span className="msg_err">{errors.personal_alias && errors.personal_alias.message}</span>
            </>
          </div>
          <div className={style.form_item_edita_personal}>
            <label htmlFor="personal_role">Cargo o Rol</label>
            <select
              {...register('personal_role', {
                required: {
                  value: true,
                  message: 'Este campo es obligatorio',
                },
              })}
              className={style.input_edita_personal}
            >
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

          <div className={style.form_item_edita_personal}>
            <label htmlFor="personal_status">Estatus</label>
            <select
              {...register('personal_status', {
                required: {
                  value: true,
                  message: 'Este campo es obligatorio',
                },
              })}
              className={style.input_edita_personal}
            >
              <option value="0">Inactivo</option>
              <option value="1">Activo</option>
            </select>
            <>
              <span className="msg_err">{errors.personal_status && errors.personal_status.message}</span>
            </>
          </div>

          <div className={style.form_item_edita_personal}>
            <label htmlFor="personal_p">Ruta Actual (Imagen)</label>
            <input
              disabled
              type="text"
              defaultValue={personal.personal_photo}
              placeholder="Ruta"
              className={style.input_edita_personal}
            />
            <>
              <span className="msg_err">{errors.personal_p && errors.personal_p.message}</span>
            </>
          </div>

          <div className={style.buttons_actions}>
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
      </div>
    </>
  )
}

export default index
