import React from 'react'
import AlertDiv from './styled-component/Alert.style'

function Alert(props) {
  const {typeAlert, children} = props
  return <AlertDiv typeAlert={typeAlert}>{children}</AlertDiv>
}

export default Alert
