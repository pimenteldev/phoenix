import React from 'react'
import Card from '@/components/Card/Card'
import TablesGrid from './styled-components/TablesGrid.style'
import CardTable from './styled-components/CardTable.style'
import CardTableBody from './styled-components/CardTableBody.style'
import CardTableFigure from './styled-components/CardTableFigure.style'
import Alert from '@/components/Alert/Alert'
import useSelectorRedux from '../../hooks/useSelectorRedux.hook'

function SelectTable(props) {
  const {handleSelectTable} = props
  const {personal, mesas, orders} = useSelectorRedux()

  return (
    <Card title="Selecciona una Mesa">
      {mesas?.length >= 1 ? (
        <TablesGrid>
          {mesas?.map((mesa) => {
            let isActive = mesa.table_active === 1 ? true : false
            let order = orders?.filter((order) => order.order_table_id === mesa.table_id)
            let arrPersonal = personal.filter((p) => order[0]?.order_personal_document === p.personal_document)
            return (
              <CardTable
                key={mesa.table_id}
                onClick={() => handleSelectTable(mesa)}
              >
                <CardTableBody isActive={isActive}>
                  <CardTableFigure
                    tableName={mesa.table_name}
                    personal={arrPersonal[0]?.personal_alias}
                  />
                </CardTableBody>
              </CardTable>
            )
          })}
        </TablesGrid>
      ) : (
        <Alert typeAlert="warning">No existen nesas disponibles</Alert>
      )}
    </Card>
  )
}

export default SelectTable
