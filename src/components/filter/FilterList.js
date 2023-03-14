// @flow

import React from 'react'

import styled, { ifProp, rem, theme } from '@nobia/zeus-components/lib/styled'
import {
  compose,
  withState,
  withHandlers,
} from '@nobia/zeus-components/lib/recompose'
import { withTranslation } from '@nobia/zeus-components/lib/i18n'
import Button from '@nobia/zeus-components/lib/buttons'
import { Row } from '@nobia/zeus-components/lib/grid'
import { Icon } from '@nobia/zeus-components/lib/icons'
import PropTypes from 'prop-types'
import FilterBox from './FilterBox'

const Wrapper = styled.div``

const Filters = styled.ul`
  display: ${ifProp('showFilter', 'flex', 'none')};
  padding-left: 0;
  flex-wrap: wrap;
  width: 100%;
  list-style-type: none;
  margin-top: ${rem(15)};
  padding-bottom: ${rem(15)};
  > div {
    width: 100%;
    margin-bottom: ${rem(15)};
    &:last-child {
      margin-bottom: 0;
    }
    &:first-child {
      margin-bottom: ${rem(15)};
    }
  }
  ${props => props.theme.media.min.md`
    display: flex;
    flex-wrap: nowrap;
    width: auto;
    margin-top: 0;
    padding-bottom: 0;
    > div {
      width: auto;
      height: ${rem(40)};
      z-index: 2;
      margin-right: ${rem(10)};
    }
  `};
`

const StyledButton = styled(Button)`
  margin-bottom: ${rem(15)};
  ${props => props.theme.media.min.md`
    display: none;
  `};
`

const Label = withTranslation('app.product')(props => <span {...props} />)

const FilterLabel = withTranslation('app.filter')(props => <span {...props} />)

const StyledRow = styled(Row)`
  display: flex;
  width: 100%;
  flex-direction: row;
  margin: ${rem(20)} 0;
  ${props => props.theme.media.max.sm`
    display: none;
  `};
`
const StyledColumn = styled.div`
  display: flex;
  padding-right: ${rem(10)};
  &:last-child {
    padding-right: 0;
  }
  ${props => props.theme.media.max.sm`
    padding-bottom: ${rem(10)};
  `};
  ${props => props.theme.media.min.md`
    margin-bottom: ${rem(10)};
  `};
`

const ActiveFilterButton = styled(Button).attrs({
  kind: 'inverted',
  size: 'small',
})`
  color: ${theme('filterList.button.color')};
  padding: ${rem(10)};
  font-size: ${rem(16)};
  text-transform: none;
  letter-spacing: 0;
  font-weight: 300;
  &::before {
    border-radius: ${rem(2)};
    border-color: transparent;
    background-color: ${theme('filterList.button.background')};
  }
  > span {
    position: relative;
    top: 1px;
    margin-left: ${rem(5)};
  }
`

const flattenOptions = options => {
  const flatOptions = []
  options.forEach(option => {
    if (!option.value) {
      flatOptions.push(option)
    } else {
      const char = option.splitChar || ','
      option.value.split(char).forEach(item => {
        const match = flatOptions.find(
          flatOption => flatOption.value.trim() === item.trim()
        )
        if (!match) {
          flatOptions.push({
            value: item,
            enabled: option.enabled,
          })
        } else if (option.enabled) {
          match.enabled = true
        }
      })
    }
  })
  return flatOptions
}

const FilterList = ({
  options,
  updateFilter,
  activeFilter,
  showFilter,
  toggleFilter,
  className,
  showSelectedFilters,
}) => (
  <Wrapper>
    {showSelectedFilters && Object.keys(activeFilter).length > 0 && (
      <StyledRow>
        {Object.keys(activeFilter)
          .filter(f => f !== 'page')
          .map(key => (
            <StyledColumn key={key}>
              <ActiveFilterButton
                title={key.replace('features.', '')}
                onClick={() => updateFilter(key, null, '')}
              >
                {activeFilter[key].split('+').join(' | ')}
                <Icon
                  width={11}
                  height={11}
                  type="close-circle"
                  color={theme('filterList.button.color')}
                />
              </ActiveFilterButton>
            </StyledColumn>
          ))}
      </StyledRow>
    )}
    <StyledButton block onClick={toggleFilter}>
      <FilterLabel intlKey={showFilter ? 'close_filter' : 'open_filter'} />
    </StyledButton>
    <Filters showFilter={showFilter} className={className} data-cy="FilterList">
      {options.map(option => (
        <FilterBox
          key={option.key}
          options={flattenOptions(option.options)}
          selected={activeFilter[option.key]}
          select={value => updateFilter(option.key, value, option.filterType)}
        >
          <Label intlKey={option.key}>
            {option.key.replace('features.', '')}
          </Label>
        </FilterBox>
      ))}
    </Filters>
  </Wrapper>
)

FilterList.propTypes = {
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
  ),
  updateFilter: PropTypes.func.isRequired,
  activeFilter: PropTypes.shape(),
  showFilter: PropTypes.bool,
  toggleFilter: PropTypes.func.isRequired,
  className: PropTypes.string,
  showSelectedFilters: PropTypes.bool,
}

FilterList.defaultProps = {
  options: [],
  activeFilter: null,
  showFilter: false,
  className: '',
  showSelectedFilters: false,
}

export default compose(
  withState('showFilter', 'setShowFilter', false),
  withHandlers({
    toggleFilter: ({ setShowFilter }) => () =>
      setShowFilter(showFilter => !showFilter),
  })
)(FilterList)
