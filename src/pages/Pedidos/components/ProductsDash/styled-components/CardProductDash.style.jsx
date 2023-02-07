import styled from 'styled-components'

const CardProductContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

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

export default function CardProductDash(props) {
  const {children, onClick} = props
  return <CardProductContainer onClick={onClick}>{children}</CardProductContainer>
}
