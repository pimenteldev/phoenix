import React from 'react'
import style from './index.module.css'
import Chart from '@/components/Chart'
import Card from '@/components/Card/Card'
import Doughnut from '@/components/Doughnut'
import PolarArea from '@/components/PolarArea'
import Line from '@/components/Line'
import Bar from '@/components/Bar'
import useInicio from './hooks/useInicio.hook'

function Inicio() {
  const {dataDoughnut, dataPolarArea, dataLine, dataBar, options} = useInicio()

  return (
    <div className={'content_body'}>
      <div className={style.content_init_text}>
        <h2>Bienvenido</h2>
        <h3>controla y administra tu negocio desde aquí</h3>
      </div>
      <div className={style.content_init}>
        <Card title="Facturación últimos 7 Dias">
          <Chart />
        </Card>

        {/* <div className={style.content_init_graph}>
          <Card title="Facturación últimos 5 meses">
            <Doughnut
              options={options}
              data={dataDoughnut}
            />
          </Card>

          <Card title="Facturación del Mes por Mesonero">
            <PolarArea
              options={options}
              data={dataPolarArea}
            />
          </Card>

          <Card title="Ventas últimos 5 meses">
            <Line
              options={options}
              data={dataLine}
            />
          </Card>
          <Card title="Facturación del Mes por Mesonero">
            <Bar
              options={options}
              data={dataBar}
            />
          </Card>
        </div> */}
      </div>
    </div>
  )
}

export default Inicio
