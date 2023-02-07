import React from 'react'
import Button from '@/components/Button'
import Card from '@/components/Card/Card'
import GeneratePDF from '@/components/GeneratePDF'
import useDateTimeFormat from '@/hooks/useDateTimeFormat'
import ProductsDash from './components/ProductsDash/ProductsDash.component'
import SelectPersonal from './components/SelectPersonal/SelectPersonal.component'
import SelectTable from './components/SelectTable/SelectTable.component'
import usePedidos from './hooks/usePedidos.hook'
import useSelectorRedux from './hooks/useSelectorRedux.hook'
import style from './index.module.css'
import Modal from '@/components/Modal/Modal'

import {FORMATO_FACTURA_CLIENTE} from '@/constants'

function Pedidos() {
  const {
    list,
    personalSelect,
    tableSelect,
    modal,
    modalFacture,
    tablesCard,
    handleSelectTable,
    personalCard,
    handleSelectPersonal,
    productsCard,
    orderEditing,
    facture,
    facturaFinal,
    register,
    handleSubmit,
    errors,
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
  } = usePedidos()

  const {totals, list_inventary, list_product_count, settings} = useSelectorRedux()

  return (
    <div className={'content_body'}>
      {productsCard && (
        <Card title="Datos">
          <div className={style.top_card}>
            <div className={style.top_card_info}>
              <div>
                <span>Precio del Dolar:</span>
                <strong className={style.price_top}>Bs {settings[0]?.price_dollar}</strong>
              </div>
              <div>
                <span>Porcentaje IVA:</span>
                <strong className={style.price_top}>% {settings[0]?.percent_iva}</strong>
              </div>
            </div>
            <div
              className={style.float_bottom}
              onClick={() => handleModal()}
            >
              {list?.length !== 0 && (
                <Button
                  btntype="FLEX"
                  content="Pedido"
                >
                  <span className={style.badge}>{list_product_count}</span>
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}

      {tablesCard && <SelectTable handleSelectTable={handleSelectTable} />}

      {personalCard && (
        <SelectPersonal
          tableSelect={tableSelect}
          handleSelectPersonal={handleSelectPersonal}
        />
      )}

      {productsCard && (
        <ProductsDash
          tableSelect={tableSelect}
          personalSelect={personalSelect}
          handleSelectProduct={handleSelectProduct}
          handleUnSelectProduct={handleUnSelectProduct}
        />
      )}

      {modal && (
        <Modal>
          {list?.length !== 0 && (
            <div className={style.body_facture}>
              <div className={style.header_facture}>
                <div className={style.left_facture}>
                  <div className={style.right_facture_mesa}>
                    <span className={style.spanLabel}>Mesa: </span> {tableSelect?.table_name}
                  </div>
                  <div>
                    <span className={style.spanLabel}>Mesonero: </span>
                    {personalSelect?.personal_document} - {personalSelect?.personal_name}
                  </div>
                  <div className={style.date_facture}>
                    <span className={style.spanLabel}>Fecha: </span>
                    {useDateTimeFormat(Date.now())}
                  </div>
                </div>
                <div className={style.right_facture}>
                  <div>
                    <div className={style.number_facture}>
                      <div className={style.number_facture_left}>
                        <span className={style.spanLabel}>Factura N° </span>
                        {`${settings[0]?.facturation_initial + (settings[0]?.num_last_facture + 1)}`}
                      </div>
                      <div className={style.number_facture_right}>
                        <span className={style.spanLabel}>Control N° </span>
                        {`${settings[0]?.num_control}${(
                          settings[0]?.facturation_initial +
                          (settings[0]?.num_last_facture + 1)
                        )
                          .toString()
                          .padStart(8, '0')}`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <table className={style.table}>
                <thead className={style.table_thead}>
                  <tr className={style.table_thead_tr}>
                    <th scope="col">Cant.</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Precio Unit.</th>
                    <th scope="col">Valor Bs + IVA</th>
                    <th scope="col">Valor Total Bs</th>
                  </tr>
                </thead>
                <tbody>
                  {list_inventary?.map((i, index) => {
                    let base_price = parseFloat(i.product.product_base_price)
                    let price_iva = parseFloat((base_price * settings[0]?.percent_iva) / 1000 + base_price)

                    return (
                      <tr key={index}>
                        <th scope="row">{i.product_count}</th>
                        <td className={style.table_tbody_tr_td_left}>{i.product.product_name}</td>
                        <td className={style.table_tbody_tr_td_right}>{parseFloat(base_price).toFixed(2)}</td>
                        <td className={style.table_tbody_tr_td_right}>{parseFloat(price_iva).toFixed(2)}</td>
                        <td className={style.table_tbody_tr_td_right}>
                          {parseFloat(price_iva * i.product_count).toFixed(2)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot className={style.table_tfoot}>
                  <tr className={style.table_tfoot_tr}>
                    <th
                      scope="col"
                      colSpan={2}
                    ></th>
                    <th
                      scope="col"
                      colSpan={2}
                      className={style.table_tbody_tr_td_right}
                    >
                      Monto Excento y/o Exonerado
                    </th>
                    <th
                      scope="col"
                      className={style.table_tfoot_end_totals}
                    >
                      {' '}
                      0bs
                    </th>
                  </tr>
                  <tr className={style.table_tfoot_tr}>
                    <th
                      scope="col"
                      colSpan={2}
                    ></th>
                    <th
                      scope="col"
                      colSpan={2}
                      className={style.table_tfoot_end}
                    >
                      Sub-Total
                    </th>
                    <th
                      scope="col"
                      className={style.table_tfoot_end_totals}
                    >
                      {parseFloat(totals?.sub_total).toFixed(2)}Bs
                    </th>
                  </tr>
                  <tr className={style.table_tfoot_tr}>
                    <th
                      scope="col"
                      colSpan={2}
                      className={style.table_tfoot_th_firm}
                    ></th>
                    <th
                      scope="col"
                      colSpan={2}
                      className={style.table_tfoot_end}
                    >
                      <strong>I.V.A. % {settings[0]?.percent_iva}</strong>
                    </th>
                    <th
                      scope="col"
                      className={style.table_tfoot_end_totals}
                    >
                      {parseFloat(totals?.total_iva).toFixed(2)}Bs
                    </th>
                  </tr>
                  <tr className={style.table_tfoot_tr}>
                    <th
                      scope="col"
                      colSpan={2}
                    ></th>
                    <th
                      scope="col"
                      colSpan={2}
                      className={style.table_tfoot_th_total}
                    >
                      Total a Pagar
                    </th>
                    <th
                      scope="col"
                      className={style.table_tfoot_end_totals_bs}
                    >
                      {parseFloat(totals?.total_bs).toFixed(2)}Bs
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
          <br />
          <br />
          <div className={style.total_dolar}>Total a Pagar $ {totals?.total_dolar.toFixed(2)}</div>
          <br />
          <br />

          <div className="modal_body_buttons">
            <Button
              btntype="DANGER"
              onClick={() => handleClearList()}
              content="Limpiar"
            />
            <Button
              btntype="PRIMARY"
              onClick={() => handleModal()}
              content="Continuar"
            />

            {orderEditing ? (
              <Button
                btntype="WARNING"
                onClick={() => handleEditingOrder()}
                content="Actualizar Pedido"
              />
            ) : (
              <Button
                btntype="WARNING"
                onClick={() => handleGenerateOrder()}
                content="Generar Pedido"
              />
            )}
            <Button
              btntype="SUCCESS"
              onClick={() => handleGenerateFacture()}
              content="Generar Factura"
            />
          </div>
        </Modal>
      )}

      {modalFacture && (
        <div className={'modal'}>
          <div className="modal_body">
            <h3>Datos del Cliente</h3>
            <form
              className={style.form_nuevo_articulo}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={style.form_item_nuevo_articulo_100}>
                <label htmlFor="client_document">CI/RIF</label>
                <input
                  {...register('client_document', {
                    required: {
                      value: true,
                      message: 'Este campo es obligatorio',
                    },
                  })}
                  type="text"
                  placeholder="CI/RIF"
                  className={style.input_nuevo_articulo}
                />
                <>
                  <span className="msg_err">{errors.client_document && errors.client_document.message}</span>
                </>
              </div>
              <div className={style.form_item_nuevo_articulo_100}>
                <label htmlFor="client_name">Razón Social</label>
                <input
                  {...register('client_name', {
                    required: {
                      value: true,
                      message: 'Este campo es obligatorio',
                    },
                  })}
                  type="text"
                  placeholder="Razón Social"
                  className={style.input_nuevo_articulo}
                />
                <>
                  <span className="msg_err">{errors.client_name && errors.client_name.message}</span>
                </>
              </div>
              <div className={style.form_item_nuevo_articulo_100}>
                <label htmlFor="client_address">Dirección</label>
                <input
                  {...register('client_address', {
                    required: {
                      value: true,
                      message: 'Este campo es obligatorio',
                    },
                  })}
                  type="text"
                  placeholder="Dirección"
                  className={style.input_nuevo_articulo}
                />
                <>
                  <span className="msg_err">{errors.client_address && errors.client_address.message}</span>
                </>
              </div>
              <div className={style.form_item_nuevo_articulo_100}>
                <label htmlFor="client_phone_number">Número de Teléfono</label>
                <input
                  {...register('client_phone_number', {
                    required: {
                      value: true,
                      message: 'Este campo es obligatorio',
                    },
                  })}
                  type="text"
                  placeholder="Número de Teléfono"
                  className={style.input_nuevo_articulo}
                />
                <>
                  <span className="msg_err">{errors.client_phone_number && errors.client_phone_number.message}</span>
                </>
              </div>

              <div className="modal_body_buttons">
                <Button
                  btntype="DANGER"
                  onClick={() => handleModal()}
                  content="Cancelar"
                />
                <Button
                  btntype="INFO"
                  onClick={() => handleClientPersonal()}
                  content="Cliente Personal"
                />
                <Button
                  btntype="WARNING"
                  onClick={() => handleClientAuto()}
                  content="Cliente Genérico"
                />
                <Button
                  btntype="SUCCESS"
                  type="submit"
                  content="Facturar"
                />
              </div>
            </form>
          </div>
        </div>
      )}

      {facture && (
        <>
          <Button
            btntype="WARNING"
            onClick={handleClearProcess}
            content="Finalizar"
          />
          <GeneratePDF
            data={facturaFinal}
            format={FORMATO_FACTURA_CLIENTE}
          />
        </>
      )}
    </div>
  )
}

export default Pedidos
