import React, { useMemo } from 'react'
import { gql, useQuery } from '@nobia/zeus-components/lib/apollo'
import { Redirect } from '@nobia/zeus-components/lib/router'
import LoadingIndicator from '@nobia/zeus-components/lib/loadingIndicator'
import styled, { rem } from '@nobia/zeus-components/lib/styled'
import settings from '@nobia/zeus-components/lib/settings'

const Loader = styled(LoadingIndicator)`
  margin: ${rem(32)};
`

const PRODUCTLINK_QUERY = gql`
  query ProductLink($productId: String) {
    productLink(productId: $productId) {
      path
    }
  }
`

export default () => {
  const pathname = location.pathname.endsWith('/')
    ? location.pathname.slice(0, -1)
    : location.pathname

  const segments = pathname.split('/')

  const productIdx = segments.indexOf('link') + 1
  const productId = segments[productIdx]

  const { data, loading } = useQuery(PRODUCTLINK_QUERY, {
    variables: {
      productId,
    },
    skip: productIdx === 0,
  })

  const path = useMemo(() => {
    if (productIdx === 0) {
      return settings.defaultGroup
    } else if (data && data.productLink && data.productLink.path) {
      return data.productLink.path
    }

    return ''
  }, [data])

  if (loading) {
    return <Loader />
  }

  if (path) {
    window.location.href = `/${path}`
    return <></>
  }

  return <Redirect to="/" />
}
