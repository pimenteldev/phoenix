import React from 'react'
// import style from "./index.module.css";
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
import {Doughnut} from 'react-chartjs-2'

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
  return <>{props.data && <Doughnut data={props.data} />}</>
}

export default index
