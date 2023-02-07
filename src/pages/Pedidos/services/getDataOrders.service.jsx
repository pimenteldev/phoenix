import {URL_API_PDO} from '@/constants'

async function getDataOrders() {
  const response = await fetch(`${URL_API_PDO}orders.php`, {
    method: 'GET',
  })
  const json = await response.json()
  return json
}

export default getDataOrders
