import React from 'react'
import PropTypes from 'prop-types'
import {
  compose,
  withState,
  withHandlers,
} from '@nobia/zeus-components/lib/recompose'
import { prop } from '@nobia/zeus-components/lib/styled'

const unique = (item, i, arr) => !!item && arr.indexOf(item) === i

const filterItems = (items, key, value, char) =>
  items.filter(
    item =>
      prop(key)(item) &&
      prop(key)(item)
        .split(char)
        .some(i => i.trim() === value.trim())
  )

const getFilteredItems = (items, filter, allFilters) =>
  Object.keys(filter).reduce((acc, key) => {
    const baseFilter = allFilters.filter(f => f.filter === key)[0]
    const char = baseFilter && baseFilter.splitChar ? baseFilter.splitChar : ','
    return filterItems(acc, key, filter[key], char)
  }, items)

const getOptions = (items, key) =>
  items
    .map(item => prop(key)(item))
    .filter(unique)
    .sort()

const getAvailableOptions = (items, filter, key, allFilters) => {
  const optionsFilter = {
    ...filter,
  }
  delete optionsFilter[key]
  const filteredItems = getFilteredItems(items, optionsFilter, allFilters)
  return getOptions(filteredItems, key)
}

const withFilterFunction = ({
  items: itemsMapper,
  filters: filtersMapper,
}) => ComposedComponent => {
  const component = props => {
    const items = itemsMapper(props)
    const filters = filtersMapper(props) || []

    const { activeFilter } = props

    let filterValues = filters

    const optionSets = filters.map(key => {
      if (
        props.data &&
        props.data.productFilterPage &&
        props.data.productFilterPage.filterValues &&
        props.data.productFilterPage.filterValues.length > 0
      ) {
        filterValues = props.data.productFilterPage.filterValues
        const filterValue = props.data.productFilterPage.filterValues.filter(
          item => item.filter === key
        )[0]
        const splitChar = filterValue.splitChar || ','
        const filterType = filterValue.filterType || ''
        const newFilterValues = props.data.productFilterPage.filterValues
        let allValues = newFilterValues.filter(item => item.filter === key)
        allValues = allValues && allValues.length > 0 && allValues[0].values
        let alloptions
        let mixedOptionsNames = []
        allValues = allValues
          .map(item => {
            if (
              Number(item.name) ||
              item.name === 'N/A' ||
              item.name === 'N/a' ||
              item.name === 'n/a' ||
              item.name === '0'
            ) {
              mixedOptionsNames.push({ value: Number(item.name), metric: '' })
              return item.name
            }
            if (item.name.indexOf(' ') === -1) {
              return item.name
            }
            const firstItem = item.name.substr(0, item.name.indexOf(' '))
            const rest = item.name.substr(item.name.indexOf(' ') + 1)
            if (
              Number(firstItem) ||
              firstItem === 'N/A' ||
              firstItem === 'N/a' ||
              firstItem === 'n/a' ||
              firstItem === '0'
            ) {
              mixedOptionsNames.push({ value: firstItem, metric: rest })
            }
            return item.name
          })
          .sort()
        if (mixedOptionsNames.length === allValues.length) {
          mixedOptionsNames = mixedOptionsNames.sort(
            (a, b) => a.value - b.value
          )
          allValues = mixedOptionsNames.map(
            item => `${item.value} ${item.metric}`
          )
        } else {
          allValues = allValues.sort()
        }
        if (allValues) {
          alloptions = allValues.map(option => ({
            value: option,
            enabled: true,
            splitChar,
          }))
          return {
            key,
            filterType,
            options: alloptions,
          }
        }
      }
      const availableOptions = getAvailableOptions(
        items,
        activeFilter,
        key,
        filterValues
      )
      const options = getOptions(items, key).map(option => ({
        value: option,
        enabled: availableOptions.includes(option),
        splitChar: ',',
      }))
      return {
        key,
        filterType: '',
        options,
      }
    })

    const addedProps = {
      items: getFilteredItems(items, activeFilter, filterValues),
      filter: activeFilter,
      options: optionSets,
    }

    return <ComposedComponent {...props} {...addedProps} />
  }

  component.propTypes = {
    activeFilter: PropTypes.shape({}).isRequired,
    data: PropTypes.shape({
      productFilterPage: PropTypes.shape({
        filterValues: PropTypes.arrayOf(
          PropTypes.shape({
            filter: PropTypes.string,
          })
        ),
      }),
    }).isRequired,
  }

  return component
}

const withFilter = options =>
  compose(
    withState('activeFilter', 'setFilter', options.initialValues || {}),
    withHandlers({
      updateFilter: ({ setFilter }) => (key, value) =>
        setFilter(prev => {
          const next = {
            ...prev,
          }
          if (value == null) {
            delete next[key]
          } else {
            next[key] = value
          }
          return next
        }),
    }),
    withFilterFunction(options)
  )

export default withFilter
