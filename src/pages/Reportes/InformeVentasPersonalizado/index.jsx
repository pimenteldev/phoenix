import React, {useEffect, useState} from 'react'
import style from './index.module.css'
import {URL_API, FORMATO_FACTURA_CLIENTE} from '@/constants'
import Table from '@/components/Table'
import Card from '@/components/Card/Card'
import {BsEye} from 'react-icons/bs'
import Bar from '@/components/Bar'
import Line from '@/components/Line'
import Button from '@/components/Button'
import Pagination from '@/components/Pagination'
import GeneratePDF from '@/components/GeneratePDF'
import {useForm} from 'react-hook-form'
import {toast} from 'react-hot-toast'
import useDateTimeFormat from '@/hooks/useDateTimeFormat'

function index() {
  const [viewOrders, setViewOrders] = useState(true)
  const [viewForm, setViewForm] = useState(true)
  const [orderDetails, setOrderDetails] = useState({})
  const [orders, setOrders] = useState([])
  const [itemsInProducts, setItemsInProducts] = useState([])
  const [items, setItems] = useState([])

  const [inPage, setInPage] = useState(1)
  let ordersFilter = []

  const [dataBar, setDataBar] = useState({
    labels: ['Sin Datos'],
    datasets: [0],
  })

  const [dataLine, setDataLine] = useState({
    labels: ['Sin Datos'],
    datasets: [0],
  })

  const [dataLineDay, setDataLineDay] = useState({
    labels: ['Sin Datos'],
    datasets: [0],
  })

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm()

  useEffect(() => {
    let arrayProductsList = {}
    let arrayItemsInProductsList = {}

    const getOrdersByHour = (orders, horaInicio, horaFin) => {
      let arrayToProcess = []

      for (let i = horaInicio; i <= horaFin; i++) {
        arrayToProcess.push(
          parseFloat(
            orders
              ?.filter((order) => order.order_hour === i)
              .reduce((acc, {totalfinal, order_price_dolar}) => acc + totalfinal / order_price_dolar, 0)
              .toFixed(2)
          )
        )
      }
      return arrayToProcess
    }

    const getOrdersByDay = (orders) => {
      let arrayToProcess = []
      for (let i = 0; i <= 6; i++) {
        arrayToProcess.push(
          parseFloat(
            orders
              ?.filter((order) => order.order_day === i)
              .reduce((acc, {totalfinal, order_price_dolar}) => acc + totalfinal / order_price_dolar, 0)
              .toFixed(2)
          )
        )
      }

      return arrayToProcess
    }

    const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']

    setDataLineDay({
      labels: days,
      datasets: [
        {
          label: 'Facturación total en $',
          data: getOrdersByDay(orders),
          backgroundColor: 'rgba(239, 36, 60, 0.4)',
          borderColor: 'rgba(239, 36, 60, 0.2)',
          borderWidth: 4,
        },
      ],
    })

    setDataBar({
      labels: [
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
      ],
      datasets: [
        {
          label: 'Mañana - Facturación total en $',
          data: getOrdersByHour(orders, 0, 12),
          backgroundColor: 'rgba(239, 36, 60, 0.8)',
          borderColor: 'rgba(239, 36, 60, 0.2)',
          borderWidth: 4,
        },
        {
          label: 'Tarde - Facturación total en $',
          data: getOrdersByHour(orders, 13, 24),
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
          borderColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 4,
        },
      ],
    })

    orders?.forEach((order) => {
      let orderListInventary = order.order_list_inventary
      orderListInventary.forEach((product) => {
        let productItems = product.product_items

        if (!arrayProductsList[product.product_id]) {
          arrayProductsList[product.product_id] = {
            ...product,
            product_dinner_in_sell: parseFloat(
              (product.product.product_base_price * product.product_count) / order.order_price_dolar
            ),
            product_dolar_price: order.order_price_dolar,
          }
        } else {
          arrayProductsList[product.product_id].product_count += product.product_count
          arrayProductsList[product.product_id].product_dinner_in_sell += parseFloat(
            (product.product.product_base_price * product.product_count) / order.order_price_dolar
          )
        }

        productItems.forEach((item) => {
          let itemDetail = items.filter((itemInList) => itemInList.item_id === item.item_id && itemInList)

          if (!arrayItemsInProductsList[item.item_id]) {
            arrayItemsInProductsList[item.item_id] = {
              ...item,
              item_count: parseFloat(item.item_count * product.product_count),
              item_name: itemDetail[0].item_name,
              item_unit_name: itemDetail[0].item_unit_name,
              item_category_name: itemDetail[0].item_category_name,
              item_category_color: itemDetail[0].item_category_color,
            }
          } else {
            arrayItemsInProductsList[item.item_id].item_count += parseFloat(item.item_count * product.product_count)
          }
        })
      })
    })
    arrayItemsInProductsList = Object.values(arrayItemsInProductsList).map((item) => item)

    setDataLine({
      labels: ['Ingredientes descontados en las Ventas'],
      datasets: arrayItemsInProductsList.map((item) => {
        let color = `rgba(${random_rbga(0, 255)}, ${random_rbga(0, 255)}, ${random_rbga(0, 255)}, 0.5)`
        return {
          label: `${item.item_name} - ${item.item_unit_name}`,
          data: [item.item_count],
          backgroundColor: color,
          borderColor: color,
          borderWidth: 4,
        }
      }),
    })

    setItemsInProducts(arrayItemsInProductsList)
  }, [orders])

  function random_rbga(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1))
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    fill: true,
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }

  const handleviewOrderState = () => {
    viewOrders ? setViewOrders(false) : setViewOrders(true)
  }

  const handleOrderView = (order) => {
    handleviewOrderState()

    let final_price = order.totalfinal
    let subtotal = order.subtotal
    let dolar_price = order.order_price_dolar
    let percent_price = order.order_percent_iva
    let total_iva = (subtotal * percent_price) / 1000

    setOrderDetails({
      ...order,
      order_create: order.order_done,
      facturationNumber: order.facturationNumber,
      list_inventary: order.order_list_inventary,
      table_id: order.order_table_id,
      personal_document: order.order_personal_document,
      settings: [
        {
          price_dollar: order.order_price_dolar,
          percent_iva: order.order_percent_iva,
        },
      ],
      totals: {
        sub_total: subtotal,
        total_iva: total_iva,
        total_bs: final_price,
        total_dolar: final_price / dolar_price,
      },
      personalSelect: {
        personal_document: order.order_personal_document,
        personal_name: order.order_personal_name,
      },
      tableSelect: {
        table_id: order.order_table_id,
        table_name: order.order_table_name,
      },
    })
  }

  const onSubmit = (data) => {
    setOrders([])
    toast.loading('Consultando')
    fetch(`${URL_API}get_informe_ventas_rango.php`, {
      method: 'POST',
      body: JSON.stringify({
        initial_day: data.initial_day,
        final_day: data.final_day,
      }),
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        toast.dismiss()
        if (json.orders !== undefined) {
          setOrders(json.orders.sort((a, b) => a.facturationNumber - b.facturationNumber))
          setItems(json.items)
          setViewForm(false)
          toast.success('Consulta Exitosa')
        } else {
          toast.error('No Existen Facturas')
        }
      })
      .catch((err) => {
        toast.dismiss()
        toast.error(err)
      })
  }
  //REVISAR ESTE CONSOLE
  console.log(viewForm)

  ordersFilter = orders?.slice((inPage - 1) * 20, inPage * 20)

  const getTotalPages = () => {
    let countItems = orders?.length
    return Math.ceil(countItems / 20)
  }

  return (
    <>
      {viewOrders ? (
        <>
          <Card title="Consulta Personalizada">
            <form
              className={style.form}
              id="formlogin"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={style.input_form_div}>
                <label htmlFor="initial_day">Desde</label>
                <input
                  {...register('initial_day', {
                    required: {
                      value: true,
                      message: 'Este campo es obligatorio',
                    },
                  })}
                  type="date"
                  className={style.input_form}
                />
                <>
                  <span className="msg_err">{errors.initial_day && errors.initial_day.message}</span>
                </>
              </div>
              <div className={style.input_form_div}>
                <label htmlFor="final_day">Hasta</label>
                <input
                  {...register('final_day', {
                    required: {
                      value: true,
                      message: 'Este campo es obligatorio',
                    },
                  })}
                  type="date"
                  className={style.input_form}
                />
                <>
                  <span className="msg_err">{errors.final_day && errors.final_day.message}</span>
                </>
              </div>
              <div className={style.buttons_actions}>
                <Button
                  btntype="PRIMARY"
                  type="submit"
                  content="Consultar"
                />
              </div>
            </form>
          </Card>

          {ordersFilter?.length >= 1 ? (
            <>
              <div className={style.title_report}>
                Informe de Ventas Personalizado
                <small>{useDateTimeFormat(Date.now())}</small>
              </div>
              <div className={style.card_totals}>
                <span>
                  <h4>Total</h4>
                  <span>
                    {parseFloat(orders?.reduce((accumulator, {subtotal}) => accumulator + subtotal, 0)).toFixed(2)}
                    Bs
                  </span>
                  <small>No Incluye IVA</small>
                </span>
                <span>
                  <h4>Total + IVA</h4>
                  <span>
                    {parseFloat(orders?.reduce((accumulator, {totalfinal}) => accumulator + totalfinal, 0)).toFixed(2)}
                    Bs
                  </span>
                </span>
                <span>
                  <h4>Total + IVA</h4>
                  <span>
                    {parseFloat(
                      orders?.reduce(
                        (accumulator, {totalfinal, order_price_dolar}) => accumulator + totalfinal / order_price_dolar,
                        0
                      )
                    ).toFixed(2)}
                    $
                  </span>
                  <small>Dolares</small>
                </span>
              </div>

              <Table
                title="Informe de Ventas Diario"
                body={
                  <>
                    <table className={style.table}>
                      <thead>
                        <tr>
                          <td>Detalle</td>
                          <td># Factura</td>
                          <td># Control</td>
                          <td>Personal</td>
                          <td>Mesa</td>
                          <td>Cant. Productos</td>
                          <td>Fecha / Hora</td>
                          <td>C.I / R.I.F del Cliente</td>
                          <td>Nombre Completo del Cliente</td>
                          <td>Teléfono del Cliente</td>
                          <td>Dirección del Cliente</td>
                          <td>Porcentaje IVA</td>
                          <td>Precio del Dolar</td>
                          <td>SubTotal BS</td>
                          <td>Total Final BS + IVA</td>
                          <td>Total Final $</td>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order, index) => {
                          let orderProducts = order.order_list_inventary.map(
                            (product) => `(${product.product_count})${product.product.product_name}, `
                          )
                          return (
                            <tr
                              key={index}
                              onClick={() => handleOrderView(order)}
                            >
                              <td className={style.center}>
                                <BsEye />
                              </td>
                              <td className={style.center}>{order.facturationNumber}</td>
                              <td className={style.center}>{order.controlNumber}</td>
                              <td>
                                C.I: {order.order_personal_document} - {order.order_personal_name}{' '}
                              </td>
                              <td>{order.order_table_name} </td>
                              <td>{orderProducts}</td>
                              <td>{order.order_done}</td>
                              <td>{order.client_document}</td>
                              <td>{order.client_name}</td>
                              <td>{order.client_phone_number}</td>
                              <td>{order.client_address}</td>
                              <td className={style.center}>{order.order_percent_iva}%</td>
                              <td className={style.center}>
                                {parseFloat(order.order_price_dolar).toFixed(2)}
                                Bs
                              </td>
                              <td className={style.right}>{parseFloat(order.subtotal).toFixed(2)}Bs</td>
                              <td className={style.right}>{parseFloat(order.totalfinal).toFixed(2)}Bs</td>
                              <td className={style.right}>
                                {parseFloat(order.totalfinal / order.order_price_dolar).toFixed(2)}$
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </>
                }
              />

              <Pagination
                pagina={inPage}
                total={getTotalPages()}
                handleChange={(pagina) => {
                  setInPage(pagina)
                }}
              />

              <Card title="Gráfico de Ventas por Día">
                <Line
                  options={options}
                  data={dataLineDay}
                />
              </Card>

              <Card title="Gráfico de Ventas por Hora">
                <Bar
                  options={options}
                  data={dataBar}
                />
              </Card>

              {itemsInProducts.length >= 1 ? (
                <>
                  <Table
                    title="Egreso en Inventario por Ventas"
                    body={
                      <>
                        <table className={style.table}>
                          <thead>
                            <tr>
                              <td>Nombre del Ingrediente</td>
                              <td>Cantidad</td>
                              <td>Tipo de Unidad</td>
                              <td>Categoría</td>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.values(itemsInProducts)?.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{item.item_name}</td>
                                  <td>{parseFloat(item.item_count).toFixed(2)} </td>
                                  <td>{item.item_unit_name}</td>
                                  <td
                                    style={{
                                      backgroundColor: item.item_category_color,
                                      color: 'white',
                                      textShadow: 'rgb(0 0 0) 1px 1px 0px',
                                      fontFamily: 'montserratbold',
                                    }}
                                  >
                                    {item.item_category_name}
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </>
                    }
                  />
                </>
              ) : (
                <></>
              )}

              <Card title="Gráfico de Ventas por Producto">
                <Bar
                  options={options}
                  data={dataLine}
                />
              </Card>
            </>
          ) : (
            <> </>
          )}
        </>
      ) : (
        <>
          {orderDetails ? (
            <GeneratePDF
              data={orderDetails}
              format={FORMATO_FACTURA_CLIENTE}
              options="none"
            />
          ) : (
            <></>
          )}
        </>
      )}
    </>
  )
}

export default index
