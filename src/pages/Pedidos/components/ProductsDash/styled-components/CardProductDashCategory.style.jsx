import styled from 'styled-components'

const CardProductDashCategoryContainer = styled.div`
  width: 100%;
  color: var(--grey);
  background-color: ${(props) => props.productCategoryColor};
  text-align: center;
  font-size: 12px;
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
export default function CardProductDashCategory(props) {
  return (
    <CardProductDashCategoryContainer productCategoryColor={props.productCategoryColor}>
      {props.productCategory}
    </CardProductDashCategoryContainer>
  )
}
