import {URL_API_PDO} from '@/constants'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'react-hot-toast'

const useEditTable = (mesa, setAddMesa, dispatchModifyMesa) => {
  const [modal, setModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: mesa,
  })

  useEffect(() => {
    setValue('table_id', mesa.table_id)
    setValue('table_name', mesa.table_name)
    setValue('table_status', mesa.table_status)
  }, [mesa])

  const onSubmit = (data, e) => {
    toast.loading('Modificando')
    let mesa = {
      ...data,
      table_status: Number(data.table_status),
    }
    setAddMesa(true)

    fetch(`${URL_API_PDO}tables.php`, {
      method: 'PUT',
      body: JSON.stringify(mesa),
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        toast.dismiss()
        if (json.modify === true) {
          toast.success('Haz modificado una Mesa')
          dispatchModifyMesa()
        } else {
          toast.error(json.message)
        }
      })
      .catch((err) => {
        toast.dismiss()
        toast.error(err)
      })

    e.target.reset()
  }

  const handleModal = () => {
    modal ? setModal(false) : setModal(true)
  }

  const handleDeleteTable = (table_id) => {
    toast.loading('Eliminando')

    setAddMesa(true)
    fetch(`${URL_API_PDO}tables.php?table_id=${table_id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        toast.dismiss()
        if (json.delete === true) {
          toast.success('Haz Eliminado una Mesa')
          dispatchModifyMesa()
        } else {
          toast.error('No se pudo eliminar una Mesa')
          dispatchModifyMesa()
        }
      })
      .catch((err) => {
        toast.dismiss()
        toast.error(err)
      })
    handleModal()
  }

  return {
    setModal,
    modal,
    handleDeleteTable,
    handleModal,
    onSubmit,
    register,
    handleSubmit,
    errors,
  }
}

export default useEditTable
