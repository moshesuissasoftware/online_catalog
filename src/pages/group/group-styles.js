import { Link } from '@nobia/zeus-components/lib/router'
import styled, {
  theme,
  rem,
  prop,
  withTheme,
} from '@nobia/zeus-components/lib/styled'
import { Column, Container, Row } from '@nobia/zeus-components/lib/grid'

import NavCollapse from '../../components/collapse/Navcollapse'

const NavigationColumn = styled(Column).attrs({
  sm: 6,
  md: 4,
})`
  ${props => props.theme.media.max.sm`
    width: 100%;
    margin-top: ${prop('theme.categoryCard.gutter.mobile.top')};
    padding-left: ${prop('theme.grid.gutter')};
    padding-right: ${prop('theme.grid.gutter')};
    margin-bottom: 32px;
    :first-child {
      margin-top: 26px;
      flex: 0 0 100%;
    }
  `};
  ${props => props.theme.media.min.sm`
    margin-bottom: ${prop('theme.categoryCard.gutter.bottom')};
    padding-left: ${prop('theme.grid.gutter')};
    padding-right: ${prop('theme.grid.gutter')};
    margin-right: ${prop('theme.grid.gutter')};
    max-width: 100%;
    flex: 0 0 25%;
  `};
`

const StyledBottomColumn = styled(Column)`
  margin-top: 32px;
  padding: 0 12px;
  grid-column: span 3;
  ${props => props.theme.media.max.sm`
    grid-column: span 2;
  `};

  @media (max-width: 720px) {
    grid-column: span 1;
  }
  h2 {
    margin: 0 0 8px 0;
    font-size: 16px;
    font-family: ${withTheme('categoryCard.fontFamily')};
  }
  p {
    margin: 0;
  }
  ${props => props.theme.media.max.sm`
    margin-bottom: 40px;
  `};
`
const StyledCol = styled(Column)`
  margin-bottom: ${rem(32)};
  width: 100%;
  @media (max-width: 767px) {
    max-width: 100% !important;
  }
`
const StyledPreamble = styled.div`
  max-width: ${theme('header.maxWidth')};
  @media only screen and (max-width: 767px) {
    max-width: ${theme('header.mobile.maxWidth')};
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
    @media only screen and (max-width: 767px) {
      padding-right: ${rem(0)};
      margin-bottom: 0px;
    }
    @media only screen and (max-width: 450px) {
      font-size: ${theme('preamble.fontSizeMobil')};
      line-height: ${theme('preamble.lineHeightMobil')};
    }
  }
  & p > em {
    font-style: italic;
  }
`
const MenuItem = styled.li`
  width: 100%;
  list-style-type: none;
  text-decoration: none;
  padding: 8px 0;
  color: #122126;
  font-size: 16px;
  &:hover {
    color: #b1b1b1;
  }
`
const StyledContainer = styled(Container)`
  @media (min-width: 1044px) {
    width: ${theme('container.medium.width')};
  }
`
const StyledCollapse = styled(NavCollapse)``

const StyledLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  :first-of-type li {
    padding-top: ${rem(16)};
  }
  :last-of-type li {
    padding-bottom: 0;
  }
`

const GridRow = styled(Row)`
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: repeat(3, calc(100% / 3));
  max-width: 75%;
  ${props => props.theme.media.max.sm`
    margin: 0 auto;
    max-width: 100%;
    grid-template-columns: repeat(2, 50%);
  `};

  @media (max-width: 720px) {
    grid-template-columns: 100%;
    width: 100%;
  }
`

export {
  NavigationColumn,
  StyledBottomColumn,
  StyledCol,
  StyledLink,
  MenuItem,
  StyledCollapse,
  GridRow,
  StyledPreamble,
  StyledContainer,
}
