/* eslint-disable */
import { flow, deburr, kebabCase } from 'lodash'

const slugify = flow(str => str.replace('features.', ''), deburr, kebabCase)

const addFilterValue = (current, value) => {
  if (!current || current.length === 0) {
    return value
  }
  if (current === value) {
    return current
  }
  return `${current}+${value}`
}

const slugToFilter = (path, filterValues) => {
  const output = {}
  if (!path) return output

  var filterPaths = path.split('----')
  filterValues.forEach(filter => {
    filter.values.forEach(filterValue => {
      filterPaths.forEach(filterPath => {
        const pathSegments = filterPath.split('---') // 0 filter key, 1> filter slug
        if (pathSegments && pathSegments[0] === slugify(filter.filter)) {
          const pathValues = pathSegments[1].split('--')
          if (pathValues && pathValues.indexOf(filterValue.slug) >= 0) {
            output[filter.filter] = addFilterValue(
              output[filter.filter],
              filterValue.name
            )
          }
        } else if (pathSegments && pathSegments[0] === 'page') {
          output['page'] = pathSegments[1]
        }
      })
    })
  })

  return output
}

export default slugToFilter
