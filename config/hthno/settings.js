const { baseSettings } = require('../baseSettings')

const commonSettings = {
  ...baseSettings,
  lang: 'no',
  productImagePlaceholder: 'missing',
  groups: ['kjokken', 'baderom'],
  defaultGroup: 'kjokken',
  currency: 'NOK',
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
      'https://onboarding-api.dev.nobiadigital.com/api/wishlists?brand=hthno&client=opc&eventname=wishlist-opc',
    gatewayAPI:
      'http://gateway-api.dev.nobiadigital.com/graphql?brand=hthno&client=opc',
    baseUrl: 'http://localhost:3000',
  },
  dev: {
    ...commonSettings,
    customerIOUrl:
      'https://onboarding-api.dev.nobiadigital.com/api/wishlists?brand=hthno&client=opc&eventname=wishlist-opc',
    gatewayAPI:
      'https://gateway-api.dev.nobiadigital.com/graphql?brand=hthno&client=opc',
    baseUrl: 'https://opc-hthno.dev.nobiadigital.com',
  },
  test: {
    ...commonSettings,
    customerIOUrl:
      'https://onboarding-api.test.nobiadigital.com/api/wishlists?brand=hthno&client=opc&eventname=wishlist-opc',
    gatewayAPI:
      'https://gateway-api.test.nobiadigital.com/graphql?brand=hthno&client=opc',
    baseUrl: 'https://onehth-no.test.nobiadigital.com',
  },
  stage: {
    ...commonSettings,
    customerIOUrl:
      'https://onboarding-api.stage.nobiadigital.com/api/wishlists?brand=hthno&client=opc&eventname=wishlist-opc',
    gatewayAPI:
      'https://gateway-api.stage.nobiadigital.com/graphql?brand=hthno&client=opc',
    baseUrl: 'https://onehth-no.stage.nobiadigital.com',
  },
  prod: {
    ...commonSettings,
    customerIOUrl:
      'https://onboarding-api.nobiadigital.com/api/wishlists?brand=hthno&client=opc&eventname=wishlist-opc',
    gatewayAPI:
      'https://gateway-api.nobiadigital.com/graphql?brand=hthno&client=opc',
    baseUrl: 'https://www.hth.no',
  },
}
