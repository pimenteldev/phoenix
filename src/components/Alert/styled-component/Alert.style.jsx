import styled from 'styled-components'

const AlertContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  padding: 1rem;
  text-align: center;
  font-weight: 700;
  background-color: ${(props) => (props.typeAlert === 'warning' ? 'var(--warning)' : 'var(--grey)')};
  color: ${(props) => (props.typeAlert === 'warning' ? 'var(--dark)' : 'var(--primary)')};

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
export default function AlertDiv(props) {
  return <AlertContainer typeAlert={props.typeAlert}>{props.children}</AlertContainer>
}
