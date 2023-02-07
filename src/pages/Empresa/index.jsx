import Card from '@/components/Card/Card'
import {URL_API_PDO} from '@/constants'
import {SET_DATA_SETTINGS} from '@/redux/actions/actionTypes'
import React, {useEffect, useState} from 'react'
import {BsBuilding, BsCardList, BsCurrencyDollar, BsFileEarmarkRuled, BsPercent} from 'react-icons/bs'
import {useDispatch, useSelector} from 'react-redux'
import FormCountItems from './FormCountItems'
import FormDolar from './FormDolar'
import FormIva from './FormIva'
import style from './index.module.css'

function index() {
  const dispatch = useDispatch()
  const [cardDolar, setCardDolar] = useState(false)
  const [cardIVA, setCardIVA] = useState(false)
  const [cardCountsItems, setCardCountsItems] = useState(false)

  const settings = useSelector((state) => {
    return state.settings.settings || []
  })

  useEffect(() => {
    dispatchGetData()
  }, [dispatch])

  const dispatchGetData = () => {
    fetch(`${URL_API_PDO}settings.php`, {
      method: 'GET',
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        dispatch({
          type: SET_DATA_SETTINGS,
          settings: json.settings || [],
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleDolar = () => {
    cardDolar ? setCardDolar(false) : setCardDolar(true)
    setCardIVA(false)
    setCardCountsItems(false)
  }

  const handlePercentIva = () => {
    cardIVA ? setCardIVA(false) : setCardIVA(true)
    setCardDolar(false)
    setCardCountsItems(false)
  }

  const handleCountItems = () => {
    cardCountsItems ? setCardCountsItems(false) : setCardCountsItems(true)
    setCardDolar(false)
    setCardIVA(false)
  }

  return (
    <div className={'content_body'}>
      <Card title="Configuraciones del Sistema">
        <div className={style.card_opciones}>
          <div
            className={style.card_opcion}
            onClick={handleDolar}
          >
            <div className={style.card_opcion_body}>
              <div className={style.card_opcion_body_icon}>
                <i>
                  <BsCurrencyDollar />
                </i>{' '}
                {settings[0]?.price_dollar}
              </div>
              <span>Precio del Dolar</span>
            </div>
          </div>
          <div
            className={style.card_opcion}
            onClick={handlePercentIva}
          >
            <div className={style.card_opcion_body}>
              <div className={style.card_opcion_body_icon}>
                <i>
                  <BsPercent />
                </i>{' '}
                {settings[0]?.percent_iva}
              </div>
              <span>Porcentaje de IVA</span>
            </div>
          </div>
          <div className={style.card_opcion}>
            <div className={style.card_opcion_body}>
              <div className={style.card_opcion_body_icon}>
                <i>
                  <BsBuilding />
                </i>
              </div>
              <span>Información de la Empresa</span>
            </div>
          </div>
          <div
            className={style.card_opcion}
            onClick={handleCountItems}
          >
            <div className={style.card_opcion_body}>
              <div className={style.card_opcion_body_icon}>
                <i>
                  <BsFileEarmarkRuled />
                </i>{' '}
                {settings[0]?.count_items_inventary}
              </div>
              <span>Articulos de Inventario</span>
            </div>
          </div>
          <div className={style.card_opcion}>
            <div className={style.card_opcion_body}>
              <div className={style.card_opcion_body_icon}>
                <i>
                  <BsCardList />
                </i>
              </div>
              <span>Categorías de Inventario</span>
            </div>
          </div>
        </div>
      </Card>
      {cardDolar && (
        <FormDolar
          settings={settings}
          handleDolar={handleDolar}
          dispatchGetData={dispatchGetData}
        />
      )}
      {cardIVA && (
        <FormIva
          settings={settings}
          handlePercentIva={handlePercentIva}
          dispatchGetData={dispatchGetData}
        />
      )}
      {cardCountsItems && (
        <FormCountItems
          settings={settings}
          handleCountItems={handleCountItems}
          dispatchGetData={dispatchGetData}
        />
      )}
    </div>
  )
}

export default index
