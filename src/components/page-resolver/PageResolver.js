import React, { useCallback, useEffect, useMemo, useState } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { useLocation } from 'react-router-dom'
import styled from '@nobia/zeus-components/lib/styled'
import BubbleLoader from '@nobia/zeus-components/lib/loadingIndicator/BubbleLoader'
import { gql, useQuery } from '@nobia/zeus-components/lib/apollo'
import Group from '../../pages/group'
import FilterPage from '../../pages/filterPage'
import Product from '../../pages/product'
import ProductLink from '../../pages/product-resolver'

const PageQuery = gql`
  query PageQuery($path: String!) {
    page(path: $path) {
      type
      slug
      parentSlug
      sidePanelButtons {
        heading
        title
        body
        listItems
        linkText
        url
        openingLinkText
      }
      breadcrumbs {
        name
        href
      }
    }
  }
`

const LoaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  background-color: #fff9;
`

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const PageResolver = () => {
  const [page, setPage] = useState()

  const location = useLocation()
  const path = useMemo(
    () =>
      location.pathname
        .split('/')
        .filter(Boolean)
        .filter((s) => s.indexOf('---') === -1)
        .join('/'),
    [location]
  )

  const isLink = useMemo(() => path.indexOf('/link/') >= 0, [path])

  const { data, loading } = useQuery(PageQuery, {
    variables: {
      path,
    },
    skip: isLink,
  })

  useEffect(() => {
    if (!loading) {
      setPage(data)
    }
  }, [data, loading])

  if (isLink) {
    return <ProductLink />
  }

  const renderPage = useCallback(() => {
    if (!page || !page.page) {
      return <></>
    }
    switch (page.page.type) {
      case 'Group':
        return <Group group={data.page} path={path} />
      case 'FilterPage':
        return <FilterPage filterPage={data.page} path={path} />
      default:
        return <Product product={data.page} path={path} />
    }
  }, [page])

  return (
    <>
      {loading && (
        <LoaderOverlay>
          <LoaderContainer>
            <BubbleLoader />
          </LoaderContainer>
        </LoaderOverlay>
      )}
      {renderPage()}
    </>
  )
}

export default PageResolver
