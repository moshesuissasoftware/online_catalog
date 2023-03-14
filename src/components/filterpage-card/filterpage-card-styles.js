import styled, { theme } from '@nobia/zeus-components/lib/styled'
import { Link } from '@nobia/zeus-components/lib/router'
import Image from '@nobia/zeus-components/lib/image'

const StyledImage = styled(Image).attrs({
  width: 294,
  height: 294,
})`
  display: block;
  border-radius: 4px 4px 0 0;
`
const StyledLink = styled(Link)`
  display: block;
  position: relative;
  text-decoration: none;
  color: #122126;
  background-color: ${theme('categoryCard.backgroundColor')};
  border-radius: 0 0 4px 4px;
  width: 100%;
  height: 100%;
`
const FilterPageDescription = styled.div`
  padding: 20px;
`
const FilterPageTitle = styled.h4`
  font-family: ${theme('categoryCard.fontFamily')};
  margin: 0 0 8px 0;
  font-size: ${theme('categoryCard.title.fontSize')};
  @media (max-width: 450px) {
    font-size: 14px;
  }
`
const FilterPagePreamble = styled.span`
  font-size: ${theme('categoryCard.preamble.fontSize')};
`

const DescriptionWrapper = styled.div`
  max-height: 140px;
  overflow: hidden;
  ${props => props.theme.media.max.sm`
    & > span {
      font-size: 14px!important;
    }
    `}
`

const ImageContainer = styled.div`
  z-index: 2;
  overflow: hidden;
`
const Glass = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  + div > img {
    -webkit-transform: none;
    -ms-transform: none;
    transform: none;
    -webkit-transition-property: all;
    -webkit-transition-duration: 0.3s;
    -webkit-transition-timing-function: ease;
    :hover {
      transform: scale(1.1);
    }
  }
`

const ContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}

const StyledFilterPageDescription = styled(FilterPageDescription)`
  flex-grow: 1;
  padding: 16px 16px 24px 16px;
  z-index: 3;
`

export {
  ContainerStyle,
  DescriptionWrapper,
  FilterPagePreamble,
  FilterPageTitle,
  Glass,
  ImageContainer,
  StyledFilterPageDescription,
  StyledImage,
  StyledLink,
}
