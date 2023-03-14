import React, { useState } from 'react'
import { withTranslation } from '@nobia/zeus-components/lib/i18n'
import PropTypes from 'prop-types'
import styled from '@nobia/zeus-components/lib/styled'
import SortBy from '../sort-by/SortBy'
import FilterSidebar from '../sidebar/FilterSidebar'

const Wrapper = styled.div`
  display: none;
  ${props => props.theme.media.max.sm`
        display: flex;
        align-items: flex-start;
    `};
`
const TranslatedSpan = withTranslation('app.filter')('span')

const FilterModal = styled.button`
  padding: 13px 12px 12px 12px;
  margin: 14px 0 7px 0;
  width: 50%;
  height: 50px;
  border: 1px solid #c9cbcd;
  border-left: 0;
  border-radius: 0 3px 3px 0;
  font-size: 16px;
  color: #697175;
  cursor: pointer;
  text-align: left;

  ${props => props.theme.media.max.sm`
    font-size: 14px;
  `}
`

const MobileFilter = ({
  filterPage,
  options,
  total,
  activeFilter,
  updateFilter,
  clearFilter,
  setSorting,
  sorting,
}) => {
  const [showSidebar, setShowSidebar] = useState(false)

  const onCloseSidebar = () => {
    setShowSidebar(false)
  }

  const onToggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <Wrapper>
      {showSidebar && options.length > 0 && (
        <FilterSidebar
          onCloseSidebar={onCloseSidebar}
          filterPage={filterPage}
          options={options}
          total={total}
          activeFilter={activeFilter}
          updateFilter={updateFilter}
          clearFilter={clearFilter}
        />
      )}
      <SortBy
        setSorting={setSorting}
        sorting={sorting}
        filterPage={filterPage}
      />
      {options.length > 0 && (
        <FilterModal onClick={() => onToggleSidebar()}>
          {' '}
          <TranslatedSpan intlKey={'filterby'} />
        </FilterModal>
      )}
    </Wrapper>
  )
}

MobileFilter.propTypes = {
  sorting: PropTypes.shape({
    key: PropTypes.string,
    enabled: PropTypes.bool,
    value: PropTypes.string,
    ascending: PropTypes.bool,
  }).isRequired,
  filterPage: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    nameSingular: PropTypes.string,
  }).isRequired,
  total: PropTypes.number,
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
  updateFilter: PropTypes.func.isRequired,
  activeFilter: PropTypes.objectOf(PropTypes.string).isRequired,
  clearFilter: PropTypes.func.isRequired,
  setSorting: PropTypes.func.isRequired,
}

MobileFilter.defaultProps = {
  total: 0,
}

export default MobileFilter
