import styled from 'styled-components'

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  @media screen and (max-width: 375px) {
    .content_body {
      width: 100%;
      margin-left: 0px;
    }
  }

  @media only screen and (min-width: 600px) {
    .content_body {
      width: 100%;
      margin-left: 0px;
    }
  }

  @media only screen and (min-width: 768px) {
    .content_body {
      width: calc(100% - 134px);
      margin-left: 134px;
    }
  }

  @media only screen and (min-width: 992px) {
  }

  @media only screen and (min-width: 1200px) {
  }
`

export default function MainContainer(props) {
  return <MainWrapper classname="content_body">{props.children}</MainWrapper>
}
