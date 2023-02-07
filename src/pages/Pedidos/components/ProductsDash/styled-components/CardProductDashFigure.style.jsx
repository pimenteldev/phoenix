import styled from 'styled-components'

const CardProductDashFigureContainer = styled.figure`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 5px 5px 0 0;

  img {
    width: 100%;
    height: 100%;
    border-radius: 5px 5px 0 0;
    object-fit: cover;
    transition: all 0.25s ease;
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

export default function CardProductDashFigure(props) {
  const {photoProduct, idProduct} = props

  return (
    <CardProductDashFigureContainer>
      <img
        src={photoProduct}
        alt={idProduct}
        loading="lazy"
      />
    </CardProductDashFigureContainer>
  )
}
