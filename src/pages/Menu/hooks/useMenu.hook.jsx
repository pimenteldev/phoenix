import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {SET_DATA_MENU, SET_DATA_INVENTARY} from '@/redux/actions/actionTypes'
import GetProducts from '../services/GetProducts.service'

function useMenu() {
  const dispatch = useDispatch()
  const [addMenuProduct, setAddMenuProduct] = useState(true)
  const [productEditing, setProductEditing] = useState({})
  const [list, setList] = useState([])

  const menu = useSelector((state) => {
    return state.menu.products || []
  })
  const categories = useSelector((state) => {
    return state.menu.categories || []
  })
  const items = useSelector((state) => {
    return state.inventary.items || []
  })
  const items_categories = useSelector((state) => {
    return state.inventary.categories || []
  })
  const units = useSelector((state) => {
    return state.inventary.units || []
  })

  const dispatchModifyProduct = async () => {
    await GetProducts()
      .then((json) => {
        dispatch({
          type: SET_DATA_MENU,
          products: json.products,
          categories: json.categories,
        })
        dispatch({
          type: SET_DATA_INVENTARY,
          items: json.items,
          categories: json.items_categories,
          units: json.units,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    dispatchModifyProduct()
  }, [dispatch])

  const handleMenu = () => {
    setAddMenuProduct(true)
    setList([])
  }

  const handleEditMenu = (product) => {
    setList([])
    setProductEditing(null)
    setAddMenuProduct(false)
    setProductEditing(product)
    setList(JSON.parse(product.product_items))

    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  return {
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
  }
}

export default useMenu
