import React, { Fragment, useState } from 'react'
import { graphql } from '@nobia/zeus-components/lib/apollo-hoc'
import { Column, Row } from '@nobia/zeus-components/lib/grid'
import filterProps from '@nobia/zeus-components/lib/helpers/filterProps'
import { Icon } from '@nobia/zeus-components/lib/icons'
import getImage from '@nobia/zeus-components/lib/image/getCloudinaryImage'
import { withTranslation } from '@nobia/zeus-components/lib/i18n'

import {
  compose,
  lifecycle,
  withProps,
  withState,
} from '@nobia/zeus-components/lib/recompose'
import { connect } from '@nobia/zeus-components/lib/redux'
import {
  Link as RouterLink,
  withHelmet,
  withRouter,
} from '@nobia/zeus-components/lib/router'
import settings from '@nobia/zeus-components/lib/settings'
import { viewProduct } from '@nobia/zeus-components/lib/sharedState'
import { tracker } from '@nobia/zeus-components/lib/tracking'

import PropTypes from 'prop-types'

import withGraphqlHandler from '../../components/graphql-handler'
import Header from '../../components/header'
import ImageCarousel from '../../components/image-carousel'
import withNotFound from '../../components/not-found'
import {
  InformationView,
  VariantList,
  withDisplay,
} from '../../components/product-details'
import FeaturedProducts from '../../components/product-grid/FeaturedProducts'
import LatestViewedProducts from '../../components/product-grid/LatestViewedProducts'
import RelatedProducts from '../../components/product-grid/RelatedProducts'
import ProductQuery from '../../graphql/ProductQuery.graphql'
import { getCategoryFeature, toTitleCase } from '../../utils'
import Sidebar from '../../components/sidebar/Sidebar'
import {
  StyledContainer,
  Subtitle,
  StyledTitle,
  StyledPrice,
  StyledBullets,
  StyledPreamble,
  StyledWishlistButton,
  Divider,
  InfoBookning,
  InfoBookningTitle,
  SidePanelButton,
  StyledFlexColumn,
  InfoBookningPreamble,
  InfoBookningButton,
  StyledColumn,
  StyledFlexColumnProdInfo,
} from './product-styles'

const CompareLink = (props) => (
  <RouterLink
    {...filterProps(props, ['block', 'inverted', 'product'])}
    to={`/${props.product.filterPage.group}/${props.product.filterPage.slug}/${props.product.slug}/${settings.comparePath}`}
  >
    <Icon width={10} height={10} type="compare">
      {props.children}
    </Icon>
  </RouterLink>
)

const productImages = (images, media) => {
  const mediaImages = (media || [])
    .filter((m) => m.type === 'Image')
    .map((m) => m.url)
  const mergedImages = [...images, ...mediaImages]

  if (mergedImages.length) {
    return mergedImages
  }
  return ['missing']
}

const ProductPage = ({
  data: { product },
  breadcrumbs,
  sidePanelButtons,
  display,
}) => {
  if (!product) {
    return null
  }
  const relatedProductIds =
    (product.productRelations &&
      product.productRelations.length > 0 &&
      product.productRelations.map((a) => a.id)) ||
    []
  const [showSidebar, setShowSidebar] = useState(false)
  const [sidebarContent, setSidebarContent] = useState({})

  const onCloseSidebar = () => {
    setShowSidebar(false)
  }
  const ProductCode = withTranslation('app.product')('span')

  const ua = window.navigator.userAgent.toLowerCase()
  const isiPad =
    ua.indexOf('ipad') > -1 ||
    (ua.indexOf('macintosh') > -1 && 'ontouchend' in document)

  const onToggleSidebar = (btn) => {
    setSidebarContent({
      heading: btn.heading,
      title: btn.title,
      body: btn.body,
      listItems: btn.listItems,
      linkText: btn.linkText,
      url: btn.url,
    })
    setShowSidebar(!showSidebar)
  }
  return (
    <>
      <StyledContainer itemScope itemType="http://schema.org/Product">
        {showSidebar && (
          <Sidebar
            onCloseSidebar={onCloseSidebar}
            body={sidebarContent.body}
            title={sidebarContent.title}
            heading={sidebarContent.heading}
            listItems={sidebarContent.listItems}
            linkText={sidebarContent.linkText}
            url={sidebarContent.url}
          />
        )}
        <Header breadcrumbs={breadcrumbs} />
        <Row>
          <StyledColumn md={7} className={isiPad ? 'image-carousel-ipad' : ''}>
            <ImageCarousel
              images={productImages(product.images, product.media)}
              tags={product.tags}
              showBadge
              videos={product.media.filter((m) => m.type === 'Video')}
              name={product.name}
              key={product.id}
            />
          </StyledColumn>

          <StyledFlexColumn md={5}>
            <StyledWishlistButton product={product} block />
            <StyledTitle small itemProp="name">
              {toTitleCase(product.name, settings.lang)}
            </StyledTitle>
            {display('id') && (
              <Subtitle size="small">
                {display('brand') && product.brand && (
                  <Fragment>
                    <ProductCode intlKey="productcode" />
                    <span itemProp="brand">{product.brand}</span>
                    <span> - </span>
                  </Fragment>
                )}
                <span itemProp="mpn">
                  {product.features && product.features.Itemnumber
                    ? product.features.Itemnumber
                    : product.id}
                </span>
              </Subtitle>
            )}
            <StyledPreamble
              itemProp="description"
              dangerouslySetInnerHTML={{
                __html: product.headline,
              }}
            />
            {product.bullets && product.bullets.length > 0 && (
              <StyledBullets bullets={product.bullets} />
            )}
            {display('price') && (
              <StyledPrice
                price={product.price}
                comparePrice={
                  display('compare_price') ? product.comparePrice : null
                }
                showPrefix={display('price_prefix')}
                showSuffix={display('price_suffix')}
                showDisclaimer={display('price_disclaimer')}
                showDisclaimerTwo={display('price_disclaimer_2')}
              />
            )}

            {display('variants') &&
              product.variants &&
              product.variantFilter?.length > 0 && (
                <VariantList
                  variants={product.variants}
                  variantFilter={product.variantFilter}
                  currentId={product.id}
                />
              )}
            {settings.brand === 'magnet' && (
              <InfoBookning>
                <InfoBookningTitle>{'Like what you see?'}</InfoBookningTitle>
                <InfoBookningPreamble>
                  {
                    'Speak to your local designer about how to purchase this product as part of your new Magnet kitchen.'
                  }
                </InfoBookningPreamble>

                <InfoBookningButton href="https://magnet.co.uk/book-a-consultation/#select">
                  {'Book a design consultation'}
                </InfoBookningButton>
              </InfoBookning>
            )}

            {sidePanelButtons &&
              sidePanelButtons.map((btn) => (
                <SidePanelButton onClick={() => onToggleSidebar(btn)}>
                  <span style={{ textDecoration: 'underline' }}>
                    {btn.openingLinkText}
                  </span>
                  <Icon
                    style={{ float: 'right', marginTop: '3px' }}
                    type="chevron-right"
                    width={15}
                    height={15}
                  />
                </SidePanelButton>
              ))}
          </StyledFlexColumn>
          <StyledFlexColumnProdInfo
            className={isiPad ? 'prod-overview-ipad' : ''}
            md={7}
          >
            <InformationView product={product} />
          </StyledFlexColumnProdInfo>
        </Row>
        <Row>
          <Column md={7}>
            <Divider />
            {relatedProductIds &&
              relatedProductIds.length > 0 &&
              display('related_products') && (
                <>
                  <RelatedProducts ids={relatedProductIds} skipLastSlug />
                  <Divider />
                </>
              )}

            <FeaturedProducts
              showBadge={false}
              skipLastSlug
              filterPageSlug={product.filterPage.slug}
              tag={getCategoryFeature(product.filterPage.id)('featured.tag')}
            />

            {!display('related_products') ||
              (relatedProductIds && relatedProductIds.length === 0 && (
                <>
                  <Divider />
                  <LatestViewedProducts
                    showBadge={false}
                    skipLastSlug
                    exclude={product.id}
                  />
                </>
              ))}
          </Column>
        </Row>
      </StyledContainer>
    </>
  )
}

ProductPage.defaultProps = {
  product: undefined,
  slug: undefined,
  children: undefined,
  sidePanelButtons: PropTypes.arrayOf(
    PropTypes.shape({
      map: PropTypes.shape({}),
    })
  ),
}

CompareLink.propTypes = {
  product: PropTypes.shape({
    filterPage: PropTypes.shape({
      group: PropTypes.string,
      slug: PropTypes.string,
    }),
    slug: PropTypes.string,
  }).isRequired,
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

ProductPage.propTypes = {
  data: PropTypes.shape({
    product: PropTypes.shape({
      images: PropTypes.arrayOf(PropTypes.string),
      media: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        })
      ),
      name: PropTypes.string,
      id: PropTypes.string,
      brand: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      features: PropTypes.shape({
        Itemnumber: PropTypes.string,
      }),
      headline: PropTypes.string,
      price: PropTypes.number,
      comparePrice: PropTypes.number,
      variants: PropTypes.arrayOf(PropTypes.shape({})),
      variantFilter: PropTypes.arrayOf(PropTypes.shape({})),
      filterPage: PropTypes.shape({
        slug: PropTypes.string,
        id: PropTypes.string,
      }),
      bullets: PropTypes.arrayOf(PropTypes.string),
      productRelations: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          typeId: PropTypes.number,
          sortOrder: PropTypes.number,
        })
      ),
    }),
    productFilterPage: PropTypes.shape({
      filterValues: PropTypes.arrayOf(
        PropTypes.shape({
          filter: PropTypes.string,
          splitChar: PropTypes.string,
          values: PropTypes.arrayOf(PropTypes.shape({})),
          productFilter: PropTypes.bool,
        })
      ),
      productImages: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string,
          value: PropTypes.string,
        })
      ),
      productVideos: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string,
          value: PropTypes.string,
        })
      ),
    }),
  }).isRequired,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      href: PropTypes.string,
    })
  ).isRequired,
  sidePanelButtons: PropTypes.arrayOf(
    PropTypes.shape({
      map: PropTypes.shape({}),
    })
  ),
  display: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  viewProduct: (product) => dispatch(viewProduct(product)),
})

export default compose(
  withRouter,
  withProps(({ product }) => ({
    sidePanelButtons: product.sidePanelButtons,
    filterPageSlug: product.parentSlug,
    slug: product.slug,
  })),
  graphql(ProductQuery, {
    options: ({ filterPageSlug, slug, path }) => ({
      variables: {
        filterPageSlug,
        slug,
        path,
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
  connect(null, mapDispatchToProps),
  withState('isClient', 'setIsClient', false),
  lifecycle({
    componentDidMount() {
      this.props.viewProduct(this.props.data.product)
      this.props.setIsClient(true)
      tracker.push({
        event: 'opc-product-viewed',
        code: this.props.data.product.id,
        imageUrl: this.props.data.product.images[0],
        name: this.props.data.product.name,
        url: window.location.href,
      })
    },
  }),
  withProps(({ product }) => ({
    breadcrumbs: product.breadcrumbs,
  })),
  withDisplay(({ data }) => data.product.filterPage.id),
  withHelmet(({ data, location }) => ({
    title:
      data.product.meta.title ||
      toTitleCase(
        `${data.product.name} – ${data.product.filterPage.name} |
         ${toTitleCase(settings.brandTitle || settings.brand, settings.lang)}`,
        settings.lang
      ),
    description: data.product.meta.description || data.product.headline,
    url: `${settings.baseUrl}${location.pathname}`,
    image: data.product.images[0] && getImage()(data.product.images[0]),
    type: 'product.item',
    facebookId: settings.facebookId,
    twitterId: settings.twitterId,
  }))
)(ProductPage)
