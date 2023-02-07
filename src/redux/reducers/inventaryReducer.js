import * as actionTypes from '../actions/actionTypes'

export const InventaryReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SET_DATA_INVENTARY: {
      let orders = action.orders || []
      let settings = action.settings || []
      let list = action.list || []
      let newListItems = action.items || []
      let sub_total = 0
      let ordersParse = orders?.map((o) => JSON.parse(o.order_list_inventary))
      let arr = []

      if (ordersParse?.length >= 1) {
        ordersParse?.forEach((op) => {
          op.forEach((o) => arr.push(o))
        })
      }

      if (orders?.length === 0) {
        let reduce = list?.reduce((acumulador, {product_count}) => acumulador + product_count, 0)

        list?.forEach((product) => {
          sub_total = sub_total + product.product.product_base_price * product.product_count
          let itemsLength = product.product_items.length || 0
          for (let i = 0; i <= itemsLength - 1; i++) {
            newListItems = newListItems.map((li) =>
              li.item_id === product.product_items[i].item_id
                ? {
                    ...li,
                    item_count: li.item_count - product.product_items[i].item_count * product.product_count,
                  }
                : li
            )
          }
        })
        let total_bs = parseFloat((sub_total * settings[0]?.percent_iva) / 1000 + sub_total)
        let total_iva = parseFloat((sub_total * settings[0]?.percent_iva) / 1000)
        let total_dolar = parseFloat(total_bs / settings[0]?.price_dollar)

        return {
          ...state,
          items: newListItems,
          categories: action.categories,
          units: action.units,
          list: list,
          list_product_count: reduce,
          totals: {
            sub_total,
            total_iva,
            total_bs,
            total_dolar,
          },
        }
      } else {
        let reduce = list.reduce((acumulador, {product_count}) => acumulador + product_count, 0)

        arr?.forEach((product) => {
          let itemsLength = product.product_items.length || 0
          for (let i = 0; i <= itemsLength - 1; i++) {
            newListItems = newListItems.map((li) =>
              li.item_id === product.product_items[i].item_id
                ? {
                    ...li,
                    item_count: li.item_count - product.product_items[i].item_count * product.product_count,
                  }
                : li
            )
          }
        })

        list?.forEach((product) => {
          sub_total = sub_total + product.product.product_base_price * product.product_count
          let itemsLength = product.product_items.length || 0
          for (let i = 0; i <= itemsLength - 1; i++) {
            newListItems = newListItems.map((li) =>
              li.item_id === product.product_items[i].item_id
                ? {
                    ...li,
                    item_count: li.item_count - product.product_items[i].item_count * product.product_count,
                  }
                : li
            )
          }
        })
        let total_bs = parseFloat((sub_total * settings[0]?.percent_iva) / 1000 + sub_total)
        let total_iva = parseFloat((sub_total * settings[0]?.percent_iva) / 1000)
        let total_dolar = parseFloat(total_bs / settings[0]?.price_dollar)

        return {
          ...state,
          items: newListItems,
          categories: action.categories,
          units: action.units,
          list: list,
          list_product_count: reduce,
          totals: {
            sub_total,
            total_iva,
            total_bs,
            total_dolar,
          },
        }
      }
    }
    case actionTypes.SET_DATA_EMPTY: {
      return {
        items: [],
        categories: [],
        units: [],
        list: [],
        list_product_count: [],
        totals: {
          sub_total: 0,
          total_iva: 0,
          total_bs: 0,
          total_dolar: 0,
        },
      }
    }
    default:
      return state
  }
}
