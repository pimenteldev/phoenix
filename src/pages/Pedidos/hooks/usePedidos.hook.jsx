import {useState, useEffect} from 'react'
import useDateTimeFormat from '@/hooks/useDateTimeFormat'
import {toast} from 'react-hot-toast'
import {URL_API_PDO} from '@/constants'
import {useForm} from 'react-hook-form'
import useSelectorRedux from './useSelectorRedux.hook'
import getDataOrders from '../services/getDataOrders.service'
import {useDispatch} from 'react-redux'

import {
  SET_DATA_MENU,
  SET_DATA_INVENTARY,
  SET_DATA_PERSONAL,
  SET_DATA_MESAS,
  SET_DATA_ORDERS,
  SET_DATA_SETTINGS,
  SET_DATA_EMPTY,
} from '@/redux/actions/actionTypes'
import putDataEditOrder from '../services/putDataEditOrder.service'

const usePedidos = () => {
  const dispatch = useDispatch()
  const [tableSelect, setTableSelect] = useState({})
  const [personalSelect, setPersonalSelect] = useState({})
  const [orderSelect, setOrderSelect] = useState(null)
  const [modal, setModal] = useState(false)
  const [modalFacture, setModalFacture] = useState(false)
  const [tablesCard, setTablesCard] = useState(true) //TRUE POR DEFECTO
  const [personalCard, setPersonalCard] = useState(false)
  const [productsCard, setProductsCard] = useState(false)
  const [orderEditing, setOrderEditing] = useState(false)
  const [facture, setFacture] = useState(false)
  const [list, setList] = useState([])
  const [facturaFinal, setFacturaFinal] = useState({})

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: '',
  })
  const clearform = () => {
    setValue('client_document', '')
    setValue('client_name', '')
    setValue('client_address', '')
    setValue('client_phone_number', '')
  }
  useEffect(() => {
    clearform()
  }, [])

  const {totals, list_inventary, personal, orders, settings} = useSelectorRedux()

  const dispatchGetData = async () => {
    await getDataOrders()
      .then((json) => {
        dispatch({
          type: SET_DATA_MENU,
          products: json.products || [],
          categories: json.categories || [],
        })
        if (orderSelect !== null) {
          let ordersJson = json.orders
          let ordersFilter = ordersJson?.filter((order) => order.order_id !== orderSelect[0].order_id)

          dispatch({
            type: SET_DATA_INVENTARY,
            items: json.items || [],
            list: list || [],
            orders: ordersFilter || [],
            categories: json.items_categories || [],
            units: json.units || [],
            settings: json.settings || [],
          })
        } else {
          dispatch({
            type: SET_DATA_INVENTARY,
            items: json.items || [],
            list: list || [],
            orders: json.orders || [],
            categories: json.items_categories || [],
            units: json.units || [],
            settings: json.settings || [],
          })
        }

        dispatch({
          type: SET_DATA_PERSONAL,
          personal: json.personal || [],
          role: json.role || [],
        })
        dispatch({
          type: SET_DATA_MESAS,
          payload: json.mesas || [],
        })
        dispatch({
          type: SET_DATA_ORDERS,
          orders: json.orders || [],
        })

        dispatch({
          type: SET_DATA_SETTINGS,
          settings: json.settings || [],
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    dispatchGetData()
  }, [list])

  const handleSelectTable = (table) => {
    if (table.table_active === 1) {
      verifyOrderExist(table)
    } else {
      setTableSelect(table)
      setTablesCard(false)
      setPersonalCard(true)
    }
  }

  const handleSelectPersonal = (personal) => {
    setPersonalSelect(personal)
    setTablesCard(false)
    setPersonalCard(false)
    setProductsCard(true)
  }

  const handleSelectProduct = (product, minDisp) => {
    if (minDisp === 0) {
      return toast.error('Sin existencias en inventario')
    }
    let product_items = JSON.parse(product.product_items)
    let count = list.filter((li) => li.product_id === product.product_id)

    let newProduct = {
      product_id: product.product_id,
      product: {...product, product_items: product_items},
      product_count: 1,
      product_items: product_items,
    }

    if (count.length === 0) {
      setList([...list, newProduct])
    } else {
      setList(
        list.map((li) => (li.product_id === product.product_id ? {...li, product_count: li.product_count + 1} : li))
      )
    }
    toast.dismiss()
    toast.success(product.product_name + ' ha sido añadido')
  }

  const handleUnSelectProduct = (product) => {
    let count = list.filter((li) => li.product_id === product.product_id)
    if (count.length !== 0) {
      count.forEach((li) => {
        if (li.product_count === 1) {
          setList(list.filter((li_pro) => li_pro.product_id !== product.product_id))
        }

        if (li.product_count > 1) {
          setList(
            list.map((li) => (li.product_id === product.product_id ? {...li, product_count: li.product_count - 1} : li))
          )
        }
      })
      toast.dismiss()
      toast.success(product.product_name + ' ha sido Removido')
    }
  }

  const handleModal = () => {
    setModalFacture(false)
    modal ? setModal(false) : setModal(true)
  }

  const handleClearList = () => {
    setList([])
    setModal(false)
  }

  const verifyOrderExist = (table) => {
    let arr = orders.filter((order) => order.order_table_id === table.table_id)
    let arrPersonal = personal.filter((p) => arr[0].order_personal_document === p.personal_document)
    setOrderSelect(arr)
    setTableSelect(table)
    setPersonalSelect(arrPersonal[0])
    setList(arr[0].order_list_inventary)
    setOrderEditing(true)
    setTablesCard(false)
    setPersonalCard(false)
    setProductsCard(true)
    dispatchGetData()
  }

  const handleEditingOrder = async () => {
    toast.loading('Actualizando Pedido')

    const order = {
      order_id: orderSelect[0].order_id,
      list_inventary: JSON.stringify(list_inventary),
    }

    await putDataEditOrder(order)
      .then((json) => {
        toast.dismiss()
        if (json.modify === true) {
          toast.success('Has Generado un nuevo Pedido')
          dispatchGetData()
          handleClearList()
          setOrderSelect(null)
          setTablesCard(true)
          setPersonalCard(false)
          setProductsCard(false)
          setOrderEditing(false)
        } else {
          toast.error('No se logró Generar el Pedido')
          dispatchGetData()
        }
      })
      .catch((err) => {
        toast.dismiss()
        toast.error(err)
      })
  }

  const handleClearProcess = () => {
    setTableSelect({})
    setPersonalSelect({})
    setOrderSelect(null)
    setModal(false)
    setModalFacture(false)
    setTablesCard(true)
    setPersonalCard(false)
    setProductsCard(false)
    setOrderEditing(false)
    setFacture(false)
    setList([])
    setFacturaFinal({})
    dispatch({
      type: SET_DATA_EMPTY,
    })
    clearform()
    dispatchGetData()
  }

  const handleGenerateOrder = () => {
    toast.loading('Generando Pedido')

    const formData = new FormData()
    const order = {
      list_inventary: JSON.stringify(list_inventary),
      table_id: tableSelect.table_id || [],
      personal_document: personalSelect.personal_document || [],
    }

    formData.append('order', JSON.stringify(order))
    formData.append('functionOrders', 'newOrder')

    fetch(`${URL_API_PDO}orders.php`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        toast.dismiss()
        if (json.create === true) {
          toast.success('Has Generado un nuevo Pedido')
          dispatchGetData()
          handleClearList()
          setOrderSelect(null)
          setTablesCard(true)
          setPersonalCard(false)
          setProductsCard(false)
        } else {
          toast.error('No se logró Generar el Pedido')
          dispatchGetData()
        }
      })
      .catch((err) => {
        toast.dismiss()
        toast.error(err)
      })
  }

  const generateFacture = (data) => {
    toast.loading('Actualizando Pedido')

    const formData = new FormData()

    let order_id_verify = orderSelect === null ? 0 : orderSelect[0]?.order_id
    let price_dollar = settings[0]?.price_dollar
    let percent_iva = settings[0]?.percent_iva

    const order = {
      order_id: order_id_verify,
      facturationNumber: settings[0]?.facturation_initial + (settings[0]?.num_last_facture + 1),
      control_number: `${settings[0]?.num_control}${(
        settings[0]?.facturation_initial +
        (settings[0]?.num_last_facture + 1)
      )
        .toString()
        .padStart(8, '0')}`,
      list_inventary: JSON.stringify(list_inventary),
      table_id: tableSelect.table_id,
      personal_document: personalSelect.personal_document,
      order_price_dolar: price_dollar,
      order_percent_iva: percent_iva,
      subtotal: parseFloat(totals.sub_total),
      totalfinal: parseFloat(totals.total_bs),
      ...data,
    }

    formData.append('order', JSON.stringify(order))
    formData.append('functionOrders', 'newFacture')

    fetch(`${URL_API_PDO}orders.php`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        if (json.create === true) {
          if (json.id !== null) {
            setFacturaFinal({
              order_id: json.id,
              order_create: useDateTimeFormat(Date.now()),
              facturationNumber: settings[0]?.facturation_initial + (settings[0]?.num_last_facture + 1),
              controlNumber: `${settings[0]?.num_control}${(
                settings[0]?.facturation_initial +
                (settings[0]?.num_last_facture + 1)
              )
                .toString()
                .padStart(8, '0')}`,
              list_inventary: list_inventary,
              table_id: tableSelect.table_id,
              personal_document: personalSelect.personal_document,
              ...data,
              settings: settings,
              totals: totals,
              personalSelect: personalSelect,
              tableSelect: tableSelect,
            })
          }

          toast.dismiss()
          toast.success('Has Generado una Venta - Facturada')
          setTablesCard(false)
          setPersonalCard(false)
          setProductsCard(false)
          setOrderEditing(false)
          generateFactureFinal()
        } else {
          toast.error('No se logró Generar la Factura')
          dispatchGetData()
        }
      })
      .catch((err) => {
        toast.dismiss()
        toast.error(err)
      })

    setModal(false)
    setModalFacture(false)
  }

  const handleGenerateFacture = () => {
    setModal(false)
    modalFacture ? setModalFacture(false) : setModalFacture(true)
  }

  const onSubmit = (data, e) => {
    generateFacture(data)
    e.target.reset()
  }

  const handleClientAuto = () => {
    setValue('client_document', 'NO CI NO RIF')
    setValue('client_name', 'CLIENTE GENERICO')
    setValue('client_address', 'NO APLICA')
    setValue('client_phone_number', 'NO APLICA')
  }

  const handleClientPersonal = () => {
    setValue('client_document', 'INTERNO')
    setValue('client_name', 'PERSONAL')
    setValue('client_address', 'NO APLICA')
    setValue('client_phone_number', 'NO APLICA')
  }

  const generateFactureFinal = () => {
    setModal(false)
    setModalFacture(false)
    handleClearList()
    setOrderSelect(null)
    setFacture(true)
    dispatchGetData()
  }

  return {
    list,
    personalSelect,
    tableSelect,
    modal,
    modalFacture,
    tablesCard,
    personalCard,
    productsCard,
    orderEditing,
    facture,
    facturaFinal,
    register,
    handleSubmit,
    errors,
    handleSelectTable,
    handleSelectPersonal,
    handleSelectProduct,
    handleUnSelectProduct,
    handleModal,
    handleClearList,
    handleEditingOrder,
    handleGenerateOrder,
    handleGenerateFacture,
    onSubmit,
    handleClientAuto,
    handleClientPersonal,
    handleClearProcess,
  }
}

export default usePedidos
