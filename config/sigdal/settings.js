const { baseSettings, brand, client, envUrlPart } = require('../baseSettings')
const variantImages = require('./variantImages')

const commonSettings = {
  ...baseSettings,
  lang: 'no',
  defaultGroup: 'hvitevarer',
  productImagePlaceholder: 'missing',
  currency: 'NOK',
  comparePath: 'jamfor',
  badges: {
    best_seller: {
      position: 'topleft',
      src: 'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Sigdal/best_seller.png',
    },
    kitchen_unique: {
      position: 'topleft',
      src: 'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200/Sigdal/kitchen_only.png',
    },
  },
  googleSheetId: '1IavnQcMMMNPAkHg1zZKSaQG94F-xVuYOCRO4io5hB2k',
  googleSheetIndex: '0',
  customerIOUrl: `https://onboarding-api${envUrlPart}.nobiadigital.com/api/wishlists?brand=${brand}&client=${client}&eventname=wishlist-opc`,
  configUrls: {
    MESSAGES: `https://gateway-api${envUrlPart}.nobiadigital.com/cache/messages?client=${client}&brand=${brand}`,
  },
  variantImages,
  filtersFromConfig: false,
}

module.exports = {
  _local: {
    ...commonSettings,
    customerIOUrl: `https://onboarding-api.dev.nobiadigital.com/api/wishlists?brand=${brand}&client=${client}&eventname=wishlist-opc`,
    configUrls: {
      MESSAGES: `https://gateway-api.dev.nobiadigital.com/cache/messages?client=${client}&brand=${brand}`,
    },
    gatewayAPI: `https://opc-gateway-api.test.nobiadigital.com/graphql?client=${client}&brand=${brand}`,
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
    baseUrl: 'https://www.sigdal.com',
  },
}
