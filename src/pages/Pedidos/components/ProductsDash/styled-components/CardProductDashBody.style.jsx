import styled from 'styled-components'

const CardProductDashBodyContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 5px;
  background-color: var(--grey);
  position: relative;
  transition: all 0.5s ease;
  box-shadow: 0 2px 5px 0.1rem hsla(0, 0%, 0%, 0.212);

  :hover > figure > img {
    transform: scale(1.1);
  }

  :hover {
    box-shadow: 0 2px 5px 0.1rem hsla(0, 0%, 0%, 0.2);
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
export default function CardProductDashBody(props) {
  return <CardProductDashBodyContainer>{props.children}</CardProductDashBodyContainer>
}
