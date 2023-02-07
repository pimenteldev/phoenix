import {URL_API_PDO} from '@/constants'

async function getDataChartDoughnut(chartType) {
  const response = await fetch(`${URL_API_PDO}charts.php?functions=${chartType}`, {
    method: 'GET',
  })

  return await response.json()
}

export default getDataChartDoughnut
