import * as actionTypes from '../actions/actionTypes'

export const OrdersReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SET_DATA_ORDERS: {
      let arr = action.orders || []

      let ordersParse = arr.map(
        (o) =>
          true && {
            ...o,
            order_list_inventary: JSON.parse(o.order_list_inventary),
          }
      )

      return {
        ...state,
        orders: ordersParse,
      }
    }

    case actionTypes.GET_DATA_ORDERS_CHART: {
      let ordersChartInState = state.orders || []
      let arrayOrdersItemByItem = []
      let products = {}

      if (ordersChartInState.length >= 1) {
        ordersChartInState.forEach((item) => {
          item.order_list_inventary.forEach((pro) => {
            if (!products[pro.product_id]) {
              products[pro.product_id] = {
                ...pro,
                product_dinner_in_sell: parseFloat(
                  (pro.product.product_base_price * pro.product_count) / item.order_price_dolar
                ),
                product_dolar_price: item.order_price_dolar,
              }
            } else {
              products[pro.product_id].product_count += pro.product_count
              products[pro.product_id].product_dinner_in_sell += parseFloat(
                (pro.product.product_base_price * pro.product_count) / item.order_price_dolar
              )
            }
          })
        })
      }

      Object.values(products).forEach((item) => {
        arrayOrdersItemByItem.push(item)
      })

      let reduceTotalProductsSell = arrayOrdersItemByItem?.reduce(
        (acumulador, {product_count}) => acumulador + product_count,
        0
      )

      return {
        ...state,
        ordersChart: arrayOrdersItemByItem.sort((a, b) => b.product_count - a.product_count).slice(0, 5),
        totalProductsSell: reduceTotalProductsSell,
      }
    }

    case actionTypes.SET_DATA_EMPTY: {
      return {
        ordersChart: [],
        totalProductsSell: [],
      }
    }

    default:
      return state
  }
}
