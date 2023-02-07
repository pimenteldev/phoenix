import {useSelector} from 'react-redux'

function useSelectorRedux() {
  const products = useSelector((state) => {
    return state.menu.products || []
  })

  const categories = useSelector((state) => {
    return state.menu.categories || []
  })

  const totals = useSelector((state) => {
    return state.inventary.totals || []
  })

  const list_inventary = useSelector((state) => {
    return state.inventary.list || []
  })

  const list_product_count = useSelector((state) => {
    return state.inventary.list_product_count || []
  })

  const items = useSelector((state) => {
    return state.inventary.items || []
  })

  const role = useSelector((state) => {
    return state.personal.role || []
  })

  const personal = useSelector((state) => {
    return state.personal.personal || []
  })

  const mesas = useSelector((state) => {
    return state.mesas.mesas || []
  })

  const orders = useSelector((state) => {
    return state.orders.orders || []
  })

  const settings = useSelector((state) => {
    return state.settings.settings || []
  })

  return {
    products,
    categories,
    totals,
    list_inventary,
    list_product_count,
    items,
    role,
    personal,
    mesas,
    orders,
    settings,
  }
}

export default useSelectorRedux
