const { baseSettings, brand, client, envUrlPart } = require('../baseSettings')
const variantImages = require('./variantImages')

const commonSettings = {
  ...baseSettings,
  lang: 'en',
  defaultGroup: 'appliances',
  productImagePlaceholder: 'missing',
  currency: 'GBP',
  comparePath: 'compare',
  filtersFromConfig: false,
  pageSize: 15,
  badges: {
    new: {
      order: 5,
      position: 'topleft',
      src: 'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200,r_max/Magnet/new.png',
    },
    best_seller: {
      order: 4,
      position: 'topleft',
      src: 'https://res.cloudinary.com/dgg9enyjv/image/upload/w_200,h_200,r_max/Magnet/bestseller.png',
    },
    warranty: {
      order: 1,
      position: 'topleft',
      src: 'https://dgg9enyjv-res.cloudinary.com/image/upload/v1651133447/Magnet/label_refrigerator.png',
    },
  },
  variantImages,
  googleSheetId: '1KTCC4jnfyK7nODweI1qwLiN4JjmMNPg2gNB4rXfzzmg',
  googleSheetIndex: '0',
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
