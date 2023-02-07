import {URL_API_PDO} from '@/constants'
import {SET_DATA_MESAS} from '@/redux/actions/actionTypes'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

const useTables = () => {
  const dispatch = useDispatch()
  const [addMesa, setAddMesa] = useState(true)
  const [mesaEditing, setMesaEditing] = useState({})

  const mesas = useSelector((state) => {
    return state.mesas.mesas || []
  })

  useEffect(() => {
    dispatchModifyMesa()
  }, [dispatch])

  const handleMesa = () => {
    setAddMesa(true)
  }

  const handleEditMesa = (mesa) => {
    setAddMesa(false)
    setMesaEditing(mesa)
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  const dispatchModifyMesa = () => {
    fetch(`${URL_API_PDO}tables.php`, {
      method: 'GET',
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        dispatch({
          type: SET_DATA_MESAS,
          payload: json,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return {
    dispatchModifyMesa,
    handleEditMesa,
    handleMesa,
    setAddMesa,
    mesas,
    addMesa,
    mesaEditing,
  }
}

export default useTables
