import {URL_API_PDO} from '@/constants'

async function EditProductService(formData) {
  const response = await fetch(`${URL_API_PDO}products.php`, {
    method: 'POST',
    body: formData,
  })
  const json = await response.json()
  return json
}

export default EditProductService
