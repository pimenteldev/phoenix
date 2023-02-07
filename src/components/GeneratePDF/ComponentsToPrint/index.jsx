import React from 'react'
import style from './index.module.css'

function index(props) {
  const {data} = props

  function redondearExp(numero, digitos, masEspaciado = false) {
    function toExp(numero, digitos) {
      let arr = numero.toString().split('e')
      let mantisa = arr[0],
        exponente = digitos
      if (arr[1]) exponente = Number(arr[1]) + digitos
      return Number(mantisa + 'e' + exponente.toString())
    }
    let absNumero = Math.abs(numero)
    let signo = Math.sign(numero)
    if (masEspaciado) {
      let n = Math.floor(Math.log2(absNumero))
      let spacing = Math.pow(2, n) * Number.EPSILON
      if (spacing < Math.pow(10, -digitos - 1)) {
        absNumero += spacing
      }
    }
    let entero = Math.round(toExp(absNumero, digitos))
    return signo * toExp(entero, -digitos)
  }

  return (
    <div className="printElement">
      <div className={style.body_facture}>
        <div className={style.title_facture}>
          <h2>FACTURA</h2>
        </div>
        <div className={style.header_facture}>
          <div className={style.left_facture}>
            <div>
              <h3>Restaurant</h3>
              <h2>EL CANEY</h2>
            </div>

            <div className={style.bot_title_facture}>
              <div>DE ALICDO MONTILLA</div>
              <div>RIF. V-030359000 - NIT. 0021405604</div>
              <div>Carretera Trasandina - Quebrada de la Virgen</div>
              <div>
                <strong>Mérida - Venezuela</strong>
              </div>
              <div>Telef. 0414 - 532 1548</div>
            </div>
          </div>
          <div className={style.right_facture}>
            <div>
              <div className={style.number_facture}>
                <div className={style.number_facture_right}>
                  <span className={style.spanLabel}>Control N°</span>
                  <div className={style.table_primary}>{data.controlNumber}</div>
                </div>
              </div>
              <div className={style.number_facture_left}>
                <span className={style.spanLabel}>Factura N°</span>
                <div className={style.table_primary}>{data.facturationNumber}</div>
              </div>
              <div className={style.right_facture_mesa}>
                <span className={style.spanLabel}>Mesa:</span> {data.tableSelect?.table_name}
              </div>
              <div>
                <span className={style.spanLabel}>Mesonero: </span>
                {data.personalSelect?.personal_document} - {data.personalSelect?.personal_name}
              </div>
              <div className={style.date_facture}>
                <span className={style.spanLabel}>FECHA: </span> {data.order_create}
              </div>
            </div>
          </div>
        </div>

        <div className={style.center_facture}>
          <div className={style.center_facture_client}>
            Razón Social:
            <span className={style.facture_info}>{data.client_name} </span>
          </div>
          <div className={style.center_facture_direction}>
            Dirección:
            <span className={style.facture_info}>{data.client_address} </span>
          </div>
          <div className={style.center_facture_bottom}>
            <span>
              Rif:
              <span className={style.facture_info}>{data.client_document}</span>
            </span>

            <span>
              Teléfono: <span className={style.facture_info}>{data.client_phone_number} </span>
            </span>
          </div>
        </div>

        <table className={style.table}>
          <thead className={style.table_thead}>
            <tr className={style.table_thead_tr}>
              <th
                scope="col"
                className={style.table_cant_th_cant}
              >
                Cant.
              </th>
              <th
                scope="col"
                colSpan={2}
                className={style.table_cant_th_description}
              >
                Descripción
              </th>
              <th
                scope="col"
                className={style.table_cant_th_totales}
              >
                Precio Unitario
              </th>
              <th
                scope="col"
                className={style.table_cant_th_totales}
              >
                Valor Total
              </th>
              <th
                scope="col"
                className={style.table_cant_th_totales}
              >
                Valor Total
              </th>
            </tr>
            <tr>
              <td colSpan={3}></td>
              <td className={style.table_center}>
                <small>Bolívares VES</small>
              </td>
              <td className={style.table_center}>
                <small>Bolívares VES</small>
              </td>
              <td className={style.table_center}>
                <small>Dólares USD</small>
              </td>
            </tr>
          </thead>

          <tbody>
            {data.list_inventary?.map((i, index) => {
              let base_price = i.product.product_base_price

              let precio_final_dolares = (base_price * i.product_count) / data.settings[0]?.price_dollar
              return (
                <tr key={index}>
                  <th scope="row">{i.product_count}</th>
                  <td
                    className={style.table_tbody_tr_td_left}
                    colSpan={2}
                  >
                    {i.product.product_name}
                  </td>
                  <td className={style.table_tbody_tr_td_right}>{redondearExp(base_price, 2, true).toFixed(2)}</td>
                  <td className={style.table_tbody_tr_td_right}>
                    {redondearExp(base_price * i.product_count, 2, true).toFixed(2)}
                  </td>
                  <td className={style.table_tbody_tr_td_right}>{redondearExp(precio_final_dolares, 2, true)}</td>
                </tr>
              )
            })}
          </tbody>
          <tfoot className={style.table_tfoot}>
            <tr className={style.table_tfoot_tr}>
              <th
                scope="col"
                colSpan={6}
                className={style.table_tfoot_divider}
              >
                {' '}
              </th>
            </tr>
            <tr className={style.table_tfoot_tr}>
              <th
                colSpan={2}
                rowSpan={4}
                className={style.table_tfoot_th_observations}
              >
                <span>
                  <strong>Observaciones</strong> <br />
                  Tipo de Cambio aplicable S/G <br />
                  Publicación del Banco Central <br />
                  (BS/USD) <strong>{data.settings[0]?.price_dollar}</strong> <br />
                  Fecha: {data.order_done}
                </span>
              </th>
              <th
                scope="col"
                colSpan={2}
                className={style.table_tfoot_end + ' ' + style.table_white}
              >
                Monto Excento
              </th>
              <th
                scope="col"
                className={style.table_tfoot_end_totals + ' ' + style.table_white}
              >
                {' '}
                0.00
              </th>
              <th
                scope="col"
                className={style.table_tfoot_end_totals + ' ' + style.table_white}
              >
                {' '}
                0.00
              </th>
            </tr>
            <tr className={style.table_tfoot_tr}>
              <th
                scope="col"
                colSpan={2}
                className={style.table_tfoot_end + ' ' + style.table_grey}
              >
                Base Imponible
              </th>
              <th
                scope="col"
                className={style.table_tfoot_end_totals + ' ' + style.table_grey}
              >
                {redondearExp(data.totals?.sub_total, 2, true).toFixed(2)}
              </th>
              <th
                scope="col"
                className={style.table_tfoot_end_totals + ' ' + style.table_grey}
              >
                {redondearExp(data.totals?.sub_total / data.settings[0]?.price_dollar, 2, true)}
              </th>
            </tr>
            <tr className={style.table_tfoot_tr}>
              <th
                scope="col"
                colSpan={2}
                className={style.table_tfoot_end + ' ' + style.table_white}
              >
                <strong>IVA % {data.settings[0]?.percent_iva}</strong>
              </th>
              <th
                scope="col"
                className={style.table_tfoot_end_totals + ' ' + style.table_white}
              >
                {redondearExp(data.totals?.total_iva, 2, true).toFixed(2)}
                {/* {data.list_inventary?.reduce(
          (acumulador, { product_count }) => acumulador + product_count,
          0
        )}*/}
              </th>
              <th
                scope="col"
                className={style.table_tfoot_end_totals + ' ' + style.table_white}
              >
                {redondearExp(data.totals?.total_iva / data.settings[0]?.price_dollar, 2, true)}
              </th>
            </tr>
            <tr className={style.table_tfoot_tr}>
              <th
                scope="col"
                colSpan={2}
                className={style.table_tfoot_th_total + ' ' + style.table_grey}
              >
                TOTAL A PAGAR
              </th>
              <th
                scope="col"
                className={style.table_tfoot_end_totals_bs}
              >
                Bs. {redondearExp(data.totals?.total_bs, 2, true).toFixed(2)}
              </th>
              <th
                scope="col"
                className={style.table_tfoot_end_totals_bs}
              >
                ${' '}
                {(
                  redondearExp(data.totals?.total_iva / data.settings[0]?.price_dollar, 2, true) +
                  redondearExp(data.totals?.sub_total / data.settings[0]?.price_dollar, 2, true)
                ).toFixed(2)}
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default index
