import React, {Suspense} from 'react'
import Button from '@/components/Button'
import AddProduct from './components/AddProduct/AddProduct.component'
import EditProduct from './components/EditProduct/EditProduct.component'
import useMenu from './hooks/useMenu.hook'
import ProductsList from './components/ProductsList/ProductsList.component'
import Spinner from '@/components/Spinner/Spinner'

function MENU() {
  const {
    addMenuProduct,
    setAddMenuProduct,
    productEditing,
    list,
    setList,
    menu,
    categories,
    items,
    items_categories,
    units,
    dispatchModifyProduct,
    handleMenu,
    handleEditMenu,
  } = useMenu()

  return (
    <div className={'content_body'}>
      {addMenuProduct ? (
        <AddProduct
          categories={categories}
          items={items}
          items_categories={items_categories}
          units={units}
          list={list}
          setList={setList}
          dispatchModifyProduct={dispatchModifyProduct}
        />
      ) : (
        <>
          <Button
            btntype="WARNING"
            onClick={handleMenu}
            content="Cancelar"
          />
          <br />
          <br />
          <EditProduct
            product={productEditing}
            items={items}
            items_categories={items_categories}
            units={units}
            list={list}
            setList={setList}
            dispatchModifyProduct={dispatchModifyProduct}
            setAddMenuProduct={setAddMenuProduct}
            categories={categories}
          />
        </>
      )}
      <Suspense fallback={<Spinner />}>
        <ProductsList
          menu={menu}
          categories={categories}
          handleEditMenu={handleEditMenu}
        />
      </Suspense>
    </div>
  )
}

export default MENU
