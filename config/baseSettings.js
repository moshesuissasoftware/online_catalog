const client = 'opc'
const brand = process.env.CONFIG_BRAND || ''
const profile = process.env.CONFIG_PROFILE || '_local'

const backendEnv = profile
const envUrlPart = backendEnv === 'prod' ? '' : `.${backendEnv}`

const baseSettings = {
  gatewayAPI: `https://opc-gateway-api${envUrlPart}.nobiadigital.com/graphql?brand=${brand}&client=${client}`,
  baseUrl: `https://${brand}${envUrlPart}.nobiadigital.com`,
  internalBaseUrl: `https://opc-${brand}${envUrlPart}.nobiadigital.com`,
  sentry: `https://a06f54d0bc6f4edd98a646421404e69d@sentry.io/165070`,
  herculesPaths: ['/'],
  filtersFromConfig: true,
  opcBaseUrl: `https://opc-${brand}${envUrlPart}.nobiadigital.com`,
  pageSize: 60,
}

module.exports = {
  baseSettings,
  client,
  brand,
  profile,
  backendEnv,
  envUrlPart,
}
