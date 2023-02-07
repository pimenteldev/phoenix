import styled from 'styled-components'

const CardTableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  font-size: 18px;
  text-shadow: 1px 1px 0.2rem #2125294b;

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

export default function CardTable(props) {
  const {children, onClick} = props
  return <CardTableContainer onClick={onClick}>{children}</CardTableContainer>
}
