import React, {useState, useEffect} from 'react'
import style from './index.module.css'
import Card from '@/components/Card/Card'
import {SET_DATA_PERSONAL} from '@/redux/actions/actionTypes'
import {URL_API_PDO} from '@/constants'
import {useSelector, useDispatch} from 'react-redux'
import AddNewPersonal from './AddNewPersonal'
import EditPersonal from './EditPersonal'
import Button from '@/components/Button'

function index() {
  const dispatch = useDispatch()

  const [addPersonal, setAddPersonal] = useState(true)
  const [personalEditing, setPersonalEditing] = useState({})

  const personal = useSelector((state) => {
    return state.personal.personal || []
  })

  const role = useSelector((state) => {
    return state.personal.role || []
  })

  useEffect(() => {
    dispatchModifyPersonal()
  }, [dispatch])

  const dispatchModifyPersonal = () => {
    fetch(`${URL_API_PDO}personals.php`, {
      method: 'GET',
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        dispatch({
          type: SET_DATA_PERSONAL,
          personal: json.personal,
          role: json.role,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handlePersonal = () => {
    setAddPersonal(true)
  }

  const handleEditPersonal = (person) => {
    setAddPersonal(false)
    setPersonalEditing(person)
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  return (
    <div className={'content_body'}>
      {addPersonal ? (
        <Card title="Nuevo Personal">
          <AddNewPersonal
            role={role}
            dispatchModifyPersonal={dispatchModifyPersonal}
          />
        </Card>
      ) : (
        <>
          <Button
            btntype="WARNING"
            onClick={handlePersonal}
            content="Cancelar"
          />
          <br />
          <br />
          <Card title="Editando Un Personal">
            <EditPersonal
              role={role}
              personal={personalEditing}
              dispatchModifyPersonal={dispatchModifyPersonal}
              setAddPersonal={setAddPersonal}
            />
          </Card>
        </>
      )}

      <Card title="Personal">
        <div className={style.card_personals}>
          {personal?.length >= 1 ? (
            personal?.map((person) => {
              let colorRole = role.filter((rol) => person.personal_role === rol.role_id)
              return (
                <div
                  className={style.card_personal}
                  key={person.personal_document}
                  onClick={() => handleEditPersonal(person)}
                >
                  <div className={style.card_personal_body}>
                    <figure className={style.card_personal_img_box}>
                      <img
                        src={URL_API_PDO + person.personal_photo}
                        alt={person.personal_document}
                        className={style.card_personal_img}
                        loading="lazy"
                      />
                    </figure>
                    <div className={style.card_personal_alias}>{person.personal_alias}</div>
                    <div className={style.card_personal_name}>{person.personal_name}</div>
                    <div className={style.card_personal_document}>
                      Cedula: <strong>{person.personal_document}</strong>
                    </div>
                    <div
                      className={style.role}
                      style={{
                        backgroundColor: colorRole[0]?.role_color,
                      }}
                    >
                      {colorRole[0]?.role_name}
                    </div>
                    <div
                      className={
                        person.personal_status === 0 ? style.personal_status_inactivo : style.personal_status_activo
                      }
                    >
                      {person.personal_status === 0 ? 'Inactivo' : 'Activo'}
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div>No existe Personal en el Sistema</div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default index
