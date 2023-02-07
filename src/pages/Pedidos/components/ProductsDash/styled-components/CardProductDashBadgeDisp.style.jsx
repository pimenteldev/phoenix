import styled from 'styled-components'

const CardProductDashBadgeDispContainer = styled.div`
  background-color: ${(props) =>
    props.productMinDisp >= 6 ? 'var(--pri)' : props.productMinDisp ? 'var(--warning)' : 'var(--danger)'};
  position: absolute;
  padding: 0.2rem;
  color: white;
  top: 0px;
  right: 0px;
  margin: 0;
  border-radius: 0 5px 0 5px;
  text-shadow: 0px 1px 0.08rem #000;

  & strong {
    font-size: 16px;
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
export default function CardProductDashBadgeDisp(props) {
  return (
    <CardProductDashBadgeDispContainer productMinDisp={props.productMinDisp}>
      Disponibles: <strong>{props.productMinDisp}</strong>
    </CardProductDashBadgeDispContainer>
  )
}
