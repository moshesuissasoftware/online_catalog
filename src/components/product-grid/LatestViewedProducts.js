import { compose, withProps } from '@nobia/zeus-components/lib/recompose'
import { connect } from '@nobia/zeus-components/lib/redux'
import { injectIntl } from '@nobia/zeus-components/lib/i18n'
import ProductGrid from './ProductGrid'

const mapStateToProps = (state, props) => ({
  products:
    state.viewedProducts && state.viewedProducts.length > 0
      ? state.viewedProducts.filter(product => product.id !== props.exclude)
      : [],
  linkToProductPage: true,
})

export default compose(
  injectIntl,
  withProps(({ intl }) => ({
    title: intl.formatMessage({
      id: 'app.product.viewed_products',
    }),
    name: 'viewed_products',
  })),
  connect(mapStateToProps)
)(ProductGrid)
