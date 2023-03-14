import React from 'react'
import PropTypes from 'prop-types'
import styled, { rem } from '@nobia/zeus-components/lib/styled'
import { Column } from '@nobia/zeus-components/lib/grid'
import { SortBoxMagnet } from '@nobia/zeus-components/lib/filter'
import { getCategoryFeature } from '../../utils'

const SortColumn = styled(Column).attrs({ md: 'auto' })`
  ${props => props.theme.media.min.md`
    align-self: flex-end;
    margin-bottom: ${rem(15)};
    padding: 0;
  `};
  li {
    min-width: ${rem(120)};
    @media (min-width: 960px) {
      min-width: ${rem(180)};
    }
    li:hover {
      background-color: #eee;
    }
  }
  ${props => props.theme.media.max.sm`
    padding: 0px;
    margin: 14px 0 7px 0;
    width: 50%;
    li {
        height: 50px;
        border-radius: 3px 0 0 3px;
        div {
          position: relative;
          z-index: 2;
          > p {
            padding: 14px;
            height: 40px;
            > span:first-of-type {
              font-size: 14px;
            }
            > span:last-of-type {
              position: absolute;
              right: 16px;
            }
        }
    }
  `}
`

const SortBy = ({ setSorting, sorting, filterPage }) => (
  <SortColumn>
    <SortBoxMagnet
      style={{ 'margin-block-start': '0' }}
      select={setSorting}
      selected={sorting}
      options={getCategoryFeature(filterPage.id)('sorting')}
    />
  </SortColumn>
)

SortBy.propTypes = {
  sorting: PropTypes.shape({
    key: PropTypes.string,
    enabled: PropTypes.bool,
    value: PropTypes.string,
    ascending: PropTypes.bool,
  }).isRequired,
  setSorting: PropTypes.func.isRequired,
  filterPage: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    nameSingular: PropTypes.string,
  }).isRequired,
}

export default SortBy
