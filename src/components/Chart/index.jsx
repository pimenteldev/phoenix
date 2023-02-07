import React, {useState, useEffect} from 'react'
import style from './index.module.css'
import ChartItem from './ChartItem'
import {URL_API_PDO} from '@/constants'
import {useSelector, useDispatch} from 'react-redux'
import {setDataOrders} from '@/redux/actions/actions'
import {GET_DATA_ORDERS_CHART} from '@/redux/actions/actionTypes'

function index() {
  const [data, setData] = useState([])
  const [itemActive, setItemActive] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    const promise = new Promise((resolve, reject) => {
      fetch(`${URL_API_PDO}charts.php?functions=chartsbars`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((json) => {
          resolve(dispatch(setDataOrders(json)))
        })
        .catch((e) => {
          console.log(e)
          reject('Promesa rechazada')
        })
    })

    promise
      .then(() => {
        dispatch({
          type: GET_DATA_ORDERS_CHART,
        })
      })
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    setData(ordersChart)
  }, [data])

  const ordersChart = useSelector((state) => {
    return state.orders.ordersChart || []
  })

  const handleItemActive = (item) => {
    itemActive !== item ? setItemActive(item) : setItemActive([])
  }

  const dataChartMax = data?.reduce((accumulator, item) => accumulator + item.product_dinner_in_sell, 0)
  const dataChartMaxProductos = data?.reduce((accumulator, item) => accumulator + item.product_count, 0)
  const dataMax = data.map((item) => parseFloat(item.product_count)).sort((a, b) => b - a)

  return (
    <div className={style.content}>
      <div className={style.content_card}>
        <div className={style.content_card_body}>
          <div className={style.content_card_body_top}>
            <div className={style.content_card_body_top_charts}>
              {data?.map((item, index) => {
                let maxValue = dataMax[0]
                return (
                  <ChartItem
                    key={index}
                    item={item}
                    itemActive={itemActive}
                    maxValue={maxValue}
                    handleItemActive={handleItemActive}
                  />
                )
              })}
            </div>
          </div>

          <hr
            width="100%"
            className={style.content_card_body_divider}
          />
          <div className={style.content_card_body_bottom}>
            <div>
              <span>Ventas últimos 7 Dias</span>
              <h2>${parseFloat(dataChartMax).toFixed(2)}</h2>
            </div>
            <div className={style.maxProducts}>
              Productos
              <h3> # {dataChartMaxProductos}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index
