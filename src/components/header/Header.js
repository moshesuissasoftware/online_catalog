import React from 'react'
import PropTypes from 'prop-types'

import features, { featureIf } from '@nobia/zeus-components/lib/features'
import styled, { prop } from '@nobia/zeus-components/lib/styled'
import { Row, Column } from '@nobia/zeus-components/lib/grid'

import { FEATURE_MY_ACCOUNT } from '../../constants'
import { WishlistSummary } from '../wishlist'
import Breadcrumbs from './Breadcrumbs'

const StyledRow = styled(Row)`
  padding-top: ${prop('theme.grid.gutter')};
  margin-bottom: ${prop('theme.grid.gutter')};
`

const StyledColumn = styled(Column)`
  display: flex;
  justify-content: flex-end;
`

const Header = ({ breadcrumbs }) => (
  <StyledRow data-cy="Header">
    {featureIf(
      FEATURE_MY_ACCOUNT,
      <>
        {features.breadcrumbs && (
          <Column>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </Column>
        )}
      </>,
      <>
        <Column size={9}>
          {features.breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
        </Column>
        <StyledColumn size={3}>
          <WishlistSummary />
        </StyledColumn>
      </>
    )}
  </StyledRow>
)

Header.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ).isRequired,
}

export default Header
