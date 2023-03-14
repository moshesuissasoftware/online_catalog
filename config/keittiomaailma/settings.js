const { baseSettings, brand, client, envUrlPart } = require('../baseSettings')

const commonSettings = {
  ...baseSettings,
  lang: 'fi',
  defaultGroup: 'kodinkoneet',
  productImagePlaceholder: 'missing_2',
  currency: 'EUR',
  comparePath: 'vertailla',
  badges: {},
  googleSheetId: '1UFfEmn_h-AQUyMm9pBzOtXScLWS3_fDbXiefgkaH5tM',
  googleSheetIndex: '0',
  configUrls: {
    MESSAGES: `https://gateway-api${envUrlPart}.nobiadigital.com/cache/messages?client=${client}&brand=${brand}`,
  },
  customerIOUrl: `https://onboarding-api${envUrlPart}.nobiadigital.com/api/wishlists?brand=${brand}&client=${client}&eventname=wishlist-opc`,
}

module.exports = {
  _local: {
    ...commonSettings,
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
    baseUrl: 'https://www.keittiomaailma.fi',
  },
}
