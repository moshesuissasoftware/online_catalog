import React from 'react'
import { withTranslation } from '@nobia/zeus-components/lib/i18n'
import styled, { theme } from '@nobia/zeus-components/lib/styled'
import PropTypes from 'prop-types'
import FilterValues from './FilterValues'

const FilterWrapper = styled.div`
  ${props => props.theme.media.max.sm`
    display: none;
  `};
`

const SideMenu = styled.div`
  border-bottom: 1px solid;
  border-color: ${theme('collapse.border.color')};
  height: fit-content;
  list-style-type: none;
`
const StyledClearFilter = styled.button`
  font-family: 'Campton', sans-serif;
  font-weight: 100;
  text-decoration: none;
  font-size: 16px;
  @media (min-width: 700px) and (max-width: 840px) {
    font-size: 14px;
  }
`
const StyledTitleFilter = styled.div`
  padding: 15px 0;
  font-family: ${theme('categoryCard.fontFamily')};
  width: 100%;
  font-size: 18px;
  text-align: left;
  font-weight: 500;
  @media (min-width: 700px) and (max-width: 840px) {
    font-size: 14px;
  }
`
const StyledIcon = styled.span`
  float: right;
  > svg {
    pointer-events: none;
  }
`
const TranslatedSpan = withTranslation('app.filter')('span')

const DesktopFilter = ({
  filterPage,
  options,
  activeFilter,
  updateFilter,
  clearFilter,
  isLoading,
}) => (
  <FilterWrapper>
    {filterPage.filterValues && options && options.length > 0 && (
      <SideMenu key={options[0].key}>
        <StyledTitleFilter>
          <TranslatedSpan intlKey={'filterby'} />
          <StyledIcon>
            <StyledClearFilter onClick={() => clearFilter(options)}>
              <TranslatedSpan intlKey={'clearfilter'} />
            </StyledClearFilter>
          </StyledIcon>
        </StyledTitleFilter>
        <FilterValues
          options={options}
          activeFilter={activeFilter}
          updateFilter={updateFilter}
          isLoading={isLoading}
          permanentFilters={filterPage.permanentFilters}
        />
      </SideMenu>
    )}
  </FilterWrapper>
)

DesktopFilter.propTypes = {
  filterPage: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    nameSingular: PropTypes.string,
    filterValues: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        slug: PropTypes.string,
      })
    ),
    permanentFilters: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.string,
      })
    ),
  }).isRequired,
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
  clearFilter: PropTypes.func.isRequired,
  updateFilter: PropTypes.func.isRequired,
  activeFilter: PropTypes.objectOf(PropTypes.string).isRequired,
  isLoading: PropTypes.bool,
}

DesktopFilter.defaultProps = {
  isLoading: false,
}

export default DesktopFilter
