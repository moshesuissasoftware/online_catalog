// @flow

import React, { Fragment } from 'react'

import { withTranslation } from '@nobia/zeus-components/lib/i18n'
import PropTypes from 'prop-types'

import Dropdown from '../dropdown'

const getSelected = selected => {
  if (selected) {
    if (selected.length > 20) {
      return `(${selected.substring(0, 20)}...)`
    }
    return `(${selected})`
  }
  return ''
}

const Label = withTranslation('app.product')(props => <span {...props} />)

const FilterBox = ({ options, selected, children, select }) => (
  <Dropdown
    options={[{ value: null, enabled: true, first: true }, ...options]}
    selected={selected}
    select={select}
    header={selection =>
      selection ? (
        <Fragment>
          {children}
          <span> {getSelected(selection)}</span>
        </Fragment>
      ) : (
        children
      )
    }
  >
    {value => value || <Label intlKey="show_all">Show all</Label>}
  </Dropdown>
)

FilterBox.propTypes = {
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
  selected: PropTypes.string,
  select: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

FilterBox.defaultProps = {
  options: [],
  selected: null,
}

export default FilterBox
