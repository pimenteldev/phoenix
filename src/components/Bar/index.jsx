import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import React from 'react'
import {Bar} from 'react-chartjs-2'
import style from './index.module.css'

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
  return (
    <>
      {props.data && (
        <Bar
          data={props.data}
          options={props.options}
          className={style.linestyle}
        />
      )}
    </>
  )
}

export default index
