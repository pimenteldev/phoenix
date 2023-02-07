import {URL_API_PDO} from '@/constants'
import {useForm} from 'react-hook-form'
import {toast} from 'react-hot-toast'

const useAddNewTable = (dispatchModifyMesa) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: '',
  })

  const onSubmit = (data, e) => {
    toast.loading('Registrando')
    let mesa = {
      ...data,
      table_status: Number(data.table_status),
    }
    fetch(`${URL_API_PDO}tables.php`, {
      method: 'POST',
      body: JSON.stringify(mesa),
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        toast.dismiss()
        if (json.created === true) {
          toast.success('Has creado una Nueva Mesa')
          dispatchModifyMesa()
        } else {
          toast.error(json.message)
        }
      })
      .catch((err) => {
        toast.dismiss()
        toast.error(err)
      })
    setValue('table_id', '')
    setValue('table_name', '')
    setValue('table_status', '')
    e.target.reset()
  }

  return {onSubmit, register, handleSubmit, errors}
}

export default useAddNewTable
