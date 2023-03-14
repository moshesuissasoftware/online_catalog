const variantImages = require('./variantImages')
const { baseSettings, brand, client, envUrlPart } = require('../baseSettings')

const commonSettings = {
  ...baseSettings,
  lang: 'dk',
  groups: ['kokken', 'badrum'],
  defaultGroup: 'kokken',
  productImagePlaceholder: 'missing',
  currency: 'DKK',
  comparePath: 'jamfor',
  badges: {
    butik: {
      position: 'topright',
      src: 'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/hthdk/store.png',
    },
  },
  brandTitle: 'HTH',
  customerIOUrl: `https://onboarding-api${envUrlPart}.nobiadigital.com/api/wishlists?brand=${brand}&client=${client}&eventname=wishlist-opc`,
  gatewayAPI: `https://gateway-api${envUrlPart}.nobiadigital.com/graphql?brand=${brand}&client=${client}`,
  herculesPaths: [...baseSettings.herculesPaths, '/kokken/'],
  variantImages,
  filtersFromConfig: false,
}

module.exports = {
  _local: {
    ...commonSettings,
    customerIOUrl:
      'https://onboarding-api.dev.nobiadigital.com/api/wishlists?brand=hthdk&client=opc&eventname=wishlist-opc',
    gatewayAPI:
      'https://gateway-api.dev.nobiadigital.com/graphql?brand=hthdk&client=opc', // 'http://localhost:3050/graphql?brand=hthdk&client=opc'
    // baseUrl: 'http://onehth.nobia.netrelations.se',
  },
  dev: {
    ...commonSettings,
    baseUrl: 'https://onehth.dev.nobiadigital.com',
  },
  test: {
    ...commonSettings,
    baseUrl: 'https://onehth.test.nobiadigital.com',
  },
  stage: {
    ...commonSettings,
    baseUrl: 'https://onehth.stage.nobiadigital.com',
  },
  prod: {
    ...commonSettings,
    baseUrl: 'https://www.hth.dk',
  },
}
