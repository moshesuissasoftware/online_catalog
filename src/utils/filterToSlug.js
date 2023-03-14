import { flow, deburr, kebabCase } from 'lodash'

const slugify = flow(str => str.replace('features.', ''), deburr, kebabCase)

const filterToSlug = (filter, filterValues) => {
  const returnValues = []
  filterValues.forEach(item => {
    if (filter[item.filter]) {
      const itemValues = filter[item.filter].split('+')
      const itemReturnValues = []
      itemValues.forEach(itemValue => {
        const match = item.values.find(
          val => val.name.trim() === itemValue.trim()
        )
        if (match) {
          itemReturnValues.push(`${match.slug}`)
        }
      })
      if (itemReturnValues) {
        returnValues.push(
          `${slugify(item.filter)}---${itemReturnValues.join('--')}`
        )
      }
    }
  })
  if (filter.page) {
    returnValues.push(`page---${filter.page}`)
  }
  return returnValues.length > 0 ? returnValues.join('----') : null
}

export default filterToSlug
