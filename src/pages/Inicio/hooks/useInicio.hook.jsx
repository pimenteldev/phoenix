import {useState, useEffect, useCallback} from 'react'
import {MESES} from '@/constants'
import getDataChart from '../services/getDataChart.service'

const useInicio = () => {
  const [dataDoughnut, setDataDoughnut] = useState({
    labels: ['Ventas Facturadas'],
    datasets: [
      {
        label: 'Ventas Facturadas',
        data: [0],
        backgroundColor: ['rgba(255, 99, 132, 0.8)'],
        borderColor: ['rgba(255, 99, 132, 0.2)'],
        borderWidth: 1,
      },
    ],
  })

  const [dataPolarArea, setDataPolarArea] = useState({
    labels: ['Sin Datos'],
    datasets: [0],
  })

  const [dataLine, setDataLine] = useState({
    labels: ['Sin Datos'],
    datasets: [0],
  })

  const [dataBar, setDataBar] = useState({
    labels: ['Sin Datos'],
    datasets: [0],
  })

  const fetchDataChars = useCallback(() => {
    getDataChart('chartsDoughnut')
      .then((json) => {
        setDataDoughnut({
          labels: [
            MESES[Object.values(json)[0].mes - 1],
            MESES[Object.values(json)[1].mes - 1],
            MESES[Object.values(json)[2].mes - 1],
            MESES[Object.values(json)[3].mes - 1],
            MESES[Object.values(json)[4].mes - 1],
          ],
          datasets: [
            {
              label: 'Ventas Facturadas',
              data: [
                Object.values(json)[0].ventas_facturadas,
                Object.values(json)[1].ventas_facturadas,
                Object.values(json)[2].ventas_facturadas,
                Object.values(json)[3].ventas_facturadas,
                Object.values(json)[4].ventas_facturadas,
              ],
              backgroundColor: [
                'rgba(239, 36, 60,  0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderWidth: 1,
            },
          ],
        })
        setDataLine({
          labels: [
            MESES[Object.values(json)[0].mes - 1],
            MESES[Object.values(json)[1].mes - 1],
            MESES[Object.values(json)[2].mes - 1],
            MESES[Object.values(json)[3].mes - 1],
            MESES[Object.values(json)[4].mes - 1],
          ],
          datasets: [
            {
              label: 'Ventas Facturadas $',
              data: [
                Object.values(json)[0].total.toFixed(2),
                Object.values(json)[1].total.toFixed(2),
                Object.values(json)[2].total.toFixed(2),
                Object.values(json)[3].total.toFixed(2),
                Object.values(json)[4].total.toFixed(2),
              ],
              fill: true,
              borderColor: 'rgba(239, 36, 60, 0.2)',
              backgroundColor: 'rgba(239, 36, 60, 0.8)',
            },
          ],
        })
      })
      .catch((e) => console.log(e))

    getDataChart('chartsPolar')
      .then((json) => {
        setDataPolarArea({
          labels: Object.keys(json).map((key, index) => `${key} - ${Object.values(json)[index].name}`),
          datasets: [
            {
              label: 'Ventas Facturadas en $',
              data: Object.keys(json).map((key, index) => `${parseFloat(Object.values(json)[index].total).toFixed(2)}`),
              backgroundColor: [
                'rgba(239, 36, 60, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderWidth: 1,
            },
          ],
        })
        setDataBar({
          labels: Object.keys(json).map((key, index) => Object.values(json)[index].name),
          datasets: [
            {
              label: 'Facturación por Mesonero $',
              data: Object.keys(json).map((key, index) => `${parseFloat(Object.values(json)[index].total).toFixed(2)}`),
              backgroundColor: [
                'rgba(239, 36, 60, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
              ],
              borderColor: [
                'rgba(239, 36, 60, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderWidth: 1,
            },
          ],
        })
      })
      .catch((e) => console.log(e))
  })

  useEffect(() => {
    setTimeout(() => {
      fetchDataChars()
    }, 1000)
  }, [])

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    fill: true,
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }

  return {
    dataDoughnut,
    dataPolarArea,
    dataLine,
    dataBar,
    options,
  }
}

export default useInicio
