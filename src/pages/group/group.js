import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import settings from '@nobia/zeus-components/lib/settings'
import { graphql } from '@nobia/zeus-components/lib/apollo-hoc'
import { withHelmet, withRouter } from '@nobia/zeus-components/lib/router'
import { Row } from '@nobia/zeus-components/lib/grid'
import {
  compose,
  withProps,
  lifecycle,
} from '@nobia/zeus-components/lib/recompose'
import { useTranslation } from '@nobia/zeus-components/lib/i18n'

import { withTheme } from '@nobia/zeus-components/lib/styled'
import getImage from '@nobia/zeus-components/lib/image/getCloudinaryImage'
import ErrorBoundary from '@nobia/zeus-components/lib/errorBoundary'
import { tracker } from '@nobia/zeus-components/lib/tracking'
import FilterPageCard from '../../components/filterpage-card'
import { PageHeader } from '../../components/header'
import withGraphqlHandler from '../../components/graphql-handler'
import { toTitleCase } from '../../utils'
import withNotFound from '../../components/not-found'
import ProductGroupQuery from '../../graphql/ProductGroupQuery.graphql'
import Promotion from '../../components/promotion'
import FilterPagesBanner from '../../components/filterpages-banner/FilterPagesBanner'
import {
  NavigationColumn,
  StyledBottomColumn,
  StyledCol,
  StyledLink,
  MenuItem,
  StyledCollapse,
  GridRow,
  StyledPreamble,
  StyledContainer,
} from './group-styles'
import ReadMore from '../../components/readmore'

const Group = ({ data: { group }, breadcrumbs, theme }) => {
  const items = useMemo(() => {
    const groupsAndFilterPages = group.groups
      ? group.groups.concat(group.filterPages)
      : group.filterPages

    if (!group.promotions) {
      return groupsAndFilterPages
    }

    const itemsWithOrder = groupsAndFilterPages.map((c, i) => ({
      ...c,
      order: i,
    }))

    const renderItems = [...itemsWithOrder, ...group.promotions].sort(
      (a, b) => {
        if (a.order < b.order) {
          return -1
        }

        if (a.order > b.order) {
          return 1
        }

        // eslint-disable-next-line no-underscore-dangle
        if (a.__typename === 'Promotion') {
          return -1
        }

        // eslint-disable-next-line no-underscore-dangle
        if (b.__typename === 'Promotion') {
          return 1
        }
        return 0
      }
    )
    return renderItems
  }, [group])

  const { t } = useTranslation('app')

  const pathname = location.pathname.endsWith('/')
    ? location.pathname.slice(0, -1)
    : location.pathname

  const isMainGroup = breadcrumbs.length === 1
  let navigationRender = group.groups ? group.groups : []
  if (isMainGroup) {
    navigationRender = navigationRender.concat(group.filterPages)
  }
  return (
    <>
      <PageHeader
        breadcrumbs={breadcrumbs}
        title={group.name}
        layout={theme.header.layout}
      />

      <StyledContainer>
        <ErrorBoundary name="categories">
          <Row
            className={
              group.preamble.length > 11 ? 'display-table' : 'display-none'
            }
          >
            <ReadMore>
              <StyledPreamble
                dangerouslySetInnerHTML={{ __html: group.preamble }}
              />
            </ReadMore>
          </Row>
          <Row>
            {isMainGroup ? (
              <NavigationColumn>
                <StyledCollapse
                  title={`${t('product.buy')} ${group.name.toLowerCase()}`}
                >
                  {navigationRender.map((item) => (
                    <StyledLink key={item.id} to={`${pathname}/${item.slug}`}>
                      <MenuItem>{item.name}</MenuItem>
                    </StyledLink>
                  ))}
                </StyledCollapse>
              </NavigationColumn>
            ) : (
              <NavigationColumn>
                {group.groups && group.groups.length > 0 && (
                  <StyledCollapse title={t('navigation.title')}>
                    {group.groups.map((subGroup) => (
                      <StyledLink
                        key={subGroup.id}
                        to={`${pathname}/${subGroup.slug}`}
                      >
                        <MenuItem>{subGroup.name}</MenuItem>
                      </StyledLink>
                    ))}
                  </StyledCollapse>
                )}
                <StyledCollapse title={t('navigation.title')}>
                  {group.filterPages.map((filterPage) => (
                    <StyledLink
                      key={filterPage.id}
                      to={`${pathname}/${filterPage.slug}`}
                    >
                      <MenuItem>{filterPage.name}</MenuItem>
                    </StyledLink>
                  ))}
                </StyledCollapse>
              </NavigationColumn>
            )}
            <GridRow>
              {group.banner && <FilterPagesBanner {...group} />}
              {items.map((item) => {
                if (item.hideInListing) {
                  return null
                }
                // eslint-disable-next-line no-underscore-dangle
                if (item && item.__typename === 'Promotion') {
                  return (
                    <Promotion
                      // eslint-disable-next-line no-underscore-dangle
                      key={item.__typename + item.order}
                      promotion={item}
                    />
                  )
                }
                return (
                  <StyledCol key={item.id}>
                    <FilterPageCard filterPage={item} group={group} />
                  </StyledCol>
                )
              })}
              {group.bottomXhtml && (
                <StyledBottomColumn
                  dangerouslySetInnerHTML={{ __html: group.bottomXhtml }}
                />
              )}
            </GridRow>
          </Row>
        </ErrorBoundary>
      </StyledContainer>
    </>
  )
}

Group.propTypes = {
  theme: PropTypes.shape({
    header: PropTypes.shape({
      layout: PropTypes.string,
    }),
  }).isRequired,
  data: PropTypes.shape({
    group: PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
      preamble: PropTypes.string,
      banner: PropTypes.shape({
        title: PropTypes.string,
        preamble: PropTypes.string,
        buttonLink: PropTypes.string,
        backgroundImage: PropTypes.string,
        buttonLinkText: PropTypes.string,
      }),
      bottomXhtml: PropTypes.string,
      promotions: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          preamble: PropTypes.string,
          image: PropTypes.string,
          buttonText: PropTypes.string,
          buttonLink: PropTypes.string,
          backGroundColor: PropTypes.string,
          order: PropTypes.number,
        })
      ),
      filterPages: PropTypes.arrayOf(
        PropTypes.shape({
          map: PropTypes.shape({}),
        })
      ),
      groups: PropTypes.arrayOf(
        PropTypes.shape({
          map: PropTypes.shape({}),
        })
      ),
    }),
    error: PropTypes.bool,
    loading: PropTypes.bool,
    productCategories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        image: PropTypes.string,
        slug: PropTypes.string,
      })
    ),
  }).isRequired,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ).isRequired,
}

export default compose(
  withTheme,
  withRouter,
  withProps(({ group }) => ({
    group,
  })),
  graphql(ProductGroupQuery, {
    options: ({ group }) => ({
      variables: {
        slug: group.slug,
      },
    }),
  }),
  withGraphqlHandler,
  withNotFound(({ data }) => !data.group),
  withProps(({ group }) => ({
    breadcrumbs: group.breadcrumbs,
  })),
  withHelmet(({ data, location }) => ({
    title: `${toTitleCase(data.group.name, settings.lang)} | ${toTitleCase(
      settings.brandTitle || settings.brand,
      settings.lang
    )}`,
    metaTitle:
      data.group.meta.title ||
      `${toTitleCase(data.group.name, settings.lang)} | ${toTitleCase(
        settings.brandTitle || settings.brand,
        settings.lang
      )}`,
    url: `${settings.baseUrl}${location.pathname}`,
    description: data.group.meta.description || data.group.preamble,
    keywords: data.group.meta.keywords || '',
    image: data.group.thumbnail && getImage()(data.group.thumbnail),
    type: 'product.group',
    facebookId: settings.facebookId,
    twitterId: settings.twitterId,
  })),
  lifecycle({
    componentDidMount() {
      tracker.push({
        event: 'opc-category-viewed',
        name: this.props.data.group.name,
        url: window.location.href,
      })
    },
  })
)(Group)
