import React, {useRef} from 'react'
import ReactToPrint from 'react-to-print'
import ComponentToPrint from './ComponentsToPrint'
import {FORMATO_FACTURA_CLIENTE} from '../../constants'
import style from './index.module.css'
import {BsFilePdf} from 'react-icons/bs'
import Button from '../Button'

function index(props) {
  const {data, format} = props
  const componentRef = useRef()
  return (
    <>
      <div className={style.buttons_actions}>
        <ReactToPrint
          trigger={() => (
            <Button
              btntype="PRIMARY"
              content="Generar PDF"
            >
              <BsFilePdf />
            </Button>
          )}
          content={() => componentRef.current}
        />
      </div>

      <div>
        <div
          className="page"
          ref={componentRef}
        >
          {format === FORMATO_FACTURA_CLIENTE && <ComponentToPrint data={data} />}
        </div>
      </div>
    </>
  )
}

export default index
