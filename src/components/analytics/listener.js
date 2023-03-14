import { ga } from '@nobia/zeus-components/lib/tracking/trackers'

const getLabel = (event, data) => {
  if (data.context === 'wishlist') {
    return {
      remove: data.wishlist.product,
      add: data.wishlist.product,
    }[event]
  }
  return undefined
}

const getValue = (event, data) => {
  if (data.context === 'wishlist' && event === 'send') {
    return data.wishlist.count
  }
  return undefined
}

const listener = (event, data) => {
  if (event === 'pageview') {
    ga.trackPageview()
  } else if (data.context === 'wishlist') {
    ga.trackEvent({
      eventCategory: 'OPC - Wishlist',
      eventAction: event,
      eventLabel: getLabel(event, data),
      eventValue: getValue(event, data),
    })
  } else if (event === 'setFilter') {
    ga.trackEvent({
      eventCategory: 'OPC - Filter Set',
      eventAction: data.filter.key,
      eventLabel: data.filter.value,
    })
  }
}

export default listener
