import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import settings from '@nobia/zeus-components/lib/settings'
import {
  compose,
  withProps,
  withState,
  withHandlers,
} from '@nobia/zeus-components/lib/recompose'
import { injectIntl } from '@nobia/zeus-components/lib/i18n'
import styled, { prop, theme } from '@nobia/zeus-components/lib/styled'
import { withHelmet, withRouter } from '@nobia/zeus-components/lib/router'
import { graphql } from '@nobia/zeus-components/lib/apollo-hoc'
import { tracker } from '@nobia/zeus-components/lib/tracking'
import { Overlay, LightboxOverlay } from '@nobia/zeus-components/lib/overlay'
import { Container, Row, Column } from '@nobia/zeus-components/lib/grid'
import { PageTitle } from '@nobia/zeus-components/lib/text'
import getImage from '@nobia/zeus-components/lib/image/getCloudinaryImage'
import Header from '../../components/header'
import { toTitleCase } from '../../utils'
import withGraphqlHandler from '../../components/graphql-handler'
import withNotFound from '../../components/not-found'
import ProductQuery from '../../graphql/ProductQuery.graphql'
import { ProductColumn, AddColumn } from '../../components/product-column'
import { ProductPickerModal } from '../../components/modals'

const StyledTitle = styled(PageTitle)`
  margin-top: 0.5em;
  color: ${theme('colors.compareHeader')};
`

const StyledRow = styled(Row)`
  padding-left: -${theme('grid.gutter')};
  padding-right: -${theme('grid.gutter')};
  > :nth-child(3) {
    display: none;
  }
  ${props => props.theme.media.min.md`
    > :nth-child(3) {
      display: initial;
    }
    margin-left: 0;
    margin-right: 0;
  `};
`

const StyledProductColumn = styled(ProductColumn)`
  border: 1px solid ${prop('theme.colors.border')};

  & + & {
    border-left: none;
  }
`

const StyledAddColumn = styled(AddColumn)``

const EmptyColumn = styled(Column)``

const dummyKeys = ['a', 'b', 'c', 'd']
const ComparePage = ({
  data,
  slots,
  breadcrumbs,
  comparedProducts,
  addProduct,
  removeProduct,
  filterPageSlug,
  modalOpen,
  closeModal,
  openModal,
  getString,
}) => (
  <Container>
    <Header breadcrumbs={breadcrumbs} />
    <Row>
      <Column>
        <StyledTitle>
          {toTitleCase(
            getString('compare', 'compare', {
              filterPage: data.product.filterPage.name,
            }),
            settings.lang
          )}
        </StyledTitle>
      </Column>
    </Row>
    <StyledRow noGutters>
      {slots.map((product, i) => (
        <Fragment key={product ? product.id : dummyKeys[i]}>
          {product && (
            <StyledProductColumn product={product} onDelete={removeProduct} />
          )}
          {!product && i === comparedProducts.length && (
            <StyledAddColumn onAdd={openModal} />
          )}
          {!product && i !== comparedProducts.length && <EmptyColumn md={3} />}
        </Fragment>
      ))}
    </StyledRow>
    <Overlay
      open={modalOpen}
      handleChange={state => !state.open && closeModal()}
      render={props => (
        <LightboxOverlay {...props}>
          <ProductPickerModal
            {...props}
            onAdd={addProduct}
            filterPage={filterPageSlug}
            exclude={comparedProducts.map(p => p.id)}
            group={data.productGroup.slug}
          />
        </LightboxOverlay>
      )}
    />
  </Container>
)

ComparePage.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ).isRequired,
  slots: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  comparedProducts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  addProduct: PropTypes.func.isRequired,
  removeProduct: PropTypes.func.isRequired,
  filterPageSlug: PropTypes.string.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  getString: PropTypes.func.isRequired,
  data: PropTypes.shape({
    product: PropTypes.shape({
      filterPage: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }),
      productGroup: PropTypes.shape({
        slug: PropTypes.shape({}),
      }),
    }),
    productGroup: PropTypes.shape({
      slug: PropTypes.shape({}),
    }).isRequired,
  }).isRequired,
  productGroup: PropTypes.shape({
    slug: PropTypes.shape({}),
  }).isRequired,
}

export default compose(
  injectIntl,
  withRouter,
  withProps(({ match }) => ({
    group: match.params.group,
    filterPageSlug: match.params.filterPage,
    slug: match.params.product,
  })),
  graphql(ProductQuery, {
    options: ({ filterPageSlug, slug, group }) => ({
      variables: {
        filterPageSlug,
        slug,
        group,
      },
    }),
    props: ({ data }) => {
      if (!data.product) {
        return { data }
      }
      const { product } = data
      return {
        data: {
          ...data,
          product: {
            ...product,
            price: +product.discountPrice || +product.price,
            comparePrice: product.discountPrice ? +product.price : null,
          },
        },
      }
    },
  }),
  withGraphqlHandler,
  withNotFound(({ data }) => !data.product),
  withState(
    'comparedProducts',
    'setComparedProducts',
    ({ data: { product } }) => [product]
  ),
  withState('modalOpen', 'setModalOpen', false),
  withProps(({ comparedProducts }) => ({
    slots: [0, 1, 2, 3].map(i => comparedProducts[i]),
  })),
  withHandlers({
    addProduct: ({ setModalOpen, setComparedProducts, slots }) => product => {
      tracker.push({
        event: 'compareEvent',
        action: 'addProduct',
        compare: {
          product: product.id,
        },
      })
      setComparedProducts(comparedProducts =>
        comparedProducts.length < slots.length
          ? comparedProducts.concat(product)
          : comparedProducts
      )
      setModalOpen(false)
      document.querySelector('body').classList.remove('gallery-modal--open')
    },
    removeProduct: ({ setComparedProducts }) => product => {
      tracker.push({
        event: 'compareEvent',
        action: 'removeProduct',
        compare: {
          product: product.id,
        },
      })
      setComparedProducts(comparedProducts =>
        comparedProducts.filter(({ id }) => id !== product.id)
      )
    },
    openModal: ({ setModalOpen }) => () => {
      tracker.push({
        event: 'compareEvent',
        action: 'open',
      })
      setModalOpen(true)
      if (
        !document
          .querySelector('body')
          .classList.contains('gallery-modal--open')
      ) {
        document.querySelector('body').classList.add('gallery-modal--open')
      }
    },
    closeModal: ({ setModalOpen }) => () => {
      setModalOpen(false)
      document.querySelector('body').classList.remove('gallery-modal--open')
    },
    getString: ({ intl }) => (id, defaultMessage, values) =>
      intl.formatMessage(
        {
          id: `app.product.${id}`,
          defaultMessage,
        },
        values
      ),
  }),
  withProps(({ data, getString }) => ({
    breadcrumbs: [
      {
        name: data.productGroup.name,
        href: `/${data.productGroup.slug}/`,
      },
      {
        name: data.product.filterPage.name,
        href: [
          '',
          data.product.filterPage.group,
          data.product.filterPage.slug,
          '',
        ].join('/'),
      },
      {
        name: data.product.name,
        href: [
          '',
          data.product.filterPage.group,
          data.product.filterPage.slug,
          data.product.slug,
          '',
        ].join('/'),
      },
      {
        name: getString('compare', 'compare', {
          filterPage: data.product.filterPage.name,
        }),
      },
    ],
  })),
  withHelmet(({ data, location, getString }) => ({
    title:
      data.product.meta.title ||
      toTitleCase(
        `${toTitleCase(
          getString('compare', 'compare', {
            filterPage: data.product.filterPage.name,
          })
        )} | ${data.product.brand} ${data.product.name} – ${
          data.product.filterPage.name
        } | ${settings.brand}`,
        settings.lang
      ),
    description: data.product.meta.description || data.product.headline,
    url: `${settings.baseUrl}${location.pathname}`,
    image: getImage()(data.product.images[0]),
    type: 'product.item',
    facebookId: settings.facebookId,
    twitterId: settings.twitterId,
    robots: 'noindex',
  }))
)(ComparePage)
