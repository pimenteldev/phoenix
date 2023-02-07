import styled from 'styled-components'

const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #050f1aab;
  margin: 0 auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999999;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 375px) {
  }

  @media only screen and (min-width: 600px) {
  }

  @media only screen and (min-width: 768px) {
  }

  @media only screen and (min-width: 992px) {
  }

  @media only screen and (min-width: 1200px) {
  }
`

const ModalBodyContainer = styled.div`
  position: absolute;
  background-color: #fff;
  width: max-content;
  height: auto;
  overflow: auto;
  z-index: 99999999999;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  text-align: center;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 2rem;

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: var(--primary);
  }

  @media screen and (max-width: 375px) {
  }

  @media only screen and (min-width: 600px) {
  }

  @media only screen and (min-width: 768px) {
  }

  @media only screen and (min-width: 992px) {
  }

  @media only screen and (min-width: 1200px) {
  }
`

export default function ModalComponent(props) {
  const {children} = props
  return (
    <ModalContainer>
      <ModalBodyContainer>{children}</ModalBodyContainer>
    </ModalContainer>
  )
}
