import PropTypes from 'prop-types'
import React from 'react'
import BulletList from '../product-details/BulletList'
import { withDisplay } from '../product-details'
import VariantList from './VariantList'
import {
  ImageWrapper,
  ContentWrapper,
  StyledTitle,
  VariantsMessage,
  Price,
  StyledLink,
  StyledProductImage,
  StyledWishlistButton,
  Label,
} from './product-card-styles'

const getVariants = (key, variants) => {
  const variant = variants.find(({ attribute }) => attribute === key)
  return variant ? variant.products : undefined
}

const getPathBase = (location, skipLastSlug) => {
  let pathBase = location.pathname
  const paths = location.pathname.split('/')

  if (paths[paths.length - 1] === '') {
    paths.pop()
  }

  if (skipLastSlug) {
    paths.pop()
  }

  if (paths[paths.length - 1].indexOf('---') > -1) {
    paths.pop()
  }

  pathBase = paths.join('/')

  return pathBase
}

const ProductCard = ({
  product,
  className,
  showPrice,
  showVariants,
  showBadge,
  skipLastSlug,
  linkToProductPage,
  display,
  onClick,
  children,
}) => {
  const productPath = linkToProductPage
    ? `/opc/link/${product.id}`
    : `${getPathBase(location, skipLastSlug)}/${product.slug}`
  return (
    <StyledLink
      className={className}
      to={`${productPath}`}
      onClick={
        onClick ? (e) => e.preventDefault() || onClick(product) : undefined
      }
      data-cy="ProductCard"
    >
      <ImageWrapper>
        <StyledWishlistButton product={product} block />
        <StyledProductImage
          src={product.images[0] || ''}
          width={480}
          height={480}
          tags={showBadge ? product.tags : []}
          alt={product.name}
          title={product.name}
        />
      </ImageWrapper>
      <ContentWrapper>
        <StyledTitle>{product.name}</StyledTitle>
        {product.price && showPrice && display('price') ? (
          <Price>{product.price}</Price>
        ) : null}
        {display('bullets') && product.bullets && (
          <BulletList
            bullets={product.bullets.slice(0, 3)}
            className="bullet-tiny"
          />
        )}
        {product.variant &&
          showVariants &&
          display('variants') &&
          (product.variant === 'color' ? (
            <VariantList
              variants={getVariants('color', product.variants)}
              attribute="color"
            />
          ) : (
            <VariantsMessage size="small">
              <Label intlKey="has_variants" />
            </VariantsMessage>
          ))}
        {children}
      </ContentWrapper>
    </StyledLink>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    headline: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number,
    variant: PropTypes.string,
    variants: PropTypes.arrayOf(PropTypes.shape([])),
    slug: PropTypes.string,
    filterPage: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }),
    bullets: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  display: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  showBadge: PropTypes.bool,
  showPrice: PropTypes.bool,
  showVariants: PropTypes.bool,
  onClick: PropTypes.func,
  skipLastSlug: PropTypes.bool,
  linkToProductPage: PropTypes.bool,
}

ProductCard.defaultProps = {
  children: undefined,
  onSelect: () => null,
  showBadge: true,
  showPrice: true,
  showVariants: false,
  className: '',
  onClick: undefined,
  skipLastSlug: false,
  linkToProductPage: false,
}

export default withDisplay(({ product }) => product.filterPage.id)(ProductCard)
