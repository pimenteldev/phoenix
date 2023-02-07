import {URL_API_PDO} from '@/constants'
import UserFormat from '../models/user.model'

async function login(data) {
  const response = await fetch(`${URL_API_PDO}log.php`, {
    method: 'POST',
    body: UserFormat(data),
  })
  const json = await response.json()
  return json
}

export default login
