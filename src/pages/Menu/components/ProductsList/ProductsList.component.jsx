import React from 'react'
import Card from '@/components/Card/Card'
import style from './index.module.css'
import {URL_API_PDO} from '@/constants'

function ProductsList(props) {
  const {menu, categories, handleEditMenu} = props
  return (
    <Card title="Productos">
      <div className={style.card_products}>
        {menu?.length >= 1 ? (
          menu?.map((product) => {
            let colorCategory = categories.filter((cate) => product.product_category === cate.category_id)
            return (
              <div
                className={style.card_product}
                key={product.product_id}
                onClick={() => handleEditMenu(product)}
              >
                <div className={style.card_product_body}>
                  <figure className={style.card_product_img_box}>
                    <img
                      src={URL_API_PDO + product.product_photo}
                      alt={product.product_id}
                      className={style.card_product_img}
                      loading="lazy"
                    />
                  </figure>
                  <div className={style.card_product_name}>{product.product_name}</div>
                  <div
                    className={style.category}
                    style={{
                      backgroundColor: colorCategory[0]?.category_color,
                    }}
                  >
                    {colorCategory[0]?.category_name}
                  </div>

                  <div className={style.card_product_description}>{product.product_description}</div>
                  <div className={product.product_status === 0 ? style.status_inactivo : style.status_activo}>
                    {product.product_status === 0 ? 'Inactivo' : 'Activo'}
                  </div>
                  <div className={style.product_price}>Bs {parseFloat(product.product_base_price).toFixed(2)}</div>
                </div>
              </div>
            )
          })
        ) : (
          <div>No existen Productos en el Sistema</div>
        )}
      </div>
    </Card>
  )
}

export default ProductsList
