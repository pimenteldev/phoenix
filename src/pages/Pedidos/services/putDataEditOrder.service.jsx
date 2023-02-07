import {URL_API_PDO} from '@/constants'

async function putDataEditOrder(order) {
  const orderHasString = JSON.stringify(order)
  const response = await fetch(`${URL_API_PDO}orders.php`, {
    method: 'PUT',
    body: orderHasString,
  })
  const json = await response.json()
  return json
}

export default putDataEditOrder
