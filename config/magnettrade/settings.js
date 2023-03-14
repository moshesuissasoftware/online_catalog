const { baseSettings, brand, client, envUrlPart } = require('../baseSettings')
const variantImages = require('./variantImages')

const commonSettings = {
  ...baseSettings,
  storm: true,
  lang: 'en',
  defaultGroup: 'appliances',
  productImagePlaceholder: 'pimimages/missing',
  currency: 'GBP',
  comparePath: 'compare',
  filtersFromConfig: false,
  pageSize: 15,
  badges: {
    new: {
      position: 'topright',
      src: 'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200,r_max/Magnet/new.png',
    },
    best_seller: {
      position: 'topright',
      src: 'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200,r_max/Magnet/bestseller.png',
    },
  },
  variantImages,
  configUrls: {
    MESSAGES: `https://gateway-api${envUrlPart}.nobiadigital.com/cache/messages?client=${client}&brand=${brand}`,
  },
}

module.exports = {
  _local: {
    ...commonSettings,
    configUrls: {
      MESSAGES: `https://gateway-api.dev.nobiadigital.com/cache/messages?client=${client}&brand=${brand}`,
    },
    customerIOUrl: `https://onboarding-api.dev.nobiadigital.com/api/wishlists?brand=${brand}&client=opc&eventname=wishlist-opc`,
    gatewayAPI: `http://localhost:4001/graphql?brand=${brand}&client=opc`,
  },
  dev: {
    ...commonSettings,
  },
  test: {
    ...commonSettings,
  },
  stage: {
    ...commonSettings,
  },
  prod: {
    ...commonSettings,
    baseUrl: 'https://www.magnet.co.uk',
  },
}
