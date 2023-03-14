const { baseSettings } = require('../baseSettings')

const commonSettings = {
  ...baseSettings,
  lang: 'sv',
  productImagePlaceholder: 'missing',
  groups: ['kok', 'badrum'],
  defaultGroup: 'kok',
  currency: 'SEK',
  comparePath: 'jamfor',
  badges: {
    butik: {
      position: 'topright',
      src: 'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Hthgo-dk/butikk.png',
    },
  },
  brandTitle: 'HTH',
  filtersFromConfig: false,
}

module.exports = {
  _local: {
    ...commonSettings,
    customerIOUrl:
      'https://onboarding-api.dev.nobiadigital.com/api/wishlists?brand=hthse&client=opc&eventname=wishlist-opc',
    gatewayAPI:
      'http://gateway-api.dev.nobiadigital.com/graphql?brand=hthse&client=opc',
    baseUrl: 'http://localhost:3000',
  },
  dev: {
    ...commonSettings,
    customerIOUrl:
      'https://onboarding-api.dev.nobiadigital.com/api/wishlists?brand=hthse&client=opc&eventname=wishlist-opc',
    gatewayAPI:
      'https://gateway-api.dev.nobiadigital.com/graphql?brand=hthse&client=opc',
    baseUrl: 'https://opc-hthse.dev.nobiadigital.com',
  },
  test: {
    ...commonSettings,
    customerIOUrl:
      'https://onboarding-api.test.nobiadigital.com/api/wishlists?brand=hthse&client=opc&eventname=wishlist-opc',
    gatewayAPI:
      'https://gateway-api.test.nobiadigital.com/graphql?brand=hthse&client=opc',
    baseUrl: 'https://onehth-se.test.nobiadigital.com',
  },
  stage: {
    ...commonSettings,
    customerIOUrl:
      'https://onboarding-api.stage.nobiadigital.com/api/wishlists?brand=hthse&client=opc&eventname=wishlist-opc',
    gatewayAPI:
      'https://gateway-api.stage.nobiadigital.com/graphql?brand=hthse&client=opc',
    baseUrl: 'https://onehth-se.stage.nobiadigital.com',
  },
  prod: {
    ...commonSettings,
    customerIOUrl:
      'https://onboarding-api.nobiadigital.com/api/wishlists?brand=hthse&client=opc&eventname=wishlist-opc',
    gatewayAPI:
      'https://gateway-api.nobiadigital.com/graphql?brand=hthse&client=opc',
    baseUrl: 'https://www.hth.se',
  },
}
