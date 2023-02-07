import React from 'react'
import ModalComponent from './styled-components/Modal.component'

function Modal(props) {
  return <ModalComponent>{props.children}</ModalComponent>
}

export default Modal
