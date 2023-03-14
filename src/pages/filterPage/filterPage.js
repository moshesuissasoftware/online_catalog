import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import settings from '@nobia/zeus-components/lib/settings'
import {
  withTranslation,
  useTranslation,
} from '@nobia/zeus-components/lib/i18n'

import {
  compose,
  withProps,
  withHandlers,
  lifecycle,
  withState,
} from '@nobia/zeus-components/lib/recompose'
import { withHelmet, withRouter } from '@nobia/zeus-components/lib/router'
import { graphql, withApollo } from '@nobia/zeus-components/lib/apollo-hoc'
import { Row } from '@nobia/zeus-components/lib/grid'
import { withGrouping, withSorting } from '@nobia/zeus-components/lib/filter'
import getImage from '@nobia/zeus-components/lib/image/getCloudinaryImage'
import { tracker } from '@nobia/zeus-components/lib/tracking'
import ErrorBoundary from '@nobia/zeus-components/lib/errorBoundary'
import { PageHeader } from '../../components/header'
import { ProductRow, ProductColumn } from '../../components/product-grid'
import withGraphqlHandler from '../../components/graphql-handler'
import {
  toTitleCase,
  getCategoryFeature,
  slugToFilter,
  filterToSlug,
} from '../../utils'
import withFilter from '../../utils/withFilter'
import withNotFound from '../../components/not-found'
import { withDisplay } from '../../components/product-details'
import ProductFilterPageQuery from '../../graphql/ProductFilterPageQuery.graphql'
import Paging from '../../components/paging'
import Navcollapse from '../../components/collapse/Navcollapse'
import MobileFilter from '../../components/filter/MobileFilter'
import SortBy from '../../components/sort-by/SortBy'
import DesktopFilter from '../../components/filter/DesktopFilter'

import {
  StyledRow,
  StyledLoader,
  LoaderWrapper,
  StyledLink,
  MenuItem,
  ProdCard,
  StyledColumn,
  SortByContainer,
  Filters,
  BottomText,
  StyledPreamble,
  StyledPreambleRow,
  StyledContainer,
} from './filterpage-styles'
import Promotion from '../../components/promotion'
import ReadMore from '../../components/readmore'

const ProdQtyLabel = withTranslation('app.product')('span')

const getKeywords = (filterPage) => {
  if (filterPage.meta.keywords) {
    return filterPage.meta.keywords
  }
  return null
}

const getCanonicalPath = (filterSlug, path, filterValues) => {
  if (!filterSlug) return path
  const filter = slugToFilter(filterSlug, filterValues)
  const fullSlug = filterToSlug(filter, filterValues)
  const slug = filterToSlug(filter, filterValues)
  return slug !== null
    ? path.replace(fullSlug, slug)
    : path.replace(`/${fullSlug}`, '')
}

const addFilterValue = (current, value) => {
  if (!current || current.length === 0) {
    return value
  }
  if (current === value) {
    return ''
  }
  const values = current.split('+')
  const idx = values.indexOf(value)
  if (idx >= 0) {
    values.splice(idx, 1)
    return values.join('+')
  }
  return `${current}+${value}`
}
const getPageFromActiveFilter = (activeFilter) => {
  if (!activeFilter || !activeFilter.page) {
    return 0
  }
  return parseInt(activeFilter.page, 10)
}

const isFilterSlug = (slug) => slug.indexOf('---') > -1

const addFilterAndHistoryPush = (
  location,
  history,
  newFilter,
  filterValues
) => {
  const paths = location.pathname.split('/')
  if (paths[paths.length - 1] === '') {
    paths.pop()
  }
  const filterIndex = isFilterSlug(paths[paths.length - 1])
    ? paths.length - 1
    : paths.length
  paths[filterIndex] = filterToSlug(newFilter, filterValues)
  history.push(`${paths.filter((item) => item !== null).join('/')}`)
}

const FilterPage = ({
  data: { productFilterPage: filterPage },
  products,
  options,
  updateFilter,
  clearFilter,
  activeFilter,
  breadcrumbs,
  showProduct,
  loading,
  setPage,
  currentPage,
  total,
  setSorting,
  sorting,
}) => {
  const renderProducts = showProduct.length ? showProduct : products
  const { t } = useTranslation('app')

  const items = useMemo(() => {
    if (!filterPage.promotions) {
      return renderProducts
    }
    const productsWithOrder = renderProducts.map((c, i) => ({
      ...c,
      order: i,
    }))

    const renderItems = [...productsWithOrder, ...filterPage.promotions].sort(
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
  }, [renderProducts])

  useMemo(() => {
    // eslint-disable-next-line no-unused-expressions
    filterPage.permanentFilters &&
      filterPage.permanentFilters.filter((item) => {
        if (!activeFilter[item.key]) {
          // eslint-disable-next-line no-param-reassign
          activeFilter[item.key] = item.value
        }
        return activeFilter
      })
  }, [])

  return (
    <>
      <PageHeader
        breadcrumbs={breadcrumbs}
        layout={filterPage.headerLayout}
        backgroundImage={filterPage.backgroundImage}
        headerImage={filterPage.headerImage}
        title={filterPage.name}
      />

      <StyledContainer>
        <StyledPreambleRow
          className={
            filterPage.preamble.length > 11 ? 'display-table' : 'display-none'
          }
        >
          <ReadMore>
            <StyledPreamble
              dangerouslySetInnerHTML={{ __html: filterPage.preamble }}
            />
          </ReadMore>
        </StyledPreambleRow>
        <StyledRow>
          <StyledColumn md={3}>
            <Navcollapse title={t('navigation.title')}>
              {filterPage.mainGroups.map((fp, i) => (
                <StyledLink
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${fp.id}-${i}`}
                  to={`/${fp.slug}`}
                >
                  <MenuItem>{fp.name}</MenuItem>
                </StyledLink>
              ))}
            </Navcollapse>
            <Filters>
              <MobileFilter
                filterPage={filterPage}
                options={options}
                total={total}
                activeFilter={activeFilter}
                clearFilter={clearFilter}
                updateFilter={updateFilter}
                setSorting={setSorting}
                sorting={sorting}
              />
              <DesktopFilter
                filterPage={filterPage}
                options={options}
                activeFilter={activeFilter}
                clearFilter={clearFilter}
                updateFilter={updateFilter}
                isLoading={loading}
              />
            </Filters>
          </StyledColumn>
          <ErrorBoundary name="products">
            <StyledColumn md={9}>
              <Row>
                <StyledColumn md={8}>
                  <div style={{ marginTop: '22px', fontWeight: '400' }}>
                    {total} <ProdQtyLabel intlKey={'productqty'} />
                    {total > 1 ? (
                      <ProdQtyLabel intlKey={'productqtyplural'} />
                    ) : (
                      ''
                    )}
                  </div>
                </StyledColumn>
                <SortByContainer md={4}>
                  <SortBy
                    setSorting={setSorting}
                    sorting={sorting}
                    filterPage={filterPage}
                  />
                </SortByContainer>
              </Row>
              <ProductRow>
                {loading && (
                  <LoaderWrapper id="loader">
                    <StyledLoader size={'small'} />
                  </LoaderWrapper>
                )}
                {!loading &&
                  items.map((item) => {
                    if (!item || item.hideInListing) {
                      return null
                    }
                    // eslint-disable-next-line no-underscore-dangle
                    if (item.__typename === 'Promotion') {
                      return (
                        <Promotion
                          // eslint-disable-next-line no-underscore-dangle
                          key={item.__typename + item.order}
                          promotion={item}
                          type={'category'}
                          isFilterPage
                        />
                      )
                    }
                    return (
                      <ProductColumn sm={6} md={4} lg={3} key={item.id}>
                        <ProdCard product={item} showVariants />
                      </ProductColumn>
                    )
                  })}
              </ProductRow>
              {total > 0 && (
                <Paging
                  productCount={total}
                  currentPage={currentPage}
                  gotoPage={setPage}
                />
              )}
              {filterPage.bottomXhtml && (
                <BottomText
                  dangerouslySetInnerHTML={{ __html: filterPage.bottomXhtml }}
                />
              )}
            </StyledColumn>
          </ErrorBoundary>
        </StyledRow>
      </StyledContainer>
    </>
  )
}

FilterPage.propTypes = {
  updateFilter: PropTypes.func.isRequired,
  activeFilter: PropTypes.objectOf(PropTypes.string).isRequired,
  setSorting: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  data: PropTypes.shape({
    productFilterPage: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      nameSingular: PropTypes.string,
      promotions: PropTypes.arrayOf(PropTypes.shape({})),
      headerLayout: PropTypes.string,
      backgroundImage: PropTypes.string,
      headerImage: PropTypes.string,
      preamble: PropTypes.string,
      bottomXhtml: PropTypes.string,
      permanentFilters: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string,
          value: PropTypes.string,
        })
      ),
      mainGroups: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          slug: PropTypes.string,
        })
      ),
    }),
  }).isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.string),
      slug: PropTypes.string,
    })
  ).isRequired,
  showProduct: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.string),
      slug: PropTypes.string,
    })
  ).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      filterType: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string,
          enabled: PropTypes.bool,
        })
      ),
    })
  ).isRequired,
  filter: PropTypes.shape({}).isRequired,
  sorting: PropTypes.shape({
    key: PropTypes.string,
    enabled: PropTypes.bool,
    value: PropTypes.string,
    ascending: PropTypes.bool,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      href: PropTypes.string,
    })
  ).isRequired,
  setPage: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
}

export default compose(
  withRouter,
  withApollo,
  withProps(({ filterPage }) => ({
    page: filterPage,
    filterPageSlug: filterPage.slug,
    group: filterPage.parentSlug,
    pageSize: settings.pageSize,
  })),
  graphql(ProductFilterPageQuery, {
    options: ({ filterPageSlug: slug, group, pageSize, offset, path }) => ({
      variables: {
        slug,
        group,
        pageSize,
        offset,
        path,
      },
    }),
    props: ({ data }) => {
      if (!data.productFilterPage) {
        return { data }
      }

      const { products } = data.productFilterPage
      const pricedProducts = products.map((product) => ({
        ...product,
        price: +product.discountPrice || +product.price,
        comparePrice: product.discountPrice ? +product.price : null,
      }))
      return {
        data: {
          ...data,
          productFilterPage: {
            ...data.productFilterPage,
            products: pricedProducts,
            mainGroups: data.mainGroups,
          },
          total: data.productFilterPage.total,
        },
      }
    },
  }),
  withGraphqlHandler,
  withNotFound(({ data }) => !data.productFilterPage),
  withDisplay(({ data }) => data.productFilterPage.id),
  withFilter({
    items: ({ data }) => data.productFilterPage.products,
    filters: ({ data }) => {
      if (settings.filtersFromConfig) {
        const filtersFromConfig = getCategoryFeature(
          data.productFilterPage.slug
        )('filters')

        if (filtersFromConfig) return filtersFromConfig
      }
      if (!data.productFilterPage.filterValues) {
        return []
      }

      return data.productFilterPage.filterValues.map((filter) => filter.filter)
    },
    initialValues: ({ data, location }) => {
      const url = location.pathname.split('/')
      const filterPath = isFilterSlug(url[url.length - 1])
        ? url[url.length - 1]
        : null
      return slugToFilter(filterPath, data.productFilterPage.filterValues)
    },
  }),
  lifecycle({
    componentDidMount() {
      tracker.push({
        event: 'opc-category-viewed',
        name: this.props.data.productFilterPage.name,
        url: window.location.href,
      })
    },
    componentDidUpdate(oldProps) {
      const url = location.pathname.split('/')
      const filterPath = isFilterSlug(url[url.length - 1])
        ? url[url.length - 1]
        : ''
      const oldFilterUrl = oldProps.location.pathname.split('/')
      const oldFilterPath = isFilterSlug(oldFilterUrl[oldFilterUrl.length - 1])
        ? oldFilterUrl[oldFilterUrl.length - 1]
        : ''
      if (filterPath !== oldFilterPath) {
        this.props.setFilter(
          slugToFilter(
            filterPath,
            this.props.data.productFilterPage.filterValues
          )
        )
      }
    },
  }),
  withGrouping('master'),
  withSorting,
  withState('showProduct', 'setShowProduct', []),
  withState('productsOffset', 'setOffset', settings.pageSize),
  withState('loading', 'setLoading', true),
  withState('currentPage', 'setCurrentPage', 0),
  withState('total', 'setTotal', 0),
  withHandlers({
    setProducts: (props) => (pricedProducts) => {
      props.setShowProduct(pricedProducts)
    },
  }),
  withHandlers({
    setPage:
      ({ filter, history, data }) =>
      (page) => {
        const newFilter = { ...filter, page }
        addFilterAndHistoryPush(
          location,
          history,
          newFilter,
          data.productFilterPage.filterValues
        )
      },
    loadProductPage:
      ({
        currentPage,
        setCurrentPage,
        setTotal,
        setProducts,
        setLoading,
        setOffset,
        client,
        filterPageSlug: slug,
        group,
        pageSize,
        filter,
        sorting,
      }) =>
      (page) => {
        const offset = page * settings.pageSize
        const sortingValue =
          sorting && sorting.key
            ? `${sorting.key}_${sorting.ascending ? 'asc' : 'desc'}`
            : ''

        const filterArray = Object.keys(filter)
          .map((i) => ({
            key: i,
            value: filter[i],
          }))
          .filter((f) => f.key !== 'page')
        setLoading(true)
        client
          .query({
            query: ProductFilterPageQuery,
            variables: {
              slug,
              group,
              pageSize,
              offset,
              filters: JSON.stringify(filterArray),
              sorting: sortingValue,
            },
          })
          .then((result) => {
            const { data } = result
            if (!data.productFilterPage) {
              setLoading(false)
              if (currentPage !== page) {
                window.scrollTo(0, 0)
              }
              return { data }
            }
            const newProducts = data.productFilterPage.products
            const pricedProducts = newProducts.map((product) => ({
              ...product,
              price: +product.discountPrice || +product.price,
              comparePrice: product.discountPrice ? +product.price : null,
            }))
            setProducts(pricedProducts)
            setOffset(offset + pricedProducts.length)
            setLoading(false)
            setCurrentPage(page)
            setTotal(data.productFilterPage.total)
            if (currentPage !== page) {
              window.scrollTo(0, 0)
            }
            return pricedProducts
          })
      },
    updateFilter:
      ({ filter, history, data }) =>
      (key, value, type) => {
        tracker.push({
          event: 'filterEvent',
          filter: {
            key,
            value,
          },
        })
        const newFilter = { ...filter, filterType: type }
        if (value == null) {
          delete newFilter[key]
        } else if (type.indexOf('multi') === 0) {
          newFilter[key] = addFilterValue(newFilter[key], value)
        } else {
          newFilter[key] = value
        }
        if (key !== 'page') {
          newFilter.page = 0 // reset the current page if any filter (other than page) changes
        }

        addFilterAndHistoryPush(
          location,
          history,
          newFilter,
          data.productFilterPage.filterValues
        )
      },
    clearFilter:
      ({ history }) =>
      (options) => {
        const ops = options.map((op) => op.options)
        const flatArray = ops.flat()
        flatArray.forEach((option) => {
          const cb = document.getElementById(option.value)
          if (cb) {
            cb.checked = false
          }
        })
        const url = location.pathname.split('/')
        if (isFilterSlug(url[url.length - 1])) {
          url[url.length - 1] = ''
          history.push(`${url.filter((item) => item !== null).join('/')}`)
        }
      },
  }),
  withGraphqlHandler,
  withProps(({ items, filterPage }) => ({
    products: items,
    breadcrumbs: filterPage.breadcrumbs,
  })),
  lifecycle({
    componentDidMount() {
      const page = getPageFromActiveFilter(this.props.activeFilter)
      this.props.loadProductPage(page)
    },
    componentDidUpdate(oldProps) {
      if (oldProps.activeFilter !== this.props.activeFilter) {
        const page = getPageFromActiveFilter(this.props.activeFilter)
        this.props.loadProductPage(page)
      }
      if (oldProps.sorting !== this.props.sorting) {
        const page = getPageFromActiveFilter(this.props.activeFilter)
        this.props.loadProductPage(page)
      }
    },
  }),
  withHelmet(({ data, location, filter, match }) => ({
    title: `${data.productFilterPage.name} | ${toTitleCase(
      settings.brandTitle || settings.brand
    )}`,
    metaTitle:
      data.productFilterPage.meta.title ||
      `${data.productFilterPage.name} | ${toTitleCase(
        settings.brandTitle || settings.brand
      )}`,
    description:
      data.productFilterPage.meta.description ||
      data.productFilterPage.preamble,
    url: `${settings.baseUrl}${getCanonicalPath(
      match.params.product,
      location.pathname,
      data.productFilterPage.filterValues
    )}`,
    image:
      data.productFilterPage.thumbnail &&
      getImage()(data.productFilterPage.thumbnail),
    type: 'product.group',
    facebookId: settings.facebookId,
    twitterId: settings.twitterId,
    robots: 'index,follow',
    keywords: getKeywords(data.productFilterPage, filter),
  }))
)(FilterPage)
