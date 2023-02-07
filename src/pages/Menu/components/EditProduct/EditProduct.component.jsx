import React, {useState, useEffect} from 'react'
import style from './index.module.css'
import {useForm} from 'react-hook-form'
import {toast} from 'react-hot-toast'
import {URL_API_PDO} from '@/constants'
import Button from '@/components/Button'
import {v4 as newId} from 'uuid'
import EditProductService from './services/EditProduct.service'
import Card from '@/components/Card/Card'

function EditProduct(props) {
  const {product} = props
  const [modal, setModal] = useState(false)
  const {setAddMenuProduct, dispatchModifyProduct} = props

  const [file, setFile] = useState()

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: props.product,
  })

  useEffect(() => {
    setValue('product_name', product.product_name)
    setValue('product_description', product.product_description)
    setValue('product_category', product.product_category)
    setValue('product_base_price', product.product_base_price)
    setValue('product_status', product.product_status)
  }, [product])

  const {categories, items, units, list, setList} = props

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
    setAddMenuProduct(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('photo', newId())
    formData.append('photo_prev', product.product_photo)
    formData.append('location', 'productos')

    let productEdit = {
      ...data,
      product_items: JSON.stringify(list),
    }

    formData.append('product', JSON.stringify(productEdit))
    formData.append('method', 'PUT')

    await EditProductService(formData)
      .then((json) => {
        toast.dismiss()
        if (json.modify === true) {
          toast.success('Haz modificado un Producto')
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

  const handleModal = () => {
    modal ? setModal(false) : setModal(true)
    setList([])
  }

  const handleDeleteProduct = (product_id, product_photo) => {
    toast.loading('Eliminando')

    setAddMenuProduct(true)
    fetch(`${URL_API_PDO}products.php?product_id=${product_id}&product_photo=${product_photo}`, {
      method: 'DELETE',
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        toast.dismiss()
        if (json.delete === true) {
          toast.success('Haz Eliminado un Producto')
          dispatchModifyProduct()
        } else {
          toast.error(json.message)
        }
      })
      .catch((err) => {
        toast.dismiss()
        toast.error(err)
      })
    setList([])
    handleModal()
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

  return (
    <>
      {modal && (
        <div className={'modal'}>
          <div className="modal_body">
            <h3>Confirma que deseas Eliminar este Producto</h3>
            <div>
              <br />
              {product.product_name}
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
                onClick={() => handleDeleteProduct(product.product_id, product.product_photo)}
                content="Eliminar"
              />
            </div>
          </div>
        </div>
      )}
      <Card title="Editando Un Producto">
        <form
          className={style.form_edita_producto}
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <div className={style.form_item_edita_producto_100}>
            {file ? (
              <figure className={style.preview_product_figure}>
                <img
                  src={URL.createObjectURL(file)}
                  className={style.preview_product_edita_img}
                  loading="lazy"
                />
              </figure>
            ) : (
              <figure className={style.preview_product_figure}>
                <img
                  src={URL_API_PDO + product.product_photo}
                  className={style.preview_product_edita_img}
                  loading="lazy"
                />
              </figure>
            )}
            <input
              {...register('product_photo')}
              type="file"
              placeholder="Seleccione una Imagen"
              className={style.input_nuevo_producto}
              onChange={(e) => setFile(e.target.files[0])}
            />

            <>
              <span className="msg_err">{errors.product_photo && errors.product_photo.message}</span>
            </>
          </div>
          <div className={style.form_item_edita_producto}>
            <label htmlFor="product_name">Nombre del Producto</label>
            <input
              {...register('product_name', {
                required: {
                  value: true,
                  message: 'Este campo es obligatorio',
                },
              })}
              type="text"
              placeholder="Nombre del Producto"
              className={style.input_edita_producto}
            />
            <>
              <span className="msg_err">{errors.product_name && errors.product_name.message}</span>
            </>
          </div>
          <div className={style.form_item_edita_producto}>
            <label htmlFor="product_description">Descripción</label>
            <input
              {...register('product_description', {
                required: {
                  value: true,
                  message: 'Este campo es obligatorio',
                },
              })}
              type="text"
              placeholder="Descripción  del Producto"
              className={style.input_edita_producto}
            />
            <>
              <span className="msg_err">{errors.product_description && errors.product_description.message}</span>
            </>
          </div>
          <div className={style.form_item_edita_producto}>
            <label htmlFor="product_category">Categoría</label>
            <select
              {...register('product_category', {
                required: {
                  value: true,
                  message: 'Este campo es obligatorio',
                },
              })}
              className={style.input_edita_producto}
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
              <span className="msg_err">{errors.product_category && errors.product_category.message}</span>
            </>
          </div>

          <div className={style.form_item_edita_producto}>
            <label htmlFor="product_base_price">Precio Base</label>
            <input
              {...register('product_base_price', {
                required: {
                  value: true,
                  message: 'Este campo es obligatorio',
                },
              })}
              type="number"
              step="0.01"
              placeholder="Precio Base"
              className={style.input_edita_producto}
            />
            <>
              <span className="msg_err">{errors.product_base_price && errors.product_base_price.message}</span>
            </>
          </div>

          <div className={style.form_item_edita_producto}>
            <label htmlFor="product_status">Estatus</label>
            <select
              {...register('product_status', {
                required: {
                  value: true,
                  message: 'Este campo es obligatorio',
                },
              })}
              className={style.input_edita_producto}
            >
              <option value="0">Inactivo</option>
              <option value="1">Activo</option>
            </select>
            <>
              <span className="msg_err">{errors.product_status && errors.product_status.message}</span>
            </>
          </div>

          <div className={style.form_item_edita_producto}>
            <label htmlFor="product_p">Ruta Actual (Imagen)</label>
            <input
              disabled
              type="text"
              defaultValue={product.product_photo}
              placeholder="Ruta"
              className={style.input_edita_producto}
            />
            <>
              <span className="msg_err">{errors.product_p && errors.product_p.message}</span>
            </>
          </div>

          <div className={style.form_item_producto_items}>
            <label htmlFor="product_items">Ingredientes En Inventario</label>
            <select onChange={handleSelect}>
              <option value="">Seleccione</option>
              {items?.map((item, index) => (
                <option
                  key={index}
                  value={item.item_id}
                >
                  {item.item_name}
                </option>
              ))}
            </select>
          </div>

          {list?.length >= 1 && (
            <div className={style.form_item_list}>
              {list?.map((ingredient, index) => {
                let ingred = items.filter((item) => item.item_id === ingredient.item_id)
                let unit = units.filter((uni) => ingred[0]?.item_uni_metric === uni.unit_id)

                return (
                  <div
                    key={index}
                    className={style.item_ingrediente_list}
                  >
                    {ingred[0]?.item_name}{' '}
                    <input
                      type="number"
                      step="0.01"
                      min={0}
                      defaultValue={ingredient.item_count}
                      className={style.inp_count}
                      onChange={(e) => handleChange(e, ingredient.item_id)}
                    />{' '}
                    {unit[0]?.unit_name}{' '}
                    <span
                      className={style.deleteItem}
                      onClick={() => handleDeleteItem(ingredient.item_id)}
                    >
                      x
                    </span>
                  </div>
                )
              })}
            </div>
          )}

          <div className={style.buttons_actions}>
            <Button
              btntype="DANGER"
              onClick={() => handleModal()}
              content="Eliminar"
            />
            {list?.length >= 1 && (
              <Button
                btntype="PRIMARY"
                type="submit"
                content="Modificar"
              />
            )}
          </div>
        </form>
      </Card>
    </>
  )
}

export default EditProduct
