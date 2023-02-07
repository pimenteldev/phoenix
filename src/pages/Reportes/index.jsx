import React, {useState, Suspense, lazy} from 'react'
import style from './index.module.css'
import Card from '@/components/Card/Card'
import Button from '@/components/Button'
import Spinner from '@/components/Spinner/spinner'
import {
  BsFillTagsFill,
  BsFillBasketFill,
  BsFillPersonFill,
  BsGrid1X2Fill,
  BsListOl,
  BsReception4,
  BsPeopleFill,
  BsFillCalendarMonthFill,
  BsFillCalendarPlusFill,
  BsBinocularsFill,
} from 'react-icons/bs'

function index() {
  const InformeVentas = lazy(() => import('./InformeVentas'))
  const InformeVentasMes = lazy(() => import('./InformeVentasMes'))
  const InformeVentasPersonalizado = lazy(() => import('./InformeVentasPersonalizado'))
  const ConsultaFacturas = lazy(() => import('./ConsultaFacturas'))

  const [reportInformeVentas, setReportInformeVentas] = useState(false)
  const [reportInformeVentasMes, setReportInformeVentasMes] = useState(false)
  const [reportInformeVentasPersonalizado, setReportInformeVentasPersonalizado] = useState(false)
  const [searchFacture, setSearchFacture] = useState(false)
  const [optionsButtons, setOptionsButtons] = useState(true)

  const handleReport = (report) => {
    if (report === 'informeVentas') {
      reportInformeVentas ? setReportInformeVentas(false) : setReportInformeVentas(true)

      setReportInformeVentasMes(false)
      setReportInformeVentasPersonalizado(false)
      setSearchFacture(false)
    }

    if (report === 'informeVentasMes') {
      reportInformeVentasMes ? setReportInformeVentasMes(false) : setReportInformeVentasMes(true)

      setReportInformeVentas(false)
      setReportInformeVentasPersonalizado(false)
      setSearchFacture(false)
    }

    if (report === 'informeVentasPersonalizado') {
      reportInformeVentasPersonalizado
        ? setReportInformeVentasPersonalizado(false)
        : setReportInformeVentasPersonalizado(true)

      setReportInformeVentas(false)
      setReportInformeVentasMes(false)
      setSearchFacture(false)
    }

    if (report === 'consultaFacturas') {
      searchFacture ? setSearchFacture(false) : setSearchFacture(true)

      setReportInformeVentas(false)
      setReportInformeVentasMes(false)
      setReportInformeVentasPersonalizado(false)
    }
  }

  const handleDashReports = () => {
    setOptionsButtons(true)
    setReportInformeVentas(false)
    setReportInformeVentasMes(false)
    setReportInformeVentasPersonalizado(false)
    setSearchFacture(false)
  }

  return (
    <div className={'content_body'}>
      {optionsButtons ? (
        <Card title="Reportes">
          <div className={style.button_list}>
            <div
              className={style.button}
              onClick={() => {
                handleReport('informeVentas')
                setOptionsButtons(false)
              }}
            >
              <span>
                <BsFillTagsFill />
              </span>
              Informe de Ventas <small>( Hoy )</small>
            </div>
            <div
              className={style.button}
              onClick={() => {
                handleReport('informeVentasMes')
                setOptionsButtons(false)
              }}
            >
              <span>
                <BsFillCalendarMonthFill />
              </span>
              Informe de Ventas <small>( Mes )</small>
            </div>
            <div
              className={style.button}
              onClick={() => {
                handleReport('informeVentasPersonalizado')
                setOptionsButtons(false)
              }}
            >
              <span>
                <BsFillCalendarPlusFill />
              </span>
              Informe de Ventas <small>( Personalizado )</small>
            </div>
            <div
              className={style.button}
              onClick={() => {
                handleReport('consultaFacturas')
                setOptionsButtons(false)
              }}
            >
              <span>
                <BsBinocularsFill />
              </span>
              Facturas
            </div>

            <div
              className={style.button}
              onClick={() => handleReport('ventas')}
            >
              <span>
                <BsFillBasketFill />
              </span>
              Ventas por Producto
            </div>
            <div
              className={style.button}
              onClick={() => handleReport('ventas')}
            >
              <span>
                <BsFillPersonFill />
              </span>
              Ventas por Mesero
            </div>
            <div
              className={style.button}
              onClick={() => handleReport('ventas')}
            >
              <span>
                <BsGrid1X2Fill />
              </span>
              Ventas por Mesa
            </div>
            <div
              className={style.button}
              onClick={() => handleReport('ventas')}
            >
              <span>
                <BsListOl />
              </span>
              Informe de Inventario
            </div>

            <div
              className={style.button}
              onClick={() => handleReport('ventas')}
            >
              <span>
                <BsReception4 />
              </span>
              Rendición del Menú
            </div>
            <div
              className={style.button}
              onClick={() => handleReport('ventas')}
            >
              <span>
                <BsPeopleFill />
              </span>
              Rendimiento del Personal
            </div>
          </div>
        </Card>
      ) : (
        <>
          <Button
            btntype="WARNING"
            content="Volver a Opciones"
            onClick={handleDashReports}
          />
          <br />
          <br />
        </>
      )}

      {reportInformeVentas && (
        <Suspense fallback={<Spinner />}>
          <InformeVentas />
        </Suspense>
      )}

      {reportInformeVentasMes && (
        <Suspense fallback={<Spinner />}>
          <InformeVentasMes />
        </Suspense>
      )}

      {reportInformeVentasPersonalizado && (
        <Suspense fallback={<Spinner />}>
          <InformeVentasPersonalizado />
        </Suspense>
      )}

      {searchFacture && (
        <Suspense fallback={<Spinner />}>
          <ConsultaFacturas />
        </Suspense>
      )}
    </div>
  )
}

export default index
