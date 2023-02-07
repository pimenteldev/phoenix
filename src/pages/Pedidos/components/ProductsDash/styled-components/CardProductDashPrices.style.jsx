import styled from 'styled-components'

const CardProductDashPricesContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 14px;
  margin-bottom: 1rem;
  text-align: center;

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
const CardProductDashPricesContainerFlex = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-direction: column-reverse;

  .product_price_iva {
    width: 100%;
    background-color: white;
    color: var(--dark);
    padding: 0.5rem;
    font-family: 'montserratbold';
  }

  .product_price_dollar {
    width: 100%;
    background-color: var(--primary);
    color: white;
    padding: 0.5rem;
    text-align: center;
    font-family: 'montserratbold';
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

export default function CardProductDashPrices(props) {
  return (
    <CardProductDashPricesContainer>
      <CardProductDashPricesContainerFlex>
        <small>Precio + IVA</small>
        <span className={'product_price_iva'}>
          {props.productIvaPrice}
          Bs
        </span>
      </CardProductDashPricesContainerFlex>
      <CardProductDashPricesContainerFlex>
        <small>Precio Final</small>
        <span className={'product_price_dollar'}>{props.productDolarPrice}$</span>
      </CardProductDashPricesContainerFlex>
    </CardProductDashPricesContainer>
  )
}
