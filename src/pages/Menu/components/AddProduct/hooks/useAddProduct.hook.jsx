import {useState, useId} from 'react'
import {useForm} from 'react-hook-form'
import AddProductService from '../services/AddProduct.service'
import {toast} from 'react-hot-toast'
import {v4 as newId} from 'uuid'

function useAddProduct(list, setList, dispatchModifyProduct) {
  const [file, setFile] = useState(null)

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm()

  const resetForm = (e) => {
    setFile(null)
    setValue('product_name', '')
    setValue('product_description', '')
    setValue('product_base_price', '')
    setValue('product_status', '')
    setList([])
    e.target.reset()
  }

  const onSubmit = async (data, e) => {
    toast.loading('Registrando')
    let newIdProduct = newId()

    const formData = new FormData()
    formData.append('file', file)
    formData.append('photo', newIdProduct)
    formData.append('location', 'productos')

    let product = {
      ...data,
      product_id: newId(),
      product_items: JSON.stringify(list),
    }

    formData.append('product', JSON.stringify(product))

    await AddProductService(formData)
      .then((json) => {
        console.log(json)
        toast.dismiss()
        if (json.created === true) {
          toast.success('Has creado un Nuevo Producto')
          dispatchModifyProduct()
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

  const handleSelect = (e) => {
    let id = Number(e.target.value)
    let count = list.filter((item) => item.item_id === id)
    let newItem = {
      item_id: Number(id),
      item_count: 1,
    }
    if (count.length === 0) {
      setList([...list, newItem])
    } else {
      toast.error('El articulo ya se encuentra en la lista')
    }
    e.target.value = ''
  }

  const handleChange = (e, item_id) => {
    setList(list.map((li) => (li.item_id === item_id ? {...li, item_count: Number(e.target.value)} : li)))
  }

  const handleDeleteItem = (item_id) => {
    setList(list.filter((li) => li.item_id !== item_id))
  }

  return {
    file,
    setFile,
    register,
    handleSubmit,
    onSubmit,
    errors,
    handleSelect,
    handleChange,
    handleDeleteItem,
  }
}

export default useAddProduct
