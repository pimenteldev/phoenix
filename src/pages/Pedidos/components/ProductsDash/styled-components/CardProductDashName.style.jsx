import styled from 'styled-components'

const CardProductDashNameContainer = styled.div`
  width: 100%;
  color: var(--grey);
  background-color: var(--primary);
  text-align: center;
  font-size: 14px;
  font-family: 'montserratbold';
  padding: 0.5rem;

  &:hover {
    color: white;
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
export default function CardProductDashName(props) {
  return <CardProductDashNameContainer>{props.productName}</CardProductDashNameContainer>
}
