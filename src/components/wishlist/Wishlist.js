import React from 'react'
import PropTypes from 'prop-types'
import styled, { prop } from '@nobia/zeus-components/lib/styled'
import ProductCard from '../product-card'

const ScrollWrapper = styled.div`
  width: 100%;
  margin: ${prop('theme.grid.gutter')} 0;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  ${props => props.theme.media.min.md`
    flex-wrap: nowrap;
  `};
`

const StyledProductCard = styled(props => <ProductCard {...props} />)`
  width: calc(100% - 40px);
  margin-bottom: ${prop('theme.grid.gutter')};
  ${props => props.theme.media.min.xs`
    width: calc(50% - 40px);
  `}
  ${props => props.theme.media.min.md`
    flex-shrink: 0;
    flex-basis: 175px;
    width: auto;
  `};
`

const Spacer = styled.div`
  width: 1px;
  flex: 0 0 auto;
`

const Wishlist = ({ wishlist }) => (
  <ScrollWrapper data-cy="Wishlist">
    {wishlist.map(product => (
      <StyledProductCard key={product.id} product={product} />
    ))}
    <Spacer />
  </ScrollWrapper>
)

Wishlist.propTypes = {
  wishlist: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

export default Wishlist
