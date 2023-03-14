import React from 'react'
import PropTypes from 'prop-types'

import styled, { theme, rem } from '@nobia/zeus-components/lib/styled'
import { Row, Column } from '@nobia/zeus-components/lib/grid'
import ErrorBoundary from '@nobia/zeus-components/lib/errorBoundary'
import ProductCard from '../product-card'
import GridCarousel from '../image-carousel/GridCarousel'

export const ProductRow = styled(Row)`
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: calc(100% / 3) calc(100% / 3) calc(100% / 3);
  margin-left: -${theme('productGrid.marginLeft')};
  margin-right: -${theme('productGrid.marginRight')};
  @media (max-width: 1280px) {
    grid-template-columns: calc(100% / 3) calc(100% / 3) calc(100% / 3);
  }
  @media (max-width: 960px) {
    grid-template-columns: 50% 50%;
  }
  @media (max-width: 720px) {
    grid-template-columns: 100%;
  }
`

export const ProductColumn = styled(Column)`
  display: flex;
  margin: ${rem(10)} 0;
  padding: 0 16px;
  width: 100%;
  max-width: 100%;
  @media (max-width: 450px) {
    margin: ${rem(12)} 0;
  }
`
export const StyledHeadline = styled.h3`
  font-family: ${theme('categoryCard.fontFamily')};
  font-size: ${theme('styledHeadline.fontSize')};
  @media (max-width: 550px) {
    font-size: ${theme('styledHeadline.mobile.fontSize')};
  }
`

const ProductGrid = ({
  products,
  title,
  showBadge,
  skipLastSlug,
  linkToProductPage,
  showVariants,
  className,
  name,
}) => (
  <div className={className}>
    {title && (
      <Row>
        <Column>
          <StyledHeadline>{title}</StyledHeadline>
        </Column>
      </Row>
    )}

    <ErrorBoundary name={name}>
      <div
        style={{
          maxWidth: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <GridCarousel show={2}>
          {products &&
            products.map(
              product =>
                product &&
                product.filterPage && (
                  <ProductCard
                    key={product.id}
                    skipLastSlug={skipLastSlug}
                    product={product}
                    showBadge={showBadge}
                    showVariants={showVariants}
                    linkToProductPage={linkToProductPage}
                  />
                )
            )}
        </GridCarousel>
      </div>
    </ErrorBoundary>
  </div>
)

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  title: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  showBadge: PropTypes.bool,
  showVariants: PropTypes.bool,
  skipLastSlug: PropTypes.bool,
  linkToProductPage: PropTypes.bool,
}

ProductGrid.defaultProps = {
  title: undefined,
  name: 'products',
  className: undefined,
  showBadge: true,
  showVariants: false,
  sm: 6,
  md: 3,
  lg: 2,
  skipLastSlug: false,
  linkToProductPage: false,
}

export default ProductGrid
