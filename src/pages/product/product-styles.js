import styled, { rem, theme } from '@nobia/zeus-components/lib/styled'
import { PageTitle, Paragraph, Preamble } from '@nobia/zeus-components/lib/text'
import { Column, Container } from '@nobia/zeus-components/lib/grid'
import { Price } from '../../components/product-details'
import { WishlistButton } from '../../components/wishlist'
import CheckmarkList from '../../components/product-details/CheckmarkList'

const StyledContainer = styled(Container)`
  margin-bottom: ${rem(30)};
  @media (min-width: 1044px) {
    width: ${theme('container.medium.width')};
  }
`

const Subtitle = styled(Paragraph)`
  margin-top: ${theme('productCard.code.marginTop')};
  margin-bottom: ${theme('productCard.code.marginBottom')};
  font-size: ${theme('productCard.code.fontSize')};
  line-height: ${theme('productCard.code.lineHeight')};
  color: ${theme('productCard.code.color')};
  font-weight: ${theme('productCard.code.fontWeight')};
  ${props => props.theme.media.max.sm`
    font-size: ${theme('productCard.code.mobile.fontSize')};
  `};
`

const StyledTitle = styled(PageTitle)`
  font-family: ${theme('productCard.title.fontFamily')};
  margin-top: ${theme('productCard.title.marginTop')};
  margin-bottom: ${theme('productCard.title.marginBottom')};
  font-size: ${theme('typography.pageTitle.fontSize')};
  word-break: break-word;
  color: ${theme('typography.pageTitle.color')};
  text-transform: none;
  line-height: ${theme('typography.pageTitle.lineHeight')};
  order: ${theme('productCard.title.order')};
  width: calc(100% - 50px);
  ${props => props.theme.media.max.sm`
    font-size: ${theme('typography.pageTitle.mobile.fontSize')};
    line-height: ${theme('typography.pageTitle.mobile.lineHeight')};
    margin-top: ${theme('productCard.title.mobile.marginTop')};
    margin-bottom: ${theme('productCard.title.mobile.marginBottom')};
  `};
`

const StyledPrice = styled(Price)`
  margin-right: ${theme('productCard.price.marginRight')};
  margin-bottom: ${theme('productCard.price.marginBottom')};
  margin-top: ${theme('productCard.price.marginTop')};
  order: ${theme('productCard.title.order')};
  font-size: ${theme('productCard.price.fontSize')};
  font-family: 'Campton';
  ${props => props.theme.media.max.sm`
    font-size: ${theme('productCard.price.mobile.fontSize')};
  `};
`

const StyledBullets = styled(CheckmarkList)`
  order: ${theme('productCard.bullets.order')};
  margin-top: ${theme('productCard.bullets.marginTop')};
  margin-bottom: ${theme('productCard.bullets.marginBottom')};
  & > li {
    margin-bottom: 8px;
  }
  & > li:last-child {
    margin-bottom: 0;
  }
  ${props => props.theme.media.max.sm`
    font-size: 14px;
  `};
`

const StyledPreamble = styled(Preamble)`
  margin: ${rem(15)} 0;
  font-size: ${theme('paragraph.fontSize')};
  font-family: ${theme('paragraph.fontFamily')};
  order: ${theme('productCard.preamble.order')};
  margin-top: ${theme('productCard.preamble.marginTop')};
  margin-bottom: ${theme('productCard.preamble.marginBottom')};
  font-weight: 400;
  ${props => props.theme.media.max.sm`
    font-size: 14px;
  `};
`

const StyledWishlistButton = styled(WishlistButton)`
  width: 10%;
  text-align: center;
  float: right;
  padding-left: ${rem(10)};
  padding-top: ${rem(10)};
  border-radius: 50%;
  color: #000;
  width: 40px;
  &::before {
    color: #000;
    border-radius: 50%;
    width: ${rem(50)};
    height: ${rem(50)};
    background: #eee;
    border-color: transparent;
  }
  position: absolute;
  right: 0;
  ${props => props.theme.media.max.sm`
    padding-left: 0;
    &::before {
      width: ${rem(32)};
      height: ${rem(32)};
    }
    svg {
      bottom: ${rem(2)};
      left: ${rem(7)};
      height: ${rem(20)};
      width: ${rem(20)};
    }
  `};
`

const Divider = styled.div`
  width: 100%;
  margin: ${rem(10)} 0 ${rem(10)};
`

const InfoBookning = styled.div`
  background-color: ${theme('background.backgroundColor')};
  padding: ${rem(20)};
  border-radius: 4px;
  margin: ${theme('productCard.infoBooking.margin')};
  order: ${theme('productCard.preamble.order')};
  ${props => props.theme.media.max.sm`
    padding: ${rem(16)};
  `};
`

const InfoBookningTitle = styled.h4`
  font-family: ${theme('categoryCard.fontFamily')};
  margin: 0 0 8px 0;
  ${props => props.theme.media.min.sm`
    font-size: 17.5px;
  `};
`

const SidePanelButton = styled.button`
  font-size: 16px;
  margin: 8px 0;
  padding: 16px;
  border: 1px solid #e1e2e3;
  border-radius: 4px;
  height: 54px;
  cursor: pointer;
  width: 100%;
  order: ${theme('productCard.preamble.order')};
  & > span {
    color: #000;
    float: left;
  }
`

const StyledFlexColumn = styled(Column)`
  display: flex;
  flex-direction: column;
  ${props => props.theme.media.max.sm`
    margin-top: ${theme('productCard.column.mobile.marginTop')};
  `};
`

const InfoBookningPreamble = styled(Paragraph)`
  margin-bottom: 24px;
  ${props => props.theme.media.max.sm`
    font-size: 14px;
    margin-bottom: 16px;
  `};
`

const InfoBookningButton = styled.a`
  font-size: 16px;
  border-radius: 4px;
  background-color: #122126;
  padding: 13.5px;
  font-weight: 500;
  color: #fff;
  width: 100%;
  text-decoration: none;
  display: block;
  text-align: center;
  ${props => props.theme.media.max.sm`
    height: 48px;
    font-size: 14px;
  `};
`

const StyledColumn = styled(Column)`
  ${props => props.theme.media.max.sm`
    > div:first-of-type {
      border: none;
      border-radius: 0;
    }
  `};
`
const StyledFlexColumnProdInfo = styled(StyledColumn)``

export {
  StyledContainer,
  Subtitle,
  StyledTitle,
  StyledPrice,
  StyledBullets,
  StyledPreamble,
  StyledWishlistButton,
  Divider,
  InfoBookning,
  InfoBookningTitle,
  SidePanelButton,
  StyledFlexColumn,
  InfoBookningPreamble,
  InfoBookningButton,
  StyledColumn,
  StyledFlexColumnProdInfo,
}
