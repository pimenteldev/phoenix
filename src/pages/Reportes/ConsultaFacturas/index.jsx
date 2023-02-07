import React, {useState} from 'react'
import style from './index.module.css'
import {URL_API_PDO, FORMATO_FACTURA_CLIENTE} from '@/constants'
import Card from '@/components/Card/Card'
import Button from '@/components/Button'
import Table from '@/components/Table'
import GeneratePDF from '@/components/GeneratePDF'
import {useForm} from 'react-hook-form'
import {toast} from 'react-hot-toast'
import {BsEye} from 'react-icons/bs'

function index() {
  const [viewOrders, setViewOrders] = useState(true)
  const [viewForm, setViewForm] = useState(true)
  const [orderDetails, setOrderDetails] = useState({})
  const [orders, setOrders] = useState([])

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: '',
  })

  const handleResetForm = () => {
    setValue('initial_day', '')
    setValue('final_day', '')
    setValue('num_facture', '')
    setValue('keyword', '')
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
    fetch(`${URL_API_PDO}reports.php`, {
      method: 'POST',
      body: JSON.stringify({
        initial_day: data.initial_day,
        final_day: data.final_day,
        num_facture: data.num_facture,
        keyword: data.keyword,
      }),
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        toast.dismiss()
        if (json.orders !== undefined) {
          setOrders(json.orders.sort((a, b) => a.facturationNumber - b.facturationNumber))
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
                  {...register('initial_day')}
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
                  {...register('final_day')}
                  type="date"
                  className={style.input_form}
                />
                <>
                  <span className="msg_err">{errors.final_day && errors.final_day.message}</span>
                </>
              </div>
              <div className={style.input_form_div}>
                <label htmlFor="num_facture">Número de Factura</label>
                <input
                  {...register('num_facture')}
                  type="number"
                  className={style.input_form}
                />
                <>
                  <span className="msg_err">{errors.num_facture && errors.num_facture.message}</span>
                </>
              </div>
              <div className={style.input_form_div}>
                <label htmlFor="keyword">Criterio de Busqueda</label>
                <input
                  {...register('keyword')}
                  type="text"
                  className={style.input_form}
                />
                <>
                  <span className="msg_err">{errors.keyword && errors.keyword.message}</span>
                </>
              </div>
              <div className={style.buttons_actions}>
                <Button
                  btntype="WARNING"
                  content="Limpiar"
                  onClick={handleResetForm}
                />
                <Button
                  btntype="PRIMARY"
                  type="submit"
                  content="Consultar"
                />
              </div>
            </form>
          </Card>

          {orders?.length >= 1 ? (
            <>
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
