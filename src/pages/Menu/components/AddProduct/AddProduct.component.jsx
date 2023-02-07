import React from 'react'
import style from './index.module.css'
import Button from '@/components/Button'
import Card from '@/components/Card/Card'
import useAddProduct from './hooks/useAddProduct.hook'

function AddProduct(props) {
  const {categories, items, units, list, setList, dispatchModifyProduct} = props
  const {file, setFile, register, handleSubmit, onSubmit, errors, handleSelect, handleChange, handleDeleteItem} =
    useAddProduct(list, setList, dispatchModifyProduct)

  return (
    <Card title="Nuevo Producto">
      <form
        className={style.form_nuevo_producto}
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <div className={style.form_item_nuevo_producto_100}>
          {file ? (
            <figure className={style.preview_product_figure}>
              <img
                src={URL.createObjectURL(file)}
                className={style.preview_product_img}
                loading="lazy"
              />
            </figure>
          ) : null}
          <input
            {...register('product_photo', {
              required: {
                value: true,
                message: 'Este campo es obligatorio',
              },
            })}
            type="file"
            placeholder="Seleccione una Imagen"
            className={style.input_nuevo_producto}
            onChange={(e) => setFile(e.target.files[0])}
          />

          <>
            <span className="msg_err">{errors.product_photo && errors.product_photo.message}</span>
          </>
        </div>
        <div className={style.form_item_nuevo_producto}>
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
            className={style.input_nuevo_producto}
          />
          <>
            <span className="msg_err">{errors.product_name && errors.product_name.message}</span>
          </>
        </div>
        <div className={style.form_item_nuevo_producto}>
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
            className={style.input_nuevo_producto}
          />
          <>
            <span className="msg_err">{errors.product_description && errors.product_description.message}</span>
          </>
        </div>
        <div className={style.form_item_nuevo_producto}>
          <label htmlFor="product_category">Categoría</label>
          <select
            {...register('product_category', {
              required: {
                value: true,
                message: 'Este campo es obligatorio',
              },
            })}
            className={style.input_nuevo_producto}
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
        <div className={style.form_item_nuevo_producto}>
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
            min={0}
            placeholder="Precio Base"
            className={style.input_nuevo_producto}
          />
          <>
            <span className="msg_err">{errors.product_base_price && errors.product_base_price.message}</span>
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
          {list?.length >= 1 && (
            <Button
              btntype="PRIMARY"
              type="submit"
              content="Agregar"
            />
          )}
        </div>
      </form>
    </Card>
  )
}

export default AddProduct
