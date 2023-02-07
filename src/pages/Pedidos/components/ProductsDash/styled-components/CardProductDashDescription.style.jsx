import styled from 'styled-components'

const CardProductDashDescriptionContainer = styled.div`
  width: 100%;
  min-height: 100px;
  color: var(--dark);
  text-align: center;
  text-overflow: ellipsis;
  font-size: 14px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;

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
export default function CardProductDashDescription(props) {
  return <CardProductDashDescriptionContainer>{props.productDescription}</CardProductDashDescriptionContainer>
}
