import {URL_API_PDO} from '@/constants'

async function GetProducts() {
  const response = await fetch(`${URL_API_PDO}products.php`, {
    method: 'GET',
  })

  return await response.json()
}

export default GetProducts
