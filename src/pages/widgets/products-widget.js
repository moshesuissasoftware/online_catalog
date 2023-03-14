import React from 'react'
import PropTypes from 'prop-types'
import { compose, withProps } from '@nobia/zeus-components/lib/recompose'
import { withRouter } from '@nobia/zeus-components/lib/router'
import { graphql } from '@nobia/zeus-components/lib/apollo-hoc'
import { Container } from '@nobia/zeus-components/lib/grid'
import ErrorBoundary from '@nobia/zeus-components/lib/errorBoundary'
import queryString from '@nobia/zeus-components/lib/helpers/queryString'

import ProductCard from '../../components/product-card'
import { ProductRow, ProductColumn } from '../../components/product-grid'
import withGraphqlHandler from '../../components/graphql-handler'
import ProductsQuery from '../../graphql/ProductsQuery.graphql'

const ProductsWidget = ({
  data,
  showPrice,
  showVariants,
  showBadge,
  showWishlistButton,
}) => (
  <Container>
    <ErrorBoundary name="products">
      <ProductRow>
        {data.products.map(product => (
          <ProductColumn sm={6} md={4} lg={3} key={product.id}>
            <ProductCard
              product={product}
              showPrice={showPrice}
              showVariants={showVariants}
              showBadge={showBadge}
              showWishlistButton={showWishlistButton}
            />
          </ProductColumn>
        ))}
      </ProductRow>
    </ErrorBoundary>
  </Container>
)

ProductsWidget.propTypes = {
  data: PropTypes.shape({
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
      })
    ),
  }).isRequired,
  showPrice: PropTypes.bool.isRequired,
  showVariants: PropTypes.bool.isRequired,
  showBadge: PropTypes.bool.isRequired,
  showWishlistButton: PropTypes.bool.isRequired,
}

export default compose(
  withRouter,
  withProps(({ location }) => {
    const searchParams = queryString.parse(location.search)

    const searchIds = searchParams.ids

    const showPrice = 'showPrice' in searchParams
    const showVariants = 'showVariants' in searchParams
    const showBadge = 'showBadge' in searchParams
    const showWishlistButton = 'showWishlistButton' in searchParams

    return {
      ids: searchIds ? searchIds.split(',') : [],
      showPrice,
      showVariants,
      showBadge,
      showWishlistButton,
    }
  }),
  graphql(ProductsQuery, {
    options: ({ ids }) => ({
      variables: { ids },
    }),
    props: ({ data }) => {
      if (!data.products) {
        return { data }
      }
      const { products } = data
      const pricedProducts = products.map(product => ({
        ...product,
        price: +product.discountPrice || +product.price,
        comparePrice: product.discountPrice ? +product.price : null,
      }))

      return {
        data: {
          products: pricedProducts,
        },
      }
    },
  }),
  withGraphqlHandler
)(ProductsWidget)
