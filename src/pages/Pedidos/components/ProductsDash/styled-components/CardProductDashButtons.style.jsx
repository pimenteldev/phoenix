import styled from 'styled-components'

const CardProductDashButtonsContainer = styled.div`
  position: absolute;
  padding: 0.5rem;
  width: 100%;
  text-align: center;
  top: 136px;
  display: flex;
  right: 0px;
  background-color: #ef233ca6;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;

  .buttons_flex_add_remove_card {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
  }

  .product_counter {
    width: 50px;
    height: 50px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    font-size: 20px;
    color: var(--white);
    text-shadow: rgb(0 0 0) 1px 1px 0px;
    font-family: 'montserratbold';
  }

  .buttons_add_card {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    color: var(--dark);
    background-color: var(--white);
    font-size: 19px;
    border: none;
    outline: none;
    transition: all 0.3s ease;
    cursor: pointer;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: center;
  }

  .buttons_add_card:hover {
    color: var(--white);
    background-color: var(--secondary);
  }

  .buttons_remove_card {
    width: 50px;
    height: 50px;
    color: var(--dark);
    background-color: var(--grey);
    font-size: 19px;
    border: none;
    outline: none;
    transition: all 0.3s ease;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: center;
  }

  .buttons_remove_card:hover {
    color: var(--white);
    background-color: var(--secondary);
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

export default function CardProductDashButton(props) {
  const {handleUnSelectProduct, productoFiltered, handleSelectProduct, product, minDisp} = props
  return (
    <CardProductDashButtonsContainer>
      <div className={'buttons_flex_add_remove_card'}>
        {productoFiltered[0]?.product_count >= 1 && (
          <button
            className={'buttons_remove_card'}
            onClick={() => handleUnSelectProduct(product)}
          >
            -
          </button>
        )}

        <span className={'product_counter'}>{productoFiltered[0]?.product_count || 0}</span>

        <button
          className={'buttons_add_card'}
          onClick={() => handleSelectProduct(product, minDisp)}
        >
          +
        </button>
      </div>
    </CardProductDashButtonsContainer>
  )
}
