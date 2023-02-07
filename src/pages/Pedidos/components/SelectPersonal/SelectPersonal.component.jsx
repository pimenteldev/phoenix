import React from 'react'
import Card from '@/components/Card/Card'
import useSelectorRedux from '../../hooks/useSelectorRedux.hook'
import {URL_API_PDO} from '@/constants'
import PersonalsGridContainer from './styled-components/PersonalsGrid.style'
import CardPersonal from './styled-components/CardPersonal.style'
import CardPersonalBody from './styled-components/CardPersonalBody.style'
import CardPersonalFigure from './styled-components/CardPersonalFigure.style'

function SelectPersonal(props) {
  const {tableSelect, handleSelectPersonal} = props
  const {personal, role} = useSelectorRedux()

  return (
    <Card title={<small>{'Mesa: ' + tableSelect?.table_name + ' > Selecciona un Mesero'}</small>}>
      <PersonalsGridContainer>
        {personal?.length >= 1 ? (
          personal?.map((person) => {
            let colorRole = role.filter((rol) => person.personal_role === rol.role_id)
            return (
              <CardPersonal
                key={person.personal_document}
                onClick={() => handleSelectPersonal(person)}
              >
                <CardPersonalBody>
                  <CardPersonalFigure
                    personalPhoto={URL_API_PDO + person.personal_photo}
                    personalDocument={person.personal_document}
                  />
                  <div className={'card_personal_alias'}>{person.personal_alias}</div>
                  <div className={'card_personal_name'}>{person.personal_name}</div>
                  <div
                    className={'role'}
                    style={{
                      backgroundColor: colorRole[0]?.role_color,
                    }}
                  >
                    {colorRole[0]?.role_name}
                  </div>
                </CardPersonalBody>
              </CardPersonal>
            )
          })
        ) : (
          <div>No existe Personal en el Sistema</div>
        )}
      </PersonalsGridContainer>
    </Card>
  )
}

export default SelectPersonal
