import {URL_API_PDO} from '@/constants'

async function AddProductService(formData) {
  const response = await fetch(`${URL_API_PDO}products.php`, {
    method: 'POST',
    body: formData,
  })

  return await response.json()
}

export default AddProductService
