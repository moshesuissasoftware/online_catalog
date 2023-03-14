import { compose, withProps } from '@nobia/zeus-components/lib/recompose'
import { graphql } from '@nobia/zeus-components/lib/apollo-hoc'
import { injectIntl } from '@nobia/zeus-components/lib/i18n'
import FeaturedProductsQuery from '../../graphql/FeaturedProductsQuery.graphql'
import withGraphqlHandler from '../graphql-handler'
import ProductGrid from './ProductGrid'

export default compose(
  injectIntl,
  graphql(FeaturedProductsQuery, {
    options: ({ filterPageSlug }) => ({
      variables: {
        slug: filterPageSlug,
        pageSize: 4,
      },
    }),
    props: ({ data }) => {
      if (!data.productFilterPage) {
        return { data }
      }
      const { products } = data.productFilterPage
      return {
        data: {
          productFilterPage: {
            ...data.productFilterPage,
            products: products.map(product => ({
              ...product,
              price: +product.discountPrice || +product.price,
              comparePrice: product.discountPrice ? +product.price : null,
            })),
          },
        },
      }
    },
  }),
  withGraphqlHandler,
  withProps(({ intl, data, tag }) => ({
    title: intl.formatMessage({
      id: 'app.product.similar_products',
    }),

    name: 'similar_products',
    products: data.productFilterPage.products
      .filter(p => !tag || p.tags.includes(tag))
      .slice(0, 4),
    lg: 3,
    showVariants: true,
  }))
)(ProductGrid)
