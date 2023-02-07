import styled from 'styled-components'

const CardTableFigureContainer = styled.figure`
  width: 100%;
  height: 125px;
  overflow: hidden;
  border-radius: 5px;
  position: relative;
  transition: all 0.5s ease;

  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    object-fit: cover;
    transition: all 0.25s ease;
    opacity: 0.2;
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

const CardTableText = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 18px;
  font-family: 'montserratbold';
  text-shadow: 1px 1px 0px #212529a4;

  & small {
    font-size: 14px;
    color: var(--grey);
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

export default function CardTableFigure(props) {
  const {tableName, personal} = props
  return (
    <>
      <CardTableFigureContainer>
        <img
          src="./mesa.jpg"
          alt="mesa imagen"
          className={'style.card_mesa_img'}
          loading="lazy"
        />
      </CardTableFigureContainer>
      <CardTableText>
        {tableName}
        <small>{personal}</small>
      </CardTableText>
    </>
  )
}
