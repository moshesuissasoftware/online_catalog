import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from '@nobia/zeus-components/lib/i18n'
import {
  compose,
  withHandlers,
  withProps,
} from '@nobia/zeus-components/lib/recompose'
import styled, { rem } from '@nobia/zeus-components/lib/styled'
import { graphql } from '@nobia/zeus-components/lib/apollo-hoc'
import { Container, Row, Column } from '@nobia/zeus-components/lib/grid'
import { Headline } from '@nobia/zeus-components/lib/text'
import {
  withGrouping,
  withSorting,
  FilterList,
  SortBox,
} from '@nobia/zeus-components/lib/filter'
import { tracker } from '@nobia/zeus-components/lib/tracking'
import Button from '@nobia/zeus-components/lib/buttons'
import ErrorBoundary from '@nobia/zeus-components/lib/errorBoundary'
import settings from '@nobia/zeus-components/lib/settings'

import { ProductRow, ProductColumn } from '../product-grid'
import ProductCard from '../product-card'
import Modal from './Modal'
import withGraphqlHandler from '../graphql-handler'
import { withDisplay } from '../product-details'
import { getCategoryFeature } from '../../utils'
import ProductFilterPageQuery from '../../graphql/ProductFilterPageQuery.graphql'
import withFilter from '../../utils/withFilter'

const TranslatedHeadline = withTranslation('app.modals.compare')(Headline)

const StyledContainer = styled(Container)`
  ${props => props.theme.media.max.sm`
    padding: 0;
  `};
`

const StyledProductCard = styled(props => <ProductCard {...props} />)`
  > div:nth-child(2) {
    height: 9rem;
  }
`

const StyledButton = withTranslation('app.product')(styled(Button)`
  display: block;
  margin: ${rem(12)} auto 0;
`)

const ProductPickerModal = ({
  data: { productFilterPage: filterPage },
  items,
  options,
  filter,
  updateFilter,
  sorting,
  setSorting,
  onAdd,
  display,
  group,
  ...props
}) => (
  <Modal {...props}>
    <StyledContainer>
      <Row>
        <Column>
          <TranslatedHeadline intlKey="title">
            Select product to compare with
          </TranslatedHeadline>
        </Column>
      </Row>
      <Row noGutters>
        {display('filters') && (
          <Column md="fluid">
            <FilterList
              options={options}
              activeFilter={filter}
              updateFilter={updateFilter}
            />
          </Column>
        )}
        {display('sorting') && (
          <Column md="auto">
            <SortBox
              select={setSorting}
              selected={sorting}
              options={getCategoryFeature(filterPage.id)('sorting')}
            />
          </Column>
        )}
      </Row>
      <ErrorBoundary name="products">
        <ProductRow>
          {items.map(product => (
            <ProductColumn key={product.id} md={4}>
              <StyledProductCard
                product={product}
                showWishlistButton={false}
                onClick={onAdd}
              >
                <StyledButton size="small" intlKey="select">
                  Select
                </StyledButton>
              </StyledProductCard>
            </ProductColumn>
          ))}
        </ProductRow>
      </ErrorBoundary>
    </StyledContainer>
  </Modal>
)

ProductPickerModal.propTypes = {
  data: PropTypes.shape({
    productFilterPage: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string,
          enabled: PropTypes.bool,
        })
      ),
    })
  ).isRequired,
  filter: PropTypes.shape({}).isRequired,
  updateFilter: PropTypes.func.isRequired,
  sorting: PropTypes.shape({
    key: PropTypes.string,
    enabled: PropTypes.bool,
    value: PropTypes.string,
    ascending: PropTypes.bool,
  }).isRequired,
  setSorting: PropTypes.func.isRequired,
  display: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  group: PropTypes.shape({}).isRequired,
}

export default compose(
  graphql(ProductFilterPageQuery, {
    options: ({ filterPage: slug, group }) => ({
      variables: { slug, group },
    }),
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
  withDisplay(({ data }) => data.productFilterPage.id),
  withFilter({
    items: ({ data }) => data.productFilterPage.products,
    filters: ({ data }) => {
      if (settings.filtersFromConfig) {
        const filtersFromConfig = getCategoryFeature(data.productFilterPage.id)(
          'filters'
        )

        if (filtersFromConfig) return filtersFromConfig
      }
      return data.productFilterPage.filterValues.map(filter => filter.filter)
    },
  }),
  withGrouping('master'),
  withProps(({ items, exclude }) => ({
    items: items.filter(item => !exclude.includes(item.id)),
  })),
  withSorting,
  withHandlers({
    updateFilter: ({ updateFilter }) => (key, value) => {
      tracker.push({
        event: 'filterEvent',
        filter: {
          key,
          value,
        },
      })
      updateFilter(key, value)
    },
  })
)(ProductPickerModal)
