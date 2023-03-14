import React from 'react'
import PropTypes from 'prop-types'

import { compose, withProps } from '@nobia/zeus-components/lib/recompose'
import styled, { rem, prop } from '@nobia/zeus-components/lib/styled'
import { graphql } from '@nobia/zeus-components/lib/apollo-hoc'
import { withTranslation } from '@nobia/zeus-components/lib/i18n'
import { Headline } from '@nobia/zeus-components/lib/text'
import { Column } from '@nobia/zeus-components/lib/grid'
import Button from '@nobia/zeus-components/lib/buttons'
import ProductCard from '../product-card'

import ProductFilterPageQuery from '../../graphql/ProductFilterPageQuery.graphql'
import withGraphqlHandler from '../../components/graphql-handler'

const StyledColumn = styled(Column)`
  && {
    padding: 0 20px;
  }
`

const StyledHeadline = styled(Headline)`
  color: ${prop('theme.colors.gold')};
  text-align: center;
  margin-bottom: ${rem(40)};
`

const StyledButton = styled(Button)`
  margin-top: ${rem(15)};
`

const Label = withTranslation('app.nav')('span')

const FeaturedColumn = ({ products, onAdd, className }) => (
  <StyledColumn md={3} className={className}>
    <StyledHeadline>Liknande produkter</StyledHeadline>
    {products.map(product => (
      <ProductCard product={product} onClick={onAdd} key={product.id}>
        <StyledButton kind="inverted" size="small">
          <Label intlKey="compare">Compare</Label>
        </StyledButton>
      </ProductCard>
    ))}
  </StyledColumn>
)

FeaturedColumn.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onAdd: PropTypes.func.isRequired,
  className: PropTypes.string,
}

FeaturedColumn.defaultProps = {
  className: undefined,
}

export default compose(
  graphql(ProductFilterPageQuery, {
    options: ({ filterPage: slug }) => ({ variables: { slug } }),
    props: ({ data }) => {
      if (!data.productFilterPage) {
        return { data }
      }
      const { products } = data.productFilterPage
      const pricedProducts = products.map(product => ({
        ...product,
        price: +product.discountPrice || +product.price,
        comparePrice: product.discountPrice ? +product.price : null,
      }))

      return {
        data: {
          productFilterPage: {
            ...data.productFilterPage,
            products: pricedProducts,
          },
        },
      }
    },
  }),
  withGraphqlHandler,
  withProps(({ data, tag, exclude }) => ({
    products: data.productFilterPage
      ? data.productFilterPage.products
          .filter(
            p => (!tag || p.tags.includes(tag)) && !exclude.includes(p.id)
          )
          .slice(0, 4)
      : [],
  }))
)(FeaturedColumn)
