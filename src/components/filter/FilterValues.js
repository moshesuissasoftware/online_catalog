import React from 'react'
import styled, { theme, rem } from '@nobia/zeus-components/lib/styled'
import { withTranslation } from '@nobia/zeus-components/lib/i18n'
import CheckBox from '@nobia/zeus-components/lib/forms/CheckBox'
import PropTypes from 'prop-types'
import FilterCollapse from '../collapse/FilterCollapse'

const Label = withTranslation('app.product')(props => <span {...props} />)

const StyledFilter = styled.ul`
  padding: '0 0 10px 0';
`
const FilterItem = styled.li`
  list-style: none;
  padding: 8px 0;
  label {
    line-height: 24px;
    padding-left: 20px;
    font-size: 16px;
    font-family: ${theme('categoryCard.fontFamily')};
    font-weight: ${theme('preamble.fontWeight')};
    @media (min-width: 700px) and (max-width: 840px) {
      font-size: 14px;
      display: table-cell;
    }
    div {
      margin-top: 3px;
      width: 16px;
      height: 16px;
      margin-right: 16px;
      > svg {
        top: unset;
        left: 15%;
        bottom: 15%;
        width: 10px;
      }
    }
  }
  :first-child {
    padding-top: 0;
  }
  :last-child {
    padding-bottom: ${rem(16)};
  }
`

const FilterValues = ({ options, activeFilter, updateFilter, isLoading }) => (
  <>
    {options.map(
      opt =>
        opt.options &&
        opt.options.length > 0 && (
          <FilterCollapse
            key={opt.key}
            intlKey={opt.key}
            title={
              <Label intlKey={opt.key}>
                {opt.key.replace('features.', '')}
              </Label>
            }
          >
            <StyledFilter key={opt.value}>
              {opt.options.map(o => (
                <FilterItem key={o.value}>
                  <CheckBox
                    className={'checkbox-style'}
                    onChange={e =>
                      updateFilter(opt.key, e.target.value, opt.filterType)
                    }
                    disabled={isLoading}
                    label={
                      o.value === 'true' ? (
                        <Label intlKey={'features.true'} />
                      ) : (
                        o.value
                      )
                    }
                    id={o.value}
                    name={o.value}
                    value={o.value}
                    defaultChecked={activeFilter[opt.key]
                      ?.split('+')
                      .includes(o.value)}
                  />
                </FilterItem>
              ))}
            </StyledFilter>
          </FilterCollapse>
        )
    )}
  </>
)

FilterValues.propTypes = {
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
  isLoading: PropTypes.bool,
}

FilterValues.defaultProps = {
  checked: false,
  isLoading: false,
}

export default FilterValues
