import { Link } from '@nobia/zeus-components/lib/router'
import { Paragraph } from '@nobia/zeus-components/lib/text'
import styled, { rem, theme, withProp } from '@nobia/zeus-components/lib/styled'
import { ProductImage } from '@nobia/zeus-components/lib/image'
import { asPrice, withTranslation } from '@nobia/zeus-components/lib/i18n'
import { tint } from '@nobia/zeus-components/lib/helpers/polished'
import { WishlistButton } from '../../components/wishlist'

const ImageWrapper = styled.div`
  margin: ${theme('grid.gutter')};
`

const ContentWrapper = styled.div`
  min-height: ${rem(70)};
  padding: 16px;
`
const StyledTitle = styled(Paragraph.withComponent('h2'))`
  margin: 0 0 ${rem(5)};
  font-weight: ${theme('productCard.fontWeight')};
  font-size: ${theme('productCard.fontSize')};
  text-transform: ${theme('productCard.textTransform')};
  line-height: ${theme('productCard.lineHeight')};
  font-family: ${theme('productCard.fontFamily')};
  /* Limit lineheight to 2 lines */
  max-height: calc(2 * 1.34em);
  overflow: hidden;

  @media (max-width: 550px) {
    font-size: ${theme('productCard.mobile.fontFamily')};
    max-height: calc(2 * 1.38em);
  }
`

const VariantsMessage = styled(Paragraph).attrs({ size: 'small' })`
  bottom: ${theme('grid.gutter')};
  margin: ${rem(10)} 0 ${rem(-5)};
  color: ${withProp('theme.colors.primary', tint(0.5))};
`

const Price = asPrice(styled.div`
  font-size: ${theme('categories.price.fontSize')};
  line-height: 1;
  font-weight: 500;
  color: ${theme('price.color')};
  margin: 16px 0 0 0;
  font-family: ${theme('productCard.fontFamily')};
`)

const StyledLink = styled(Link)`
  position: relative;
  display: block;
  border: 1px solid ${theme('colors.border')};
  text-decoration: none;
  color: ${theme('typography.link.color')};
  width: 100%;
  border-radius: 4px;
`

const StyledProductImage = styled(ProductImage)`
  transition: all 0.3s ease;
  @media (min-width: 575px) {
    :hover {
      img {
        max-height: 105%;
        max-width: 105%;
      }
    }
  }
`

const StyledWishlistButton = styled(WishlistButton)`
  margin-right: ${theme('wishListButton.marginRight')};
  margin-top: ${theme('wishListButton.marginTop')};
  background-color: ${theme('wishListButton.backgroundColor')};
  float: right;
  display: flex;
  z-index: 1;
  position: relative;
  padding-left: ${theme('wishListButton.paddingLeft')};
  border-radius: ${theme('wishListButton.borderRadius')};
  height: ${theme('wishListButton.height')};
  > svg {
    width: ${theme('wishListButton.iconSize')};
    margin-left: ${theme('wishListButton.marginLeft')};
  }
`

const Label = withTranslation('app.product')('span')

export {
  ImageWrapper,
  ContentWrapper,
  StyledTitle,
  VariantsMessage,
  Price,
  StyledLink,
  StyledProductImage,
  StyledWishlistButton,
  Label,
}
