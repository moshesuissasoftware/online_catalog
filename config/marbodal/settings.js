const { baseSettings, brand, client, envUrlPart } = require('../baseSettings')

const commonSettings = {
  ...baseSettings,
  storm: true,
  lang: 'sv',
  groups: ['vitvaror', 'tillbehor', 'Skåpsinreden', 'ovriga-koksprodukter'],
  defaultGroup: 'vitvaror',
  productImagePlaceholder: 'missing',
  currency: 'SEK',
  comparePath: 'jamfor',
  badges: {
    new: {
      position: 'topleft',
      src: 'https://res.cloudinary.com/dgg9enyjv/image/upload/c_scale,w_200/v1544519427/Marbodal/nyhet_3.png',
    },
    best_seller: {
      position: 'topleft',
      src: 'https://res.cloudinary.com/dgg9enyjv/image/upload/c_scale,w_200/v1544519427/Marbodal/best_seller_3.png',
    },
  },
  googleSheetId: '1naFaG3FqthS0KwHqiFLY4wBAPZgj82VieVZZzf5leww',
  googleSheetIndex: '0',
  configUrls: {
    MESSAGES: `https://gateway-api${envUrlPart}.nobiadigital.com/cache/messages?client=${client}&brand=${brand}`,
  },
  customerIOUrl: `https://onboarding-api${envUrlPart}.nobiadigital.com/api/wishlists?brand=${brand}&client=${client}&eventname=wishlist-opc`,
  herculesPaths: [...baseSettings.herculesPaths, '/tillbehor/'],
  filtersFromConfig: false,
}

module.exports = {
  _local: {
    ...commonSettings,
    configUrls: {
      MESSAGES: `https://gateway-api.nobiadigital.com/cache/messages?client=${client}&brand=${brand}`,
    },
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
    baseUrl: 'https://www.marbodal.se',
  },
}
