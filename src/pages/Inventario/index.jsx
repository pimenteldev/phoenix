import Button from '@/components/Button'
import Card from '@/components/Card/Card'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import {URL_API_PDO} from '@/constants'
import {SET_DATA_INVENTARY, SET_DATA_SETTINGS} from '@/redux/actions/actionTypes'
import React, {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'react-hot-toast'
import {useDispatch, useSelector} from 'react-redux'
import AddNewItem from './AddNewItem'
import EditItem from './EditItem'
import style from './index.module.css'

function index() {
  const dispatch = useDispatch()
  const [addItem, setAddItem] = useState(true)
  const [itemEditing, setItemEditing] = useState({})
  const [itemOperation, setItemOperation] = useState({})
  const [modalOperation, setModalOperation] = useState(false)
  const [count, setCount] = useState(0)
  const [type, setType] = useState(0)
  const [inPage, setInPage] = useState(1)
  const [txtInput, setTxtInput] = useState('')
  const [searchParam] = useState(['item_name'])
  let itemsFilter = []
  const [itemsFilterByInput, setItemsFilterByInput] = useState([])

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: '',
  })

  const items = useSelector((state) => {
    return state.inventary.items || []
  })

  const categories = useSelector((state) => {
    return state.inventary.categories || []
  })

  const units = useSelector((state) => {
    return state.inventary.units || []
  })

  const settings = useSelector((state) => {
    return state.settings.settings || []
  })

  const clearValueInputSearch = () => {
    setValue('txtInputItem', '')
    setTxtInput('')
  }

  useEffect(() => {
    dispatchModifyItem()
  }, [dispatch])

  const dispatchModifyItem = () => {
    clearValueInputSearch()
    fetch(`${URL_API_PDO}inventary.php`, {
      method: 'GET',
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        dispatch({
          type: SET_DATA_INVENTARY,
          items: json.items || [],
          categories: json.items_categories || [],
          units: json.units || [],
          list: [],
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

  const handleItem = () => {
    setAddItem(true)
  }

  const handleEditItem = (item) => {
    setAddItem(false)
    setItemEditing(item)
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  const handleModalOperation = (item) => {
    let cate = categories.filter((cat) => item.item_category === cat.category_id)
    let unit = units.filter((uni) => item.item_uni_metric === uni.unit_id)
    setItemOperation({
      ...item,
      cate: cate[0]?.category_name,
      unit: unit[0]?.unit_type,
    })
    setValue('operation_count', '')
    setValue('operation_type', '')
    setCount(0)
    setType(0)
    modalOperation ? setModalOperation(false) : setModalOperation(true)
  }

  const onSubmit = (data, e) => {
    toast.loading('Operación En Progreso')

    const formData = new FormData()

    let operation = {
      operation_type: data.operation_type,
      operation_item_id: itemOperation.item_id,
      operation_category: itemOperation.item_category,
      operation_unit: itemOperation.item_uni_metric,
      operation_count: parseFloat(data.operation_count),
    }

    formData.append('operation', JSON.stringify(operation))
    formData.append('method', 'PUT')

    fetch(`${URL_API_PDO}inventary.php`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        toast.dismiss()
        if (json.operation === true) {
          toast.success('Has realizado una Operación')
          dispatchModifyItem()
        } else {
          toast.error(json.message)
        }
      })
      .catch((err) => {
        toast.error('Operación Fallída')
        console.log(err)
      })

    setValue('operation_count', '')
    setValue('operation_type', '')
    setModalOperation(false)
    setCount(0)
    setType(0)
    e.target.reset()
    setTxtInput('')
  }

  const handleOnChangeCount = (e) => {
    setCount(Number(e.target.value))
  }

  const handleOnChangeType = (e) => {
    setType(e.target.value)
  }

  const getTotalPages = () => {
    let countItems = items?.length
    return Math.ceil(countItems / settings[0]?.count_items_inventary)
  }

  itemsFilter = items?.slice(
    (inPage - 1) * settings[0]?.count_items_inventary,
    inPage * settings[0]?.count_items_inventary
  )

  const handleInputFilter = (e) => {
    setTxtInput(e.target.value)
  }

  useEffect(() => {
    if (txtInput !== '') {
      setItemsFilterByInput(
        items?.filter((item) => {
          return searchParam.some((newItem) => {
            return item[newItem].toString().toLowerCase().indexOf(txtInput?.toLowerCase()) > -1
          })
        })
      )
    } else {
      setItemsFilterByInput([])
    }
  }, [txtInput])

  return (
    <div className={'content_body'}>
      {addItem ? (
        <Card title="Nuevo Articulo">
          <AddNewItem
            dispatchModifyItem={dispatchModifyItem}
            categories={categories}
            units={units}
          />
        </Card>
      ) : (
        <>
          <Button
            btntype="WARNING"
            onClick={handleItem}
            content="Cancelar"
          />
          <br />
          <br />
          <Card title="Editando Un Articulo">
            <EditItem
              item={itemEditing}
              units={units}
              categories={categories}
              dispatchModifyItem={dispatchModifyItem}
              setAddItem={setAddItem}
            />
          </Card>
        </>
      )}

      {items?.length >= 1 && (
        <Table
          title="Articulos Registrados"
          body={
            <>
              <div>
                <input
                  {...register('txtInputItem')}
                  type="text"
                  placeholder="Buscar un Articulo..."
                  onChange={(e) => handleInputFilter(e)}
                />
              </div>
              {txtInput === '' && (
                <Pagination
                  pagina={inPage}
                  total={getTotalPages()}
                  handleChange={(pagina) => {
                    setInPage(pagina)
                  }}
                />
              )}

              <table className={style.table}>
                <thead>
                  <tr>
                    <td>Opciones</td>
                    <td>Nombre</td>
                    <td>Existencias</td>
                    <td>Unidad</td>
                    <td>Categoría</td>
                    <td>Estatus</td>
                  </tr>
                </thead>
                <tbody>
                  {itemsFilterByInput.length >= 1
                    ? itemsFilterByInput?.map((item, index) => {
                        let cate = categories?.filter((cat) => item.item_category === cat.category_id)
                        let unit = units?.filter((uni) => item.item_uni_metric === uni.unit_id)

                        return (
                          <tr key={index}>
                            <td className={style.opciones}>
                              <span
                                className={style.btn_operation}
                                onClick={() => handleModalOperation(item, unit)}
                              >
                                Operación
                              </span>
                            </td>

                            <td onClick={() => handleEditItem(item)}>{item.item_name}</td>
                            <td
                              onClick={() => handleEditItem(item)}
                              className={style.item_count}
                            >
                              {item.item_count}
                            </td>
                            <td onClick={() => handleEditItem(item)}>{unit[0]?.unit_type} </td>
                            <td
                              onClick={() => handleEditItem(item)}
                              className={style.item_category}
                              style={{
                                backgroundColor: cate[0]?.category_color,
                                color: 'white',
                                textShadow: '0px 1px 0.1rem #000',
                              }}
                            >
                              {cate[0]?.category_name}
                            </td>
                            <td
                              onClick={() => handleEditItem(item)}
                              className={item.item_status === 0 ? style.item_status_inactivo : style.item_status_activo}
                            >
                              {item.item_status === 0 ? 'Inactivo' : 'Activo'}
                            </td>
                          </tr>
                        )
                      })
                    : itemsFilter?.map((item, index) => {
                        let cate = categories?.filter((cat) => item.item_category === cat.category_id)
                        let unit = units?.filter((uni) => item.item_uni_metric === uni.unit_id)

                        return (
                          <tr key={index}>
                            <td className={style.opciones}>
                              <span
                                className={style.btn_operation}
                                onClick={() => handleModalOperation(item, unit)}
                              >
                                Operación
                              </span>
                            </td>

                            <td onClick={() => handleEditItem(item)}>{item.item_name}</td>
                            <td
                              onClick={() => handleEditItem(item)}
                              className={style.item_count}
                            >
                              {item.item_count}
                            </td>
                            <td onClick={() => handleEditItem(item)}>{unit[0]?.unit_type} </td>
                            <td
                              onClick={() => handleEditItem(item)}
                              className={style.item_category}
                              style={{
                                backgroundColor: cate[0]?.category_color,
                                color: 'white',
                                textShadow: '0px 1px 0.1rem #000',
                              }}
                            >
                              {cate[0]?.category_name}
                            </td>
                            <td
                              onClick={() => handleEditItem(item)}
                              className={item.item_status === 0 ? style.item_status_inactivo : style.item_status_activo}
                            >
                              {item.item_status === 0 ? 'Inactivo' : 'Activo'}
                            </td>
                          </tr>
                        )
                      })}
                </tbody>
              </table>
            </>
          }
        />
      )}

      {modalOperation && (
        <div className={'modal'}>
          <div className="modal_body">
            <h3>Operaciones</h3>
            <form
              className={style.form_nuevo_articulo}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={style.modal_info}>
                <span className={style.modal_info_name}>{itemOperation.item_name}</span>

                <span className={style.modal_info_cate}>{itemOperation.cate}</span>

                <span className={style.modal_info_count}>{itemOperation.item_count + ' - ' + itemOperation.unit} </span>
                <span className={style.modal_info_exist}>Existencias</span>
              </div>

              <div className={style.form_item_nuevo_articulo_100}>
                <label htmlFor="operation_count">Cantidad</label>
                <input
                  {...register('operation_count', {
                    required: {
                      value: true,
                      message: 'Este campo es obligatorio',
                    },
                    min: {
                      value: 0.01,
                      message: 'Minimo: 0',
                    },
                  })}
                  type="number"
                  step="0.01"
                  min={0.01}
                  onChange={(e) => handleOnChangeCount(e)}
                  placeholder="Cantidad"
                  className={style.input_nuevo_articulo}
                />
                <>
                  <span className="msg_err">{errors.operation_count && errors.operation_count.message}</span>
                </>
              </div>

              <div className={style.form_item_nuevo_articulo}>
                <label htmlFor="operation_type">Tipo de Operación</label>
                <select
                  {...register('operation_type', {
                    required: {
                      value: true,
                      message: 'Este campo es obligatorio',
                    },
                  })}
                  onChange={(e) => handleOnChangeType(e)}
                  className={style.input_edita_articulo}
                >
                  <option
                    defaultValue=""
                    value=""
                  >
                    Seleccione
                  </option>
                  <option value="2">Egreso</option>
                  <option value="1">Ingreso</option>
                </select>
                <>
                  <span className="msg_err">{errors.operation_type && errors.operation_type.message}</span>
                </>
              </div>
              <div className="modal_body_buttons">
                <Button
                  btntype="WARNING"
                  onClick={(e) => handleModalOperation(itemOperation, e)}
                  content="Cancelar"
                />

                {type === '1' && count > 0 ? (
                  <Button
                    btntype="PRIMARY"
                    type="submit"
                    content="Confirmar Ingreso"
                  />
                ) : type === '2' && count <= itemOperation.item_count && count > 0 ? (
                  <Button
                    btntype="DANGER"
                    type="submit"
                    content="Confirmar Egreso"
                  />
                ) : (
                  <></>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default index
