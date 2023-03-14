import { Link } from '@nobia/zeus-components/lib/router'
import styled, { theme, prop, rem } from '@nobia/zeus-components/lib/styled'
import LoadingIndicator from '@nobia/zeus-components/lib/loadingIndicator'
import { Row, Column, Container } from '@nobia/zeus-components/lib/grid'

import ProductCard from '../../components/product-card'

const StyledRow = styled(Row).attrs({})`
  margin-bottom: ${rem(30)};
`
const StyledLoader = styled(LoadingIndicator)`
  margin-top: ${rem(20)};
`
const LoaderWrapper = styled.span`
  height: 200px;
  margin: 0 auto !important;
`
const StyledLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  font-size: 14px !important;
  :first-child li {
    padding-top: 16px;
  }
  :last-child li {
    padding-bottom: 0;
  }
`
const StyledPreambleRow = styled(Row)`
  margin: 0;
  @media only screen and (max-width: 767px) {
    margin: 0 2px 20px 2px;
    padding-bottom: 20px;
  }
`
const StyledContainer = styled(Container)`
  @media (min-width: 1044px) {
    width: ${theme('container.medium.width')};
  }
`
const StyledPreamble = styled.div`
  max-width: ${theme('header.maxWidth')};
  @media only screen and (max-width: 767px) {
    max-width: ${theme('header.mobile.maxWidth')};
    padding-right: ${rem(0)};
    margin-bottom: 0px;
  }
  & > p {
    padding-right: ${prop('theme.preamble.paddingRight')};
    text-align: ${prop('theme.preamble.textAlign')};
    font-family: ${prop('theme.preamble.fontFamily')};
    font-size: ${prop('theme.preamble.fontSize')};
    font-weight: ${prop('theme.preamble.fontWeight')};
    line-height: 1.5;
    margin-bottom: 30px;
    margin-top: 0px;
    color: ${prop('theme.preamble.color')};

    @media only screen and (max-width: 770px) {
      font-size: ${theme('preamble.fontSizeMobil')};
      line-height: ${theme('preamble.lineHeightMobil')};
      padding-right: 0px;
    }
  }
  & p > em {
    font-style: italic;
  }
`
const MenuItem = styled.li`
  list-style-type: none;
  text-decoration: none;
  padding: 8px 0;
  color: #122126;
  font-size: 16px;
  &:hover {
    color: #b1b1b1;
  }
  @media (min-width: 700px) and (max-width: 840px) {
    font-size: 14px;
  }
`

const ProdCard = styled(ProductCard)`
  min-height: 345px;
`

const StyledColumn = styled(Column)`
  padding: 0 16px;
`

const SortByContainer = styled(StyledColumn)`
  ${(props) => props.theme.media.max.sm`
    display: none;
  `};
`

const Filters = styled.div``

const BottomText = styled.div`
  margin-top: 48px;
  p {
    font-size: 14px;
    font-weight: 300;
    line-height: 20px;
    margin: 0;
  }
  ${(props) => props.theme.media.max.sm`
    padding: 0 16px;
    margin-top: 40px;
  `};
`

export {
  StyledRow,
  StyledLoader,
  LoaderWrapper,
  StyledLink,
  MenuItem,
  ProdCard,
  StyledColumn,
  SortByContainer,
  Filters,
  BottomText,
  StyledPreamble,
  StyledPreambleRow,
  StyledContainer,
}
