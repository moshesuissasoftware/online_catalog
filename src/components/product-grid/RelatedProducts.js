import { compose, withProps } from '@nobia/zeus-components/lib/recompose'
import { graphql } from '@nobia/zeus-components/lib/apollo-hoc'
import { injectIntl } from '@nobia/zeus-components/lib/i18n'
import ProductsQuery from '../../graphql/ProductsQuery.graphql'
import withGraphqlHandler from '../graphql-handler'
import ProductGrid from './ProductGrid'

const MAX_RELATED_PRODUCT_COUNT = 3

export default compose(
  injectIntl,

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
  withGraphqlHandler,
  withProps(({ intl, data }) => ({
    title: intl.formatMessage({
      id: 'app.product.related_products',
    }),
    name: 'related_products',
    products: data.products.splice(0, MAX_RELATED_PRODUCT_COUNT),
    lg: 3,
    showVariants: false,
    showBadge: true,
    linkToProductPage: true,
  }))
)(ProductGrid)
