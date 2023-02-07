import React from 'react'
import Card from '@/components/Card/Card'
import {URL_API_PDO} from '@/constants'
import useSelectorRedux from '../../hooks/useSelectorRedux.hook'
import ProductsDashGrid from './styled-components/ProductsDashGrid.style'
import CardProductContainer from './styled-components/CardProductDash.style'
import CardProductDashBody from './styled-components/CardProductDashBody.style'
import CardProductDashFigure from './styled-components/CardProductDashFigure.style'
import CardProductDashButton from './styled-components/CardProductDashButtons.style'
import CardProductDashName from './styled-components/CardProductDashName.style'
import CardProductDashCategory from './styled-components/CardProductDashCategory.style'
import CardProductDashBadgeDisp from './styled-components/CardProductDashBadgeDisp.style'
import CardProductDashPrices from './styled-components/CardProductDashPrices.style'
import CardProductDashDescription from './styled-components/CardProductDashDescription.style'

function ProductsDash(props) {
  const {handleSelectProduct, handleUnSelectProduct, tableSelect, personalSelect} = props
  const {products, categories, list_inventary, items, settings} = useSelectorRedux()
  return (
    <Card title={<small>{'Mesa:' + tableSelect?.table_name + ' => Mesero:' + personalSelect?.personal_name}</small>}>
      <ProductsDashGrid>
        {products?.length >= 1 ? (
          products?.map((product) => {
            let product_items = JSON.parse(product.product_items)
            let porduct_items_disponibles = []
            let productoFiltered = list_inventary?.filter((prod) => prod.product_id === product.product_id)

            product_items.map((product_item) => {
              let itemInventary = items.filter((i) => i.item_id === product_item.item_id)

              let lengthI = itemInventary[0]?.item_count
              let resta = product_item.item_count

              let whileLenght

              lengthI / resta < resta ? (whileLenght = 0) : (whileLenght = lengthI / resta)

              porduct_items_disponibles.push(Math.round(whileLenght))
            })
            let arrayPr = porduct_items_disponibles.sort((a, b) => a - b)

            let minDisp = arrayPr[0]
            let colorCategory = categories.filter((cate) => product.product_category === cate.category_id)

            let base_price = parseFloat(product.product_base_price)
            let price_iva = parseFloat((base_price * settings[0]?.percent_iva) / 1000 + base_price)
            let price_final = parseFloat(
              ((base_price * settings[0]?.percent_iva) / 1000 + base_price) / settings[0]?.price_dollar
            )

            return (
              <CardProductContainer key={product.product_id}>
                <CardProductDashBody>
                  <CardProductDashFigure
                    photoProduct={URL_API_PDO + product.product_photo}
                    idProduct={product.product_id}
                  />

                  <CardProductDashName productName={product.product_name} />
                  <CardProductDashButton
                    handleUnSelectProduct={handleUnSelectProduct}
                    product={product}
                    productoFiltered={productoFiltered}
                    handleSelectProduct={handleSelectProduct}
                    minDisp={minDisp}
                  />
                  <CardProductDashCategory
                    productCategory={colorCategory[0]?.category_name}
                    productCategoryColor={colorCategory[0]?.category_color}
                  />

                  <CardProductDashBadgeDisp productMinDisp={minDisp} />

                  <CardProductDashDescription productDescription={product.product_description} />

                  <CardProductDashPrices
                    productIvaPrice={parseFloat(price_iva).toFixed(2)}
                    productDolarPrice={parseFloat(price_final).toFixed(2)}
                  />
                </CardProductDashBody>
              </CardProductContainer>
            )
          })
        ) : (
          <div>No existen Productos en el Sistema</div>
        )}
      </ProductsDashGrid>
    </Card>
  )
}

export default ProductsDash
