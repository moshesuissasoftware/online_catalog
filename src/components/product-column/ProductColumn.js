import React from 'react'
import PropTypes from 'prop-types'
import styled, { rem } from '@nobia/zeus-components/lib/styled'
import { withHandlers } from '@nobia/zeus-components/lib/recompose'
import { Column } from '@nobia/zeus-components/lib/grid'
import { Icon } from '@nobia/zeus-components/lib/icons'
import ProductCard from '../product-card'
import { WishlistButton } from '../wishlist'
import { FeatureList, BulletList } from '../product-details'

const StyledColumn = styled(Column)`
  position: relative;
`

const StyledProductCard = styled(ProductCard)`
  ${StyledColumn} & {
    margin-bottom: 0;
    border: none;
    text-align: center;
    > div:nth-child(2) {
      height: 8rem;
    }
  }
`

const Close = styled(Icon).attrs({
  type: 'close',
  role: 'button',
})`
  position: absolute;
  z-index: 2;
  padding: ${rem(20)};
  top: 0;
  right: 0;
  cursor: pointer;
`

const StyledFeatureList = styled(FeatureList)`
  > div {
    flex-wrap: wrap;
    > dt,
    dd {
      width: 100%;
      padding: 0 ${rem(10)};
    }
    > dd {
      margin-top: ${rem(8)};
      margin-bottom: ${rem(5)};
    }
  }
`

const StyledWishlistButton = styled(WishlistButton)`
  margin-top: ${rem(8)};
`

const StyledBulletList = styled(BulletList)`
  && {
    margin-left: ${rem(10)};
    margin-right: ${rem(10)};
    ${props => props.theme.media.max.sm`
      padding-left: 0;
      li {
        text-indent: 0;
      }
      svg {
        display: none;
      }
      font-size: ${rem(12)};
    `};
  }
`

const ProductColumn = ({ product, onDelete, className }) => (
  <StyledColumn className={className} size={6} md={3}>
    <Close onClick={onDelete} />
    <StyledProductCard
      product={product}
      showBadge={false}
      showWishlistButton={false}
    >
      <StyledWishlistButton small product={product} />
    </StyledProductCard>
    <StyledFeatureList
      showBlanks
      features={product.features}
      categoryId={product.filterPage.id}
    />
    <StyledBulletList bullets={product.bullets} />
  </StyledColumn>
)

ProductColumn.propTypes = {
  product: PropTypes.shape({
    filterPage: PropTypes.shape({
      id: PropTypes.shape({}),
    }),
    features: PropTypes.shape({}),
    bullets: PropTypes.shape({}),
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  className: PropTypes.string,
  features: PropTypes.shape({}).isRequired,
  filterPage: PropTypes.shape({
    id: PropTypes.shape({}),
  }).isRequired,
  bullets: PropTypes.shape({}).isRequired,
}

ProductColumn.defaultProps = {
  className: undefined,
}

export default withHandlers({
  onDelete: ({ onDelete, product }) => evt => {
    evt.preventDefault()
    evt.stopPropagation()
    onDelete(product)
  },
})(ProductColumn)
