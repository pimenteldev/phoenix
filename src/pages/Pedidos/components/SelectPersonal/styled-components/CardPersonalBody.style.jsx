import styled from 'styled-components'

const CardPersonalBodyContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 5px;
  background-color: var(--grey);
  position: relative;
  cursor: pointer;
  box-shadow: 0 2px 5px 0.1rem hsla(0, 0%, 0%, 0.212);
  transition: all 2s ease;

  :hover > figure > img {
    transform: scale(1.1);
  }

  :hover {
    box-shadow: 0 2px 5px 0.1rem hsla(0, 0%, 0%, 0.2);
  }

  .card_personal_alias {
    width: 100%;
    color: var(--white);
    background-color: var(--primary);
    text-align: center;
    font-size: 14px;
    padding: 1rem;
    font-family: 'montserratbold';
  }

  .card_personal_name {
    width: 100%;
    color: var(--dark);
    text-align: center;
    padding: 0.5rem;
    font-size: 14px;
  }

  .role {
    position: absolute;
    padding: 0.5rem;
    color: white;
    top: 160px;
    left: 10px;
    margin: 0;
    border-radius: 5px;
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
export default function CardPersonalBody(props) {
  return <CardPersonalBodyContainer>{props.children}</CardPersonalBodyContainer>
}
