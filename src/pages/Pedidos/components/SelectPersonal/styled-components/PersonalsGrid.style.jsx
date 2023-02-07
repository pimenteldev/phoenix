import styled from 'styled-components'

const PersonalsGridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (max-width: 375px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media only screen and (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(6, 1fr);
  }
`

export default function PersonalsGrid(props) {
  return <PersonalsGridContainer>{props.children}</PersonalsGridContainer>
}
