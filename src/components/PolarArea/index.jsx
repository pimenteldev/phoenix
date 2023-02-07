import React from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Title,
  Legend,
  ArcElement,
  LinearScale,
  BarElement,
} from 'chart.js'
import {PolarArea} from 'react-chartjs-2'

ChartJS.register(
  RadialLinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Title,
  Legend,
  ArcElement,
  LinearScale,
  BarElement
)

function index(props) {
  return <>{props.data && <PolarArea data={props.data} />}</>
}

export default index
